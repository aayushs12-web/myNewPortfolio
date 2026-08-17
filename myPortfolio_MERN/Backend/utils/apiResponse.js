// utils/apiResponse.js
// Consistent API response helper functions

/**
 * Send a successful response
 * @param {Object} res  - Express response object
 * @param {number} statusCode - HTTP status code (default 200)
 * @param {string} message - Human-readable message
 * @param {*}      data  - Payload to send
 */
const successResponse = (res, statusCode = 200, message = "Success", data = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res
 * @param {number} statusCode
 * @param {string} message
 * @param {Array}  errors - Optional validation error array
 */
const errorResponse = (res, statusCode = 500, message = "Error", errors = null) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };
