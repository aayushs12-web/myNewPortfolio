/**
 * Admin Controller
 * High-performance backend analytics, lead management, and conversation monitoring
 * using native MongoDB aggregations and paginated queries.
 */

const mongoose = require("mongoose");
const ChatSession = require("../models/ChatSession");
const ChatMessage = require("../models/ChatMessage");
const Lead = require("../models/Lead");
const { isDbConnected } = require("../config/db");

const VALID_STATUSES = new Set(["new", "contacted", "in-progress", "completed", "closed"]);

/**
 * Helper to calculate start date for range filters
 */
function getStartDateForRange(range = "30d") {
  const now = new Date();
  switch (range) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "90d":
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    case "all":
      return new Date(0);
    case "30d":
    default:
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
}

/**
 * POST /api/admin/auth/verify
 * Verifies admin credentials provided from admin login
 */
async function verifyAdminAuth(req, res) {
  return res.status(200).json({
    success: true,
    message: "Admin authenticated successfully.",
  });
}

/**
 * GET /api/admin/dashboard
 * Aggregated overview metrics and recent records for the main dashboard
 */
async function getDashboardSummary(req, res) {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        summary: {
          totalConversations: 0,
          totalLeads: 0,
          newLeads: 0,
          conversionRate: 0,
          activeConversations: 0,
        },
        recentLeads: [],
        recentConversations: [],
      });
    }

    const [totalConversations, totalLeads, newLeads, recentLeads, recentConversations] =
      await Promise.all([
        ChatSession.countDocuments(),
        Lead.countDocuments(),
        Lead.countDocuments({ status: "new" }),
        Lead.find().sort({ createdAt: -1 }).limit(6).lean(),
        ChatSession.find().sort({ lastActiveAt: -1 }).limit(6).lean(),
      ]);

    const conversionRate =
      totalConversations > 0 ? parseFloat(((totalLeads / totalConversations) * 100).toFixed(1)) : 0;

    return res.status(200).json({
      success: true,
      summary: {
        totalConversations,
        totalLeads,
        newLeads,
        conversionRate,
      },
      recentLeads,
      recentConversations,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard summary data.",
    });
  }
}

/**
 * GET /api/admin/leads
 * Paginated, filtered, and searchable leads list
 */
async function getLeads(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const { search, status, projectType, range } = req.query;
    const filter = {};

    if (status && status !== "all" && VALID_STATUSES.has(status.toLowerCase())) {
      filter.status = status.toLowerCase();
    }

    if (projectType && projectType !== "all") {
      filter.projectType = projectType;
    }

    if (range) {
      const startDate = getStartDateForRange(range);
      filter.createdAt = { $gte: startDate };
    }

    if (search && typeof search === "string" && search.trim().length > 0) {
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(safeSearch, "i");
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { projectType: searchRegex },
        { businessType: searchRegex },
      ];
    }

    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      });
    }

    const [total, items] = await Promise.all([
      Lead.countDocuments(filter),
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 0;

    return res.status(200).json({
      success: true,
      items,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Get leads error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load leads list.",
    });
  }
}

/**
 * GET /api/admin/leads/:id
 * Retrieve a single lead detail with associated conversation session messages
 */
async function getLeadById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID format.",
      });
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable.",
      });
    }

    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    // Retrieve associated conversation messages if sessionId is present
    let conversation = null;
    let messages = [];

    if (lead.sessionId) {
      conversation = await ChatSession.findOne({ sessionId: lead.sessionId }).lean();
      messages = await ChatMessage.find({ sessionId: lead.sessionId })
        .sort({ createdAt: 1 })
        .limit(100)
        .lean();
    }

    return res.status(200).json({
      success: true,
      lead,
      conversation: {
        session: conversation,
        messages: messages.map((m) => ({
          id: m._id,
          role: m.role,
          content: m.content,
          intent: m.intent,
          createdAt: m.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get lead by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load lead details.",
    });
  }
}

/**
 * PATCH /api/admin/leads/:id/status
 * Updates lead status with validation
 */
async function updateLeadStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID format.",
      });
    }

    if (!status || typeof status !== "string" || !VALID_STATUSES.has(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: new, contacted, in-progress, completed, closed.",
      });
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable.",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Lead status updated to '${status.toLowerCase()}'.`,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Update lead status error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update lead status.",
    });
  }
}

/**
 * GET /api/admin/conversations
 * Paginated list of all chatbot conversation sessions
 */
