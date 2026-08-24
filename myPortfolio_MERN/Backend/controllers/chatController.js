/**
 * Chat Controller (Phase 7 with Function Calling & Controlled Tool Execution)
 * Manages chat session lifecycle, MongoDB conversation persistence,
 * intent classification, selective portfolio context assembly,
 * complete responses (/api/chat), and progressive streaming (/api/chat/stream).
 */

const crypto = require("crypto");
const ChatSession = require("../models/ChatSession");
const ChatMessage = require("../models/ChatMessage");
const { isDbConnected } = require("../config/db");
const { generateGeminiResponse, streamGeminiResponse } = require("../services/geminiService");
const { getPortfolioContext, PORTFOLIO_KNOWLEDGE } = require("../services/portfolioContextService");
const { classifyIntent, sanitizeIntent } = require("../services/intentClassificationService");

/**
 * Generates a cryptographically random, collision-resistant session ID.
 * @returns {string}
 */
function generateSessionId() {
  return `sess_${Date.now()}_${crypto.randomBytes(8).toString("hex")}`;
}

/**
 * Derives rich UI cards and suggestions based on classified intent, user query, and executed tools.
 * @param {string} intent - One of the 9 supported intents
 * @param {string} userQuery - Raw user query
 * @param {Array} executedTools - Array of tools executed during turn
 * @returns {{ cards: Array, suggestions: Array }}
 */
function deriveMetadataForIntent(intent, userQuery = "", executedTools = []) {
  const query = (userQuery || "").toLowerCase();
  const toolNames = executedTools.map((t) => t.name);

  // If lead draft tool was called or intent is lead, ensure lead card is attached
  if (toolNames.includes("createLeadDraft") || intent === "lead") {
    return {
      cards: [
        {
          type: "lead",
          data: {
            title: "Project Requirement Intake",
            subtitle: "Fill in the core parameters for your project estimate",
            services: [
              "Full-Stack MERN Web App",
              "E-Commerce Storefront",
              "Landing Page & UI/UX",
              "DevOps / CI/CD",
            ],
            timelineOptions: ["1-2 Weeks", "3-4 Weeks", "1-2 Months", "Flexible"],
            budgetOptions: [
              "₹10,000 - ₹25,000",
              "₹25,000 - ₹50,000",
              "₹50,000+",
              "Custom / Flexible",
            ],
          },
        },
      ],
      suggestions: [
        "What services do you offer?",
        "Show me your previous projects",
        "How can I contact Aayush directly?",
      ],
    };
  }

  // If projects tool was called or intent is project
  if (toolNames.includes("getProjects") || toolNames.includes("getProjectById") || intent === "project") {
    let filteredProjects = PORTFOLIO_KNOWLEDGE.projects;

    if (query.includes("ecommerce") || query.includes("e-commerce") || query.includes("shop")) {
      const ecom = PORTFOLIO_KNOWLEDGE.projects.filter((p) => p.id === "mern-ecommerce");
      if (ecom.length > 0) filteredProjects = ecom;
    } else if (query.includes("docker") || query.includes("cicd") || query.includes("devops")) {
      const devops = PORTFOLIO_KNOWLEDGE.projects.filter((p) => p.id === "devops-cicd-pipeline");
      if (devops.length > 0) filteredProjects = devops;
    } else if (query.includes("portfolio") || query.includes("ai")) {
      const aiPort = PORTFOLIO_KNOWLEDGE.projects.filter((p) => p.id === "mern-portfolio-ai");
      if (aiPort.length > 0) filteredProjects = aiPort;
    }

    return {
      cards: filteredProjects.map((p) => ({
        type: "project",
        data: p,
      })),
      suggestions: [
        "Tell me more about this project",
        "Show me another project",
        "What technologies were used?",
        "What services do you offer?",
      ],
    };
  }

  // If services tool was called or intent is service
  if (toolNames.includes("getServices") || intent === "service") {
    let filteredServices = PORTFOLIO_KNOWLEDGE.services;

    if (
      query.includes("ecommerce") ||
      query.includes("e-commerce") ||
      query.includes("store") ||
      query.includes("shop")
    ) {
      const ecom = PORTFOLIO_KNOWLEDGE.services.filter((s) => s.id === "ecommerce");
      if (ecom.length > 0) filteredServices = ecom;
    } else if (query.includes("landing") || query.includes("ui/ux") || query.includes("design")) {
      const landing = PORTFOLIO_KNOWLEDGE.services.filter((s) => s.id === "landing-page");
      if (landing.length > 0) filteredServices = landing;
    } else if (
      query.includes("devops") ||
      query.includes("docker") ||
      query.includes("cloud") ||
      query.includes("cicd")
    ) {
      const devops = PORTFOLIO_KNOWLEDGE.services.filter((s) => s.id === "devops-cicd");
      if (devops.length > 0) filteredServices = devops;
    } else if (
      query.includes("mern") ||
      query.includes("full-stack") ||
      query.includes("full stack")
    ) {
      const mern = PORTFOLIO_KNOWLEDGE.services.filter((s) => s.id === "mern-web-app");
      if (mern.length > 0) filteredServices = mern;
    }

    return {
      cards: filteredServices.map((s) => ({
        type: "service",
        data: s,
      })),
      suggestions: [
        "Show me your ecommerce projects",
        "What features can you build?",
        "Start a Project requirement",
        "How can I contact Aayush?",
      ],
    };
  }

  switch (intent) {
    case "portfolio": {
      return {
        cards: [],
        suggestions: [
          "Show me your MERN projects",
          "What services do you offer?",
          "How can I contact Aayush?",
          "Explain JWT authentication",
        ],
      };
    }

    case "technical": {
      return {
        cards: [],
        suggestions: [
          "Explain with a code example",
          "Show me the best practice",
          "Show me your MERN projects",
          "What services do you offer?",
        ],
      };
    }

    case "contact": {
      return {
        cards: [],
        suggestions: [
          "View GitHub",
          "View LinkedIn",
          "Start a Project requirement",
          "What services do you offer?",
        ],
      };
    }

    case "pricing": {
      return {
        cards: [],
        suggestions: [
          "Start a Project requirement",
          "What services do you offer?",
          "Show me your MERN projects",
          "How can I contact Aayush?",
        ],
      };
    }

    case "unsupported": {
      return {
        cards: [],
        suggestions: [
          "Explore Services",
          "View Projects",
          "Ask a Technical Question",
          "How to contact Aayush?",
        ],
      };
    }

    case "general":
    default: {
      return {
        cards: [],
        suggestions: [
          "Explore Services",
          "View Projects",
          "Explain JWT authentication",
          "Start a Project",
        ],
      };
    }
  }
}

