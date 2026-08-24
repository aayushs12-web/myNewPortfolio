// middleware/errorHandler.js
// Centralized, production-hardened error handling middleware

/**
 * Express error handler
 * Sanitizes errors in production to prevent leaking internal stack traces or server paths.
 */
const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Mongoose bad ObjectId (CastError)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource identifier format.",
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      success: false,
      message: `Duplicate record for: ${field}`,
    });
  }

  // CORS error
  if (err.message && err.message.includes("CORS policy")) {
    return res.status(403).json({
      success: false,
      message: "Access forbidden by CORS policy.",
    });
  }

  // Default server error
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  const safeMessage =
    statusCode === 500 && !isDev
      ? "An unexpected internal error occurred. Please try again later."
      : err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message: safeMessage,
    ...(isDev && { stack: err.stack }),
  });
};

module.exports = errorHandler;
