/**
 * Chatbot API Service (Phase 5)
 * Connects frontend React components to Express backend endpoints:
 * - POST   /api/chat/start
 * - GET    /api/chat/session/:sessionId
 * - DELETE /api/chat/session/:sessionId
 * - POST   /api/chat        (Standard complete response)
 * - POST   /api/chat/stream (Progressive SSE streaming)
 * - POST   /api/leads       (Project intake submission)
 */

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Helper to ensure safe JSON fetching with comprehensive error handling
 */
async function fetchJson(endpoint, options = {}) {
  let response;
  try {
    response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch (netErr) {
    console.error("Network error fetching:", endpoint, netErr);
    throw new Error("Unable to connect to the server. Please check your internet connection.");
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    console.error("JSON parse error from:", endpoint, parseErr);
    throw new Error("Received an invalid response from the server. Please try again.");
  }

  if (!response.ok || !data.success) {
    throw new Error(data?.message || "Operation failed. Please try again.");
  }

  return data;
}

/**
 * Initialize a new chat session on the backend
 * @param {string} source - e.g. "portfolio"
 * @returns {Promise<{ sessionId: string }>}
 */
export async function startChatSession(source = "portfolio") {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/chat/start`;
  const data = await fetchJson(endpoint, {
    method: "POST",
    body: JSON.stringify({ source }),
  });
  return { sessionId: data.sessionId };
}

/**
 * Retrieve saved conversation history for a given session ID
 * @param {string} sessionId
 * @returns {Promise<{ sessionId: string, messages: Array }>}
 */
export async function getSessionHistory(sessionId) {
  if (!sessionId) return { sessionId: "", messages: [] };
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/chat/session/${encodeURIComponent(sessionId)}`;
  const data = await fetchJson(endpoint, {
    method: "GET",
  });
  return {
    sessionId: data?.session?.sessionId || sessionId,
    messages: Array.isArray(data?.session?.messages) ? data.session.messages : [],
  };
}

/**
 * Clear existing session from backend database
 * @param {string} sessionId
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function clearChatSession(sessionId) {
  if (!sessionId) return { success: true };
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/chat/session/${encodeURIComponent(sessionId)}`;
  return await fetchJson(endpoint, {
    method: "DELETE",
  });
}

/**
 * Send a chat message using standard complete response (fallback/non-streaming)
 * @param {string} userMessage - User query text
 * @param {Array} conversationHistory - Previous conversation messages
 * @param {string} sessionId - Active session ID
 * @returns {Promise<{ reply: string, sessionId: string, intent?: string, cards?: Array, suggestions?: Array }>}
 */
export async function sendChatMessage(userMessage, conversationHistory = [], sessionId = "") {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/chat`;

  const formattedHistory = (Array.isArray(conversationHistory) ? conversationHistory : [])
    .filter(
      (m) =>
        m &&
        typeof m === "object" &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({
      role: m.role === "assistant" || m.role === "model" ? "assistant" : "user",
      content: m.content || "",
    }));

  const data = await fetchJson(endpoint, {
    method: "POST",
    body: JSON.stringify({
      sessionId: sessionId || undefined,
      message: userMessage,
      messages: formattedHistory,
    }),
  });

  return {
    sessionId: data.sessionId || sessionId,
    intent: data.intent || "general",
    message: data.reply || data.message || "",
    cards: Array.isArray(data.cards) ? data.cards : [],
    suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
  };
}

/**
 * Stream a chat message progressively using Server-Sent Events (SSE)
 * @param {object} params
 * @param {string} params.userMessage - User query text
 * @param {Array} params.conversationHistory - Previous conversation messages
 * @param {string} params.sessionId - Active session ID
 * @param {function({ sessionId: string, intent: string }):void} [params.onStart] - Fired when stream starts
 * @param {function(string):void} [params.onChunk] - Fired on each incremental text token
 * @param {function({ sessionId: string, reply: string, intent: string, cards: Array, suggestions: Array }):void} [params.onDone] - Fired on completion
 * @param {function(string):void} [params.onError] - Fired on error
 * @param {AbortSignal} [params.signal] - Optional abort signal for Stop Generation
 */
export async function streamChatMessage({
  userMessage,
  conversationHistory = [],
  sessionId = "",
  onStart,
  onChunk,
  onDone,
  onError,
  signal,
}) {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/chat/stream`;

  const formattedHistory = (Array.isArray(conversationHistory) ? conversationHistory : [])
    .filter(
      (m) =>
        m &&
        typeof m === "object" &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({
      role: m.role === "assistant" || m.role === "model" ? "assistant" : "user",
      content: m.content || "",
    }));

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId || undefined,
        message: userMessage,
        messages: formattedHistory,
      }),
      signal,
    });
  } catch (netErr) {
    if (signal?.aborted) {
      return; // Cleanly aborted by user
    }
    console.error("Network error during streamChatMessage:", netErr);
    const msg = "Unable to connect to the server. Please check your internet connection.";
    if (typeof onError === "function") onError(msg);
    throw new Error(msg);
  }

  if (!response.ok) {
    let errMsg = "I couldn't process that message right now. Please try again.";
    try {
      const errData = await response.json();
      if (errData?.message) errMsg = errData.message;
    } catch {}
    if (typeof onError === "function") onError(errMsg);
    throw new Error(errMsg);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  try {
    while (true) {
      if (signal?.aborted) {
        await reader.cancel();
        break;
      }

      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || ""; // Keep incomplete trailing fragment in buffer

      for (const block of lines) {
        const trimmed = block.trim();
        if (!trimmed || !trimmed.startsWith("data:")) continue;

        const jsonStr = trimmed.replace(/^data:\s*/, "");
        try {
          const event = JSON.parse(jsonStr);

          if (event.type === "start") {
            if (typeof onStart === "function") onStart(event);
          } else if (event.type === "chunk") {
            if (typeof onChunk === "function" && event.text) onChunk(event.text);
          } else if (event.type === "done") {
            if (typeof onDone === "function") onDone(event);
          } else if (event.type === "error") {
            if (typeof onError === "function") onError(event.message || "An error occurred.");
          }
        } catch (parseErr) {
          console.warn("Could not parse SSE chunk JSON:", parseErr);
        }
      }
    }
  } catch (readErr) {
    if (signal?.aborted) {
      return;
    }
    console.error("Stream reading error:", readErr);
    const msg = "Something went wrong while generating the response.";
    if (typeof onError === "function") onError(msg);
    throw new Error(msg);
  }
}

/**
 * Submit client project requirements lead
 * @param {object} leadData - { sessionId, name, email, phone, projectType, requirements, timeline, budget }
 * @returns {Promise<{ success: boolean, message: string, leadId?: string }>}
 */
export async function submitLead(leadData = {}) {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/leads`;
  return await fetchJson(endpoint, {
    method: "POST",
    body: JSON.stringify(leadData),
  });
}
