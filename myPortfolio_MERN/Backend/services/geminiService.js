/**
 * Gemini AI Service (Phase 7 with Controlled Function Calling)
 * Manages Google Gen AI SDK client, function calling tool declarations,
 * tool execution loop, and progressive streaming.
 */

const { GoogleGenAI } = require("@google/genai");
const { buildSystemInstruction } = require("../prompts/portfolioAssistant");
const { getGeminiToolsConfig } = require("../tools/toolRegistry");
const { executeTool, MAX_TOOL_CALLS_PER_TURN } = require("../tools/toolExecutor");

let genAIClient = null;

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return null;
  }

  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey: apiKey.trim() });
  }
  return genAIClient;
}

/**
 * Normalizes conversation history and user query into strict Gemini API contents format:
 * 1. First turn must have role 'user'
 * 2. Strict alternating roles ('user' -> 'model' -> 'user')
 * 3. Merges consecutive same-role messages
 * 4. Ensures ends with current user query
 */
function formatGeminiContents(userMessage, history = []) {
  const rawContents = [];

  if (Array.isArray(history) && history.length > 0) {
    for (const msg of history) {
      if (!msg || !msg.content || typeof msg.content !== "string") continue;
      const trimmed = msg.content.trim();
      if (!trimmed) continue;
      const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
      rawContents.push({
        role: role,
        parts: [{ text: trimmed }],
      });
    }
  }

  // Ensure latest userMessage is present at the end
  if (
    rawContents.length === 0 ||
    rawContents[rawContents.length - 1].role !== "user" ||
    rawContents[rawContents.length - 1].parts[0].text !== userMessage.trim()
  ) {
    rawContents.push({
      role: "user",
      parts: [{ text: userMessage.trim() }],
    });
  }

  // Normalize contents
  const contents = [];
  for (const item of rawContents) {
    if (contents.length === 0) {
      if (item.role === "user") {
        contents.push({ role: "user", parts: [{ text: item.parts[0].text }] });
      }
    } else {
      const prev = contents[contents.length - 1];
      if (item.role !== prev.role) {
        contents.push({ role: item.role, parts: [{ text: item.parts[0].text }] });
      } else {
        // Consecutive same role: merge parts to preserve context
        prev.parts[0].text += `\n\n${item.parts[0].text}`;
      }
    }
  }

  // Guarantee contents is non-empty and ends with the current user query
  if (contents.length === 0 || contents[contents.length - 1].role !== "user") {
    contents.push({
      role: "user",
      parts: [{ text: userMessage.trim() }],
    });
  }

  return contents;
}

/**
 * Generate a complete non-streamed response from Gemini with function calling
 */
async function generateGeminiResponse(
  userMessage,
  history = [],
  portfolioContext = "",
  intent = "general",
  context = {}
) {
  const client = getGenAIClient();

  if (!client) {
    console.warn("⚠️ [GeminiService] GEMINI_API_KEY is not configured in backend .env");
    return "I'm currently unable to connect to the AI model because the server's Gemini API key is not yet configured. Please check the backend configuration or contact Aayush directly at contact@aayushsharma.dev.";
  }

  const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  const systemInstruction = buildSystemInstruction(portfolioContext, intent);
  const contents = formatGeminiContents(userMessage, history);
  const tools = intent !== "unsupported" ? getGeminiToolsConfig() : undefined;

  const maxRetries = 2;
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      let toolCallCount = 0;

      while (toolCallCount < MAX_TOOL_CALLS_PER_TURN) {
        const response = await client.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 0.95,
            tools: tools,
          },
        });

        // Check for function calls
        const candidate = response?.candidates?.[0];
        const fnCallPart = candidate?.content?.parts?.find((p) => p.functionCall);

        if (fnCallPart && fnCallPart.functionCall) {
          toolCallCount++;
          const fn = fnCallPart.functionCall;

          // Execute tool securely
          const toolResult = await executeTool(fn.name, fn.args, context);

          // Append function call and response turns
          contents.push({
            role: "model",
            parts: [{ functionCall: { name: fn.name, args: fn.args } }],
          });
          contents.push({
            role: "user",
            parts: [{ functionResponse: { name: fn.name, response: { result: toolResult } } }],
          });

          continue; // Loop to generate response with tool output
        }

        const replyText = response?.text || candidate?.content?.parts?.[0]?.text;

        if (!replyText || typeof replyText !== "string") {
          return "I processed your request, but received an empty response. Please try asking again.";
        }

        return replyText.trim();
      }

      // If maximum tool loops exceeded, return safe fallback
      return "I have retrieved the requested portfolio information. Please let me know how else I can assist you.";
    } catch (error) {
      lastError = error;
      console.error(`❌ [GeminiService Attempt ${attempt + 1}/${maxRetries + 1} Error]:`, error?.message || error);

      if (attempt < maxRetries) {
        let waitMs = 1500 * (attempt + 1);
        const retryMatch = (error?.message || "").match(/retry in ([0-9.]+)s/i);
        if (retryMatch && parseFloat(retryMatch[1])) {
          const suggestedMs = Math.min(Math.ceil(parseFloat(retryMatch[1]) * 1000) + 500, 15000);
          waitMs = Math.max(waitMs, suggestedMs);
        }
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }

  console.error("❌ [GeminiService Final Error]:", lastError?.message || lastError);
  throw new Error("Unable to communicate with Gemini API. Please try again shortly.");
}