/**
 * POST /api/chat/start
 * Initializes a new conversation session
 */
async function startSession(req, res, next) {
  try {
    const sessionId = generateSessionId();

    if (isDbConnected()) {
      try {
        await ChatSession.create({
          sessionId,
          startedAt: new Date(),
          lastActiveAt: new Date(),
          source: typeof req.body?.source === "string" ? req.body.source.slice(0, 50) : "portfolio",
          messageCount: 0,
        });
      } catch (dbErr) {
        console.warn("⚠️ [ChatController] Failed to persist new session in DB:", dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      sessionId,
    });
  } catch (error) {
    console.error("Error starting chat session:", error);
    return res.status(500).json({
      success: false,
      message: "Could not start chat session. Please try again.",
    });
  }
}

/**
 * GET /api/chat/session/:sessionId
 * Retrieves existing chat messages for a session
 */
async function getSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    if (!sessionId || typeof sessionId !== "string" || sessionId.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid session ID.",
      });
    }

    let messages = [];

    if (isDbConnected()) {
      try {
        const dbMessages = await ChatMessage.find({ sessionId: sessionId.trim() })
          .sort({ createdAt: 1 })
          .limit(100)
          .lean();

        messages = dbMessages.map((m) => ({
          id: m._id,
          role: m.role,
          content: m.content,
          intent: m.intent || "general",
          createdAt: m.createdAt,
        }));
      } catch (dbErr) {
        console.warn("⚠️ [ChatController] Failed to load session messages from DB:", dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      session: {
        sessionId: sessionId.trim(),
        messages,
      },
    });
  } catch (error) {
    console.error("Error fetching chat session:", error);
    return res.status(500).json({
      success: false,
      message: "Could not retrieve chat session.",
    });
  }
}

/**
 * DELETE /api/chat/session/:sessionId
 * Clears conversation history for a session
 */
async function clearSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid session ID.",
      });
    }

    if (isDbConnected()) {
      try {
        await ChatMessage.deleteMany({ sessionId: sessionId.trim() });
        await ChatSession.deleteOne({ sessionId: sessionId.trim() });
      } catch (dbErr) {
        console.warn("⚠️ [ChatController] Failed to clear session from DB:", dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Chat session cleared.",
    });
  } catch (error) {
    console.error("Error clearing chat session:", error);
    return res.status(500).json({
      success: false,
      message: "Could not clear chat session.",
    });
  }
}

/**
 * POST /api/chat
 * Handles chat queries with standard complete response
 */
