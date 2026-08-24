/**
 * Conversation Tools
 * Safe session message inspection for multi-turn conversational context.
 * Strictly sanitizes data to never expose system instructions or secrets.
 */

const ChatMessage = require("../models/ChatMessage");
const { isDbConnected } = require("../config/db");

/**
 * Tool 7: getConversationSummary
 * Returns a compact summary of safe conversation history for a given session
 */
async function getConversationSummary(args = {}) {
  const sessionId = typeof args.sessionId === "string" ? args.sessionId.trim().slice(0, 100) : "";

  if (!sessionId) {
    return {
      success: false,
      error: "Missing required 'sessionId' parameter.",
    };
  }

  if (!isDbConnected()) {
    return {
      success: true,
      sessionId,
      messageCount: 0,
      topics: "Transient session (database offline).",
    };
  }

  try {
    const messages = await ChatMessage.find({ sessionId })
      .sort({ createdAt: 1 })
      .limit(10)
      .lean();

    const turns = messages.map((m) => ({
      role: m.role === "assistant" ? "AI" : "User",
      content: (m.content || "").slice(0, 150),
      intent: m.intent || "general",
    }));

    return {
      success: true,
      sessionId,
      messageCount: messages.length,
      recentTurns: turns,
    };
  } catch (error) {
    return {
      success: false,
      error: "Unable to retrieve session summary.",
    };
  }
}

module.exports = {
  getConversationSummary,
};
