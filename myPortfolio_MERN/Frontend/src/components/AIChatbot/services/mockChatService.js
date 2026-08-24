/**
 * Chat Service Adapter (Phase 2)
 * Forwards chat interactions to the backend API (/api/chat).
 */

import { sendChatMessage } from "./chatbotApi";

export async function processMockChatMessage(userMessage, conversationHistory = []) {
  return await sendChatMessage(userMessage, conversationHistory);
}

export { sendChatMessage };
