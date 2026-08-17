// server.js
// Main entry point for the Portfolio Backend (Express + MongoDB)

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

//const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// ──────────────────────────────────────────
// Connect to MongoDB
// ──────────────────────────────────────────
//connectDB();

const app = express();

// ──────────────────────────────────────────
// Security Middleware
// ──────────────────────────────────────────
app.use(helmet()); // Sets various HTTP security headers

// Rate limiting — 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// ──────────────────────────────────────────
// CORS — Allow frontend origin
// ──────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} not allowed.`));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ──────────────────────────────────────────
// Body Parsing & Logging
// ──────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));       // Parse JSON bodies (max 10 KB)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// ──────────────────────────────────────────
// Health Check Route
// ──────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running 🚀",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ──────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);

// ──────────────────────────────────────────
// Error Handling (must be last)
// ──────────────────────────────────────────
app.use(notFound);     // Catch unmatched routes → 404
app.use(errorHandler); // Global error handler

// ──────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📡  API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥  Health check: http://localhost:${PORT}/api/health\n`);
});
