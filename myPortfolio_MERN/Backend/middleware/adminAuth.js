/**
 * Admin Authorization Middleware
 * Protects private admin endpoints from unauthenticated public access.
 * Checks for x-admin-key header or Bearer authorization header.
 */

function adminAuth(req, res, next) {
  const adminSecret =
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_API_KEY ||
    process.env.JWT_SECRET ||
    "aayush_admin_key_2026";

  const authHeader = req.headers["authorization"];
  const customAdminKey = req.headers["x-admin-key"];

  let providedKey = "";

  if (customAdminKey && typeof customAdminKey === "string") {
    providedKey = customAdminKey.trim();
  } else if (authHeader && typeof authHeader === "string") {
    if (authHeader.startsWith("Bearer ")) {
      providedKey = authHeader.slice(7).trim();
    } else {
      providedKey = authHeader.trim();
    }
  }

  if (!providedKey || providedKey !== adminSecret) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Private admin access required.",
    });
  }

  next();
}

module.exports = adminAuth;