/**
 * Stream a progressive response from Gemini with function calling support
 * @param {string} userMessage - Latest user query
 * @param {Array} history - Multi-turn history
 * @param {string} portfolioContext - Selected context
 * @param {string} intent - Classified intent
 * @param {function(string):void} onChunk - Fired on each text token
 * @param {AbortSignal} [signal] - Optional abort signal
 * @param {object} [context] - Context options (e.g. sessionId, onToolActivity)
 * @returns {Promise<{ fullText: string, executedTools: Array }>}
 */
async function streamGeminiResponse(
  userMessage,
  history = [],
  portfolioContext = "",
  intent = "general",
  onChunk,
  signal = null,
  context = {}
) {
  const client = getGenAIClient();

  if (!client) {
    const errorMsg =
      "I'm currently unable to connect to the AI model because the server's Gemini API key is not yet configured. Please check the backend configuration or contact Aayush directly at contact@aayushsharma.dev.";
    if (typeof onChunk === "function") onChunk(errorMsg);
    return { fullText: errorMsg, executedTools: [] };
  }

  const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  const systemInstruction = buildSystemInstruction(portfolioContext, intent);
  const contents = formatGeminiContents(userMessage, history);
  const tools = intent !== "unsupported" ? getGeminiToolsConfig() : undefined;
  const executedTools = [];

  const maxRetries = 2;
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (signal && signal.aborted) {
      break;
    }

    try {
      let toolCallCount = 0;

      while (toolCallCount < MAX_TOOL_CALLS_PER_TURN) {
        if (signal && signal.aborted) break;

        // First attempt standard non-streaming check to handle tool calls smoothly
        let initialResponse = null;
        try {
          initialResponse = await client.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
              topP: 0.95,
              tools: tools,
            },
          });
        } catch (firstErr) {
          throw firstErr;
        }

        const candidate = initialResponse?.candidates?.[0];
        const fnCallPart = candidate?.content?.parts?.find((p) => p.functionCall);

        if (fnCallPart && fnCallPart.functionCall) {
          toolCallCount++;
          const fn = fnCallPart.functionCall;
          executedTools.push({ name: fn.name, args: fn.args });

          if (typeof context.onToolActivity === "function") {
            context.onToolActivity(fn.name, fn.args);
          }

          // Execute tool securely
          const toolResult = await executeTool(fn.name, fn.args, context);

          // Append function turns
          contents.push({
            role: "model",
            parts: [{ functionCall: { name: fn.name, args: fn.args } }],
          });
          contents.push({
            role: "user",
            parts: [{ functionResponse: { name: fn.name, response: { result: toolResult } } }],
          });

          continue; // Loop to generate subsequent response with tool result
        }

        // No tool call -> Stream the response
        let fullText = "";

        // If initialResponse already provided full text, stream it in chunks or use generateContentStream
        const initialText = initialResponse?.text || candidate?.content?.parts?.[0]?.text;

        if (initialText) {
          // Stream progressive tokens to client
          const words = initialText.split(" ");
          for (let i = 0; i < words.length; i++) {
            if (signal && signal.aborted) break;
            const token = (i === 0 ? "" : " ") + words[i];
            fullText += token;
            if (typeof onChunk === "function") {
              onChunk(token);
            }
            // Micro-delay for natural token cadence
            if (i % 3 === 0) {
              await new Promise((r) => setTimeout(r, 15));
            }
          }
          return { fullText: fullText.trim(), executedTools };
        }

        // Direct Stream fallback
        const responseStream = await client.models.generateContentStream({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        for await (const chunk of responseStream) {
          if (signal && signal.aborted) break;

          const chunkText = chunk?.text || chunk?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (chunkText) {
            fullText += chunkText;
            if (typeof onChunk === "function") {
              onChunk(chunkText);
            }
          }
        }

        return { fullText: fullText.trim(), executedTools };
      }

      return { fullText: "I have gathered the relevant details from the portfolio.", executedTools };
    } catch (error) {
      lastError = error;
      console.error(`❌ [GeminiService Stream Attempt ${attempt + 1}/${maxRetries + 1} Error]:`, error?.message || error);

      if (attempt < maxRetries && (!signal || !signal.aborted)) {
        let waitMs = 1500 * (attempt + 1);
        const retryMatch = (error?.message || "").match(/retry in ([0-9.]+)s/i);
        if (retryMatch && parseFloat(retryMatch[1])) {
          const suggestedMs = Math.min(Math.ceil(parseFloat(retryMatch[1]) * 1000) + 500, 15000);
          waitMs = Math.max(waitMs, suggestedMs);
        }
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }

  console.error("❌ [GeminiService Stream Final Error]:", lastError?.message || lastError);
  throw new Error("Unable to communicate with Gemini API streaming. Please try again shortly.");
}

module.exports = {
  generateGeminiResponse,
  streamGeminiResponse,
};
