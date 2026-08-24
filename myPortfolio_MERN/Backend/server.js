// server.js
// Main entry point for the Portfolio Backend (Express + MongoDB)
// Production Hardened (Phase 8)

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const { connectDB, isDbConnected } = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const chatRoutes = require("./routes/chatRoutes");
const leadRoutes = require("./routes/leadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// ──────────────────────────────────────────
// Connect to MongoDB Atlas
// ──────────────────────────────────────────
connectDB();

const app = express();

// ──────────────────────────────────────────
// Security Headers via Helmet
// ──────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Managed at gateway/CDN level for SPAs
  })
);

// ──────────────────────────────────────────
// CORS — Configurable Multi-Origin Policy
// ──────────────────────────────────────────
const rawOrigins = process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:3000";
const allowedOrigins = rawOrigins
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Always allow local dev addresses in non-production
if (process.env.NODE_ENV !== "production") {
  if (!allowedOrigins.includes("http://localhost:5173")) allowedOrigins.push("http://localhost:5173");
  if (!allowedOrigins.includes("http://localhost:3000")) allowedOrigins.push("http://localhost:3000");
  if (!allowedOrigins.includes("http://127.0.0.1:5173")) allowedOrigins.push("http://127.0.0.1:5173");
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, automated testing)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin '${origin}' is not allowed.`));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-admin-key"],
    credentials: true,
  })
);

// ──────────────────────────────────────────
// Multi-Tier Rate Limiting
// ──────────────────────────────────────────
// Tier 1: General API limiter (120 req / 15 min)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  message: { success: false, message: "Too many requests from this IP. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", generalLimiter);

// Tier 2: AI Chat & Streaming limiter (40 req / 5 min per IP)
const aiChatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 40,
  message: { success: false, message: "Chat rate limit reached. Please wait a moment before sending another message." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/chat", aiChatLimiter);

// Tier 3: Admin Auth Verification limiter (15 attempts / 15 min)
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: "Too many admin login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/admin/auth", adminAuthLimiter);

// ──────────────────────────────────────────
// Body Parsing & Logging
// ──────────────────────────────────────────
app.use(express.json({ limit: "25kb" }));       // Parse JSON bodies (max 25 KB)
app.use(express.urlencoded({ extended: true, limit: "25kb" }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// ──────────────────────────────────────────
// Production Health Check Route
// ──────────────────────────────────────────
app.get("/api/health", (req, res) => {
  const isHealthy = isDbConnected();
  res.status(isHealthy ? 200 : 200).json({
    success: true,
    status: isHealthy ? "healthy" : "degraded",
    environment: process.env.NODE_ENV || "development",
    uptime: Math.floor(process.uptime()),
    services: {
      database: isHealthy ? "connected" : "disconnected",
      aiService: !!process.env.GEMINI_API_KEY ? "configured" : "unconfigured",
    },
    timestamp: new Date().toISOString(),
  });
});

// ──────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);

// ──────────────────────────────────────────
// Error Handling (must be last)
// ──────────────────────────────────────────
app.use(notFound);     // Catch unmatched routes → 404
app.use(errorHandler); // Global error handler

// ──────────────────────────────────────────
// Start Server with Graceful Shutdown
// ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀  Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  console.log(`📡  API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥  Health check: http://localhost:${PORT}/api/health\n`);
});

// Graceful Shutdown Handlers (SIGTERM, SIGINT)
function handleGracefulShutdown(signal) {
  console.log(`\n🛑  Received ${signal}. Initiating graceful server shutdown...`);

  server.close(async () => {
    console.log("🔒  Closed remaining active HTTP connections.");

    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close(false);
        console.log("🗄️   MongoDB Atlas connection closed safely.");
      }
    } catch (err) {
      console.warn("⚠️  Error while closing MongoDB connection:", err.message);
    }

    console.log("👋  Server process terminated cleanly.\n");
    process.exit(0);
  });

  // Force close after 10s timeout if connections hang
  setTimeout(() => {
    console.error("⚠️  Forced shutdown: Connections did not close in time.");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));
process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));

module.exports = { app, server };
