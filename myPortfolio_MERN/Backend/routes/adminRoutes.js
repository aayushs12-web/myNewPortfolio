/**
 * Admin Routes
 * Protected endpoints for dashboard metrics, lead management, and conversation analytics
 */

const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  verifyAdminAuth,
  getDashboardSummary,
  getLeads,
  getLeadById,
  updateLeadStatus,
  getConversations,
  getConversationBySessionId,
  getAnalytics,
} = require("../controllers/adminController");

// Protect all admin endpoints with adminAuth
router.use(adminAuth);

// Auth verification
router.post("/auth/verify", verifyAdminAuth);

// Dashboard Overview
router.get("/dashboard", getDashboardSummary);

// Leads Management
router.get("/leads", getLeads);
router.get("/leads/:id", getLeadById);
router.patch("/leads/:id/status", updateLeadStatus);

// Conversations Monitoring
router.get("/conversations", getConversations);
router.get("/conversations/:sessionId", getConversationBySessionId);

// Analytics
router.get("/analytics", getAnalytics);

module.exports = router;