async function handleChat(req, res, next) {
  const startTime = Date.now();
  try {
    let { sessionId, message, messages } = req.body;

    // 1. Session ID validation or generation
    if (!sessionId || typeof sessionId !== "string" || sessionId.trim().length === 0) {
      sessionId = generateSessionId();
    } else {
      sessionId = sessionId.trim().slice(0, 100);
    }

    // 2. Message validation
    if (message === undefined || message === null) {
      return res.status(400).json({
        success: false,
        message: "Missing 'message' in request body.",
      });
    }

    if (typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "'message' must be a valid string.",
      });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty.",
      });
    }

    if (trimmedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message exceeds the maximum allowed length of 2000 characters.",
      });
    }

    // 3. Build conversation history
    let sanitizedHistory = [];

    if (isDbConnected()) {
      try {
        await ChatSession.findOneAndUpdate(
          { sessionId },
          {
            $setOnInsert: { startedAt: new Date(), source: "portfolio" },
            $set: { lastActiveAt: new Date() },
          },
          { upsert: true, new: true }
        );

        const recentDbMessages = await ChatMessage.find({ sessionId })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();

        if (recentDbMessages.length > 0) {
          sanitizedHistory = recentDbMessages
            .reverse()
            .map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              content: m.content.slice(0, 2000),
            }));
        }
      } catch (dbReadErr) {
        console.warn("⚠️ [ChatController] DB history read warning:", dbReadErr.message);
      }
    }

    if (sanitizedHistory.length === 0 && Array.isArray(messages)) {
      sanitizedHistory = messages
        .slice(-20)
        .filter(
          (m) =>
            m &&
            typeof m === "object" &&
            typeof m.content === "string" &&
            (m.role === "user" || m.role === "assistant" || m.role === "model")
        )
        .map((m) => ({
          role: m.role === "assistant" ? "model" : m.role,
          content: m.content.slice(0, 2000),
        }));
    }

    // 4. Intent Classification
    const { intent, confidence } = classifyIntent(trimmedMessage, sanitizedHistory);
    const safeIntent = sanitizeIntent(intent);

    // 5. Persist User Message to DB
    if (isDbConnected()) {
      try {
        await ChatMessage.create({
          sessionId,
          role: "user",
          content: trimmedMessage,
          intent: safeIntent,
        });
      } catch (dbUserSaveErr) {
        console.warn("⚠️ [ChatController] DB user message save warning:", dbUserSaveErr.message);
      }
    }

    // 6. Context Selection
    const portfolioContext = getPortfolioContext(safeIntent, trimmedMessage);

    // 7. Generate Gemini Response with function calling
    const reply = await generateGeminiResponse(
      trimmedMessage,
      sanitizedHistory,
      portfolioContext,
      safeIntent,
      { sessionId }
    );

    // 8. Persist Assistant Response to DB
    if (isDbConnected()) {
      try {
        await ChatMessage.create({
          sessionId,
          role: "assistant",
          content: reply,
          intent: safeIntent,
        });

        await ChatSession.updateOne(
          { sessionId },
          {
            $inc: { messageCount: 2 },
            $set: { lastActiveAt: new Date() },
          }
        );
      } catch (dbAiSaveErr) {
        console.warn("⚠️ [ChatController] DB assistant message save warning:", dbAiSaveErr.message);
      }
    }

    // 9. Derive Rich UI Cards & Suggestions
    const metadata = deriveMetadataForIntent(safeIntent, trimmedMessage);

    const duration = Date.now() - startTime;
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `💬 [Chat] Session: ${sessionId.slice(0, 16)}... | Query: "${trimmedMessage.slice(0, 35)}..." | Intent: ${safeIntent} (${confidence.toFixed(2)}) | Duration: ${duration}ms`
      );
    }

    return res.status(200).json({
      success: true,
      sessionId: sessionId,
      reply: reply,
      intent: safeIntent,
      cards: metadata.cards,
      suggestions: metadata.suggestions,
    });
  } catch (error) {
    console.error("Chat controller error:", error);
    return res.status(500).json({
      success: false,
      message: "I couldn't process that message right now. Please try again.",
    });
  }
}

/**
 * POST /api/chat/stream
 * Progressive streaming chat handler using Server-Sent Events (SSE) with function calling
 */
