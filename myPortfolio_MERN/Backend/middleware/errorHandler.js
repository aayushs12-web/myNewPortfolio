// middleware/errorHandler.js
// Centralised error handling middleware — catches all unhandled errors

/**
 * Express error handler
 * Must have 4 parameters (err, req, res, next) for Express to recognise it as an error handler
 */
const errorHandler = (err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
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
      message: "Invalid resource ID format.",
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `Duplicate value for field: ${field}`,
    });
  }

  // Default — generic server error
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
