/**
 * Chat Routes
 * Maps /api/chat endpoints including session lifecycle, standard complete response, and progressive streaming
 */

const express = require("express");
const router = express.Router();
const {
  startSession,
  getSession,
  clearSession,
  handleChat,
  handleChatStream,
} = require("../controllers/chatController");

// POST /api/chat/start - Initialize a new session
router.post("/start", startSession);

// GET /api/chat/session/:sessionId - Retrieve conversation history for a session
router.get("/session/:sessionId", getSession);

// DELETE /api/chat/session/:sessionId - Clear conversation history for a session
router.delete("/session/:sessionId", clearSession);

// POST /api/chat/stream - Progressive streaming response (SSE)
router.post("/stream", handleChatStream);

// POST /api/chat - Standard complete response (backward compatible)
router.post("/", handleChat);

module.exports = router;