async function handleChatStream(req, res, next) {
  const startTime = Date.now();

  // 1. Establish SSE headers
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  // Helper to send SSE event safely
  const sendEvent = (eventData) => {
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    }
  };

  try {
    let { sessionId, message, messages } = req.body;

    // 2. Session ID validation or generation
    if (!sessionId || typeof sessionId !== "string" || sessionId.trim().length === 0) {
      sessionId = generateSessionId();
    } else {
      sessionId = sessionId.trim().slice(0, 100);
    }

    // 3. Message validation
    if (message === undefined || message === null || typeof message !== "string" || message.trim().length === 0) {
      sendEvent({
        type: "error",
        message: "Message cannot be empty.",
      });
      return res.end();
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length > 2000) {
      sendEvent({
        type: "error",
        message: "Message exceeds maximum allowed length of 2000 characters.",
      });
      return res.end();
    }

    // 4. Build conversation history
    let sanitizedHistory = [];

    if (isDbConnected()) {
      try {
        await ChatSession.findOneAndUpdate(
          { sessionId },
          {
            $setOnInsert: { startedAt: new Date(), source: "portfolio" },
            $set: { lastActiveAt: new Date() },
          },
          { upsert: true, new: true }
        );

        const recentDbMessages = await ChatMessage.find({ sessionId })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();

        if (recentDbMessages.length > 0) {
          sanitizedHistory = recentDbMessages
            .reverse()
            .map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              content: m.content.slice(0, 2000),
            }));
        }
      } catch (dbReadErr) {
        console.warn("⚠️ [ChatStream] DB history read warning:", dbReadErr.message);
      }
    }

    if (sanitizedHistory.length === 0 && Array.isArray(messages)) {
      sanitizedHistory = messages
        .slice(-20)
        .filter(
          (m) =>
            m &&
            typeof m === "object" &&
            typeof m.content === "string" &&
            (m.role === "user" || m.role === "assistant" || m.role === "model")
        )
        .map((m) => ({
          role: m.role === "assistant" ? "model" : m.role,
          content: m.content.slice(0, 2000),
        }));
    }

    // 5. Intent Classification
    const { intent, confidence } = classifyIntent(trimmedMessage, sanitizedHistory);
    const safeIntent = sanitizeIntent(intent);

    // 6. Persist User Message to DB
    if (isDbConnected()) {
      try {
        await ChatMessage.create({
          sessionId,
          role: "user",
          content: trimmedMessage,
          intent: safeIntent,
        });
      } catch (dbUserSaveErr) {
        console.warn("⚠️ [ChatStream] DB user message save warning:", dbUserSaveErr.message);
      }
    }

    // 7. Context Selection
    const portfolioContext = getPortfolioContext(safeIntent, trimmedMessage);

    // 8. Emit start event
    sendEvent({
      type: "start",
      sessionId,
      intent: safeIntent,
    });

    // 9. AbortController for client disconnect handling
    const abortController = new AbortController();
    req.on("close", () => {
      abortController.abort();
    });

    // 10. Stream Gemini Response with function calling
    const { fullText: completeReply, executedTools = [] } = await streamGeminiResponse(
      trimmedMessage,
      sanitizedHistory,
      portfolioContext,
      safeIntent,
      (chunkText) => {
        sendEvent({
          type: "chunk",
          text: chunkText,
        });
      },
      abortController.signal,
      {
        sessionId,
        onToolActivity: (toolName) => {
          sendEvent({
            type: "tool",
            name: toolName,
          });
        },
      }
    );

    // 11. Persist Completed Assistant Response to DB
    if (!abortController.signal.aborted && completeReply) {
      if (isDbConnected()) {
        try {
          await ChatMessage.create({
            sessionId,
            role: "assistant",
            content: completeReply,
            intent: safeIntent,
          });

          await ChatSession.updateOne(
            { sessionId },
            {
              $inc: { messageCount: 2 },
              $set: { lastActiveAt: new Date() },
            }
          );
        } catch (dbAiSaveErr) {
          console.warn("⚠️ [ChatStream] DB assistant message save warning:", dbAiSaveErr.message);
        }
      }

      // 12. Derive Rich UI Cards & Suggestions
      const metadata = deriveMetadataForIntent(safeIntent, trimmedMessage, executedTools);

      // 13. Emit complete done event
      sendEvent({
        type: "done",
        sessionId,
        reply: completeReply,
        intent: safeIntent,
        cards: metadata.cards,
        suggestions: metadata.suggestions,
        executedTools,
      });
    }

    const duration = Date.now() - startTime;
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `⚡ [ChatStream] Session: ${sessionId.slice(0, 16)}... | Intent: ${safeIntent} (${confidence.toFixed(2)}) | Tools: ${executedTools.length} | Duration: ${duration}ms`
      );
    }

    return res.end();
  } catch (error) {
    console.error("Chat streaming error:", error.message || error);
    sendEvent({
      type: "error",
      message: "I couldn't process that message right now. Please try again.",
    });
    return res.end();
  }
}

module.exports = {
  startSession,
  getSession,
  clearSession,
  handleChat,
  handleChatStream,
};