async function getConversations(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const { search, range } = req.query;
    const filter = {};

    if (range) {
      const startDate = getStartDateForRange(range);
      filter.lastActiveAt = { $gte: startDate };
    }

    if (search && typeof search === "string" && search.trim().length > 0) {
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.sessionId = new RegExp(safeSearch, "i");
    }

    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      });
    }

    const [total, items] = await Promise.all([
      ChatSession.countDocuments(filter),
      ChatSession.find(filter).sort({ lastActiveAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 0;

    return res.status(200).json({
      success: true,
      items,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Get conversations error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load conversations list.",
    });
  }
}

/**
 * GET /api/admin/conversations/:sessionId
 * Chronological messages for a specific session
 */
async function getConversationBySessionId(req, res) {
  try {
    const { sessionId } = req.params;

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid session ID.",
      });
    }

    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        session: null,
        messages: [],
      });
    }

    const [session, messages, associatedLead] = await Promise.all([
      ChatSession.findOne({ sessionId: sessionId.trim() }).lean(),
      ChatMessage.find({ sessionId: sessionId.trim() }).sort({ createdAt: 1 }).limit(100).lean(),
      Lead.findOne({ sessionId: sessionId.trim() }).lean(),
    ]);

    if (!session && messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Conversation session not found.",
      });
    }

    return res.status(200).json({
      success: true,
      session,
      lead: associatedLead || null,
      messages: messages.map((m) => ({
        id: m._id,
        role: m.role,
        content: m.content,
        intent: m.intent,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get conversation by sessionId error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load conversation.",
    });
  }
}

/**
 * GET /api/admin/analytics
 * Comprehensive MongoDB aggregations for intent distribution, project types, and conversion metrics
 */
async function getAnalytics(req, res) {
  try {
    const { range = "30d" } = req.query;
    const startDate = getStartDateForRange(range);

    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        metrics: {
          totalConversations: 0,
          totalLeads: 0,
          conversionRate: 0,
          averageMessagesPerConversation: 0,
        },
        intentDistribution: [],
        projectTypeDistribution: [],
        statusDistribution: [],
        leadsOverTime: [],
        conversationsOverTime: [],
      });
    }

    const dateFilter = { createdAt: { $gte: startDate } };
    const sessionDateFilter = { startedAt: { $gte: startDate } };

    // Parallel Aggregation Pipeline Execution
    const [
      totalConversations,
      totalLeads,
      sessionStats,
      intentAgg,
      projectTypeAgg,
      statusAgg,
      leadsOverTimeAgg,
      conversationsOverTimeAgg,
    ] = await Promise.all([
      ChatSession.countDocuments(sessionDateFilter),
      Lead.countDocuments(dateFilter),
      ChatSession.aggregate([
        { $match: sessionDateFilter },
        {
          $group: {
            _id: null,
            avgMessages: { $avg: "$messageCount" },
          },
        },
      ]),
      ChatMessage.aggregate([
        { $match: { createdAt: { $gte: startDate }, role: "user" } },
        {
          $group: {
            _id: "$intent",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$projectType",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      ChatSession.aggregate([
        { $match: sessionDateFilter },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$startedAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const conversionRate =
      totalConversations > 0 ? parseFloat(((totalLeads / totalConversations) * 100).toFixed(1)) : 0;
    const avgMessages =
      sessionStats.length > 0 && sessionStats[0].avgMessages
        ? parseFloat(sessionStats[0].avgMessages.toFixed(1))
        : 0;

    // Calculate Intent Percentages
    const totalIntentQueries = intentAgg.reduce((acc, curr) => acc + curr.count, 0);
    const intentDistribution = intentAgg.map((item) => ({
      intent: item._id || "general",
      count: item.count,
      percentage: totalIntentQueries > 0 ? parseFloat(((item.count / totalIntentQueries) * 100).toFixed(1)) : 0,
    }));

    // Calculate Project Type Percentages
    const totalProjects = projectTypeAgg.reduce((acc, curr) => acc + curr.count, 0);
    const projectTypeDistribution = projectTypeAgg.map((item) => ({
      projectType: item._id || "Custom",
      count: item.count,
      percentage: totalProjects > 0 ? parseFloat(((item.count / totalProjects) * 100).toFixed(1)) : 0,
    }));

    return res.status(200).json({
      success: true,
      range,
      metrics: {
        totalConversations,
        totalLeads,
        conversionRate,
        averageMessagesPerConversation: avgMessages,
      },
      intentDistribution,
      projectTypeDistribution,
      statusDistribution: statusAgg.map((s) => ({ status: s._id, count: s.count })),
      leadsOverTime: leadsOverTimeAgg.map((l) => ({ date: l._id, count: l.count })),
      conversationsOverTime: conversationsOverTimeAgg.map((c) => ({ date: c._id, count: c.count })),
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to calculate analytics.",
    });
  }
}

module.exports = {
  verifyAdminAuth,
  getDashboardSummary,
  getLeads,
  getLeadById,
  updateLeadStatus,
  getConversations,
  getConversationBySessionId,
  getAnalytics,
};
