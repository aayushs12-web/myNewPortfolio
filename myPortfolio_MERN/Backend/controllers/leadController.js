/**
 * Lead Controller
 * Handles project requirement submissions, input validation, duplicate protection, and database persistence.
 */

const Lead = require("../models/Lead");
const { isDbConnected } = require("../config/db");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates lead submission input fields.
 * @param {object} body
 * @returns {{ valid: boolean, error?: string, sanitizedData?: object }}
 */
function validateLeadInput(body = {}) {
  const {
    sessionId = "",
    name,
    email,
    phone = "",
    businessType = "",
    projectType,
    requirements = "",
    features = [],
    existingWebsite = "",
    references = [],
    budget = "",
    timeline = "",
    additionalRequirements = "",
  } = body;

  // 1. Name validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, error: "Please provide a valid name (at least 2 characters)." };
  }
  if (name.trim().length > 100) {
    return { valid: false, error: "Name cannot exceed 100 characters." };
  }

  // 2. Email validation
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: "Please provide a valid email address." };
  }
  if (email.trim().length > 150) {
    return { valid: false, error: "Email cannot exceed 150 characters." };
  }

  // 3. Project Type validation
  if (!projectType || typeof projectType !== "string" || projectType.trim().length < 2) {
    return { valid: false, error: "Please select or specify a project type." };
  }
  if (projectType.trim().length > 100) {
    return { valid: false, error: "Project type cannot exceed 100 characters." };
  }

  // 4. Phone validation (optional)
  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  if (trimmedPhone.length > 30) {
    return { valid: false, error: "Phone number cannot exceed 30 characters." };
  }

  // 5. Requirements validation
  const trimmedReq = typeof requirements === "string" ? requirements.trim() : "";
  if (trimmedReq.length > 3000) {
    return { valid: false, error: "Requirements cannot exceed 3000 characters." };
  }

  // 6. Features array validation
  const sanitizedFeatures = Array.isArray(features)
    ? features
        .filter((f) => typeof f === "string" && f.trim().length > 0)
        .slice(0, 20)
        .map((f) => f.trim().slice(0, 100))
    : [];

  // 7. References array validation
  const sanitizedReferences = Array.isArray(references)
    ? references
        .filter((r) => typeof r === "string" && r.trim().length > 0)
        .slice(0, 10)
        .map((r) => r.trim().slice(0, 300))
    : [];

  return {
    valid: true,
    sanitizedData: {
      sessionId: typeof sessionId === "string" ? sessionId.trim() : "",
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: trimmedPhone,
      businessType: typeof businessType === "string" ? businessType.trim().slice(0, 100) : "",
      projectType: projectType.trim(),
      requirements: trimmedReq,
      features: sanitizedFeatures,
      existingWebsite: typeof existingWebsite === "string" ? existingWebsite.trim().slice(0, 300) : "",
      references: sanitizedReferences,
      budget: typeof budget === "string" ? budget.trim().slice(0, 100) : "",
      timeline: typeof timeline === "string" ? timeline.trim().slice(0, 100) : "",
      additionalRequirements:
        typeof additionalRequirements === "string" ? additionalRequirements.trim().slice(0, 3000) : "",
    },
  };
}

/**
 * POST /api/leads
 * Submit a new client project lead from the AI Chatbot LeadForm
 */
async function submitLead(req, res, next) {
  try {
    const validation = validateLeadInput(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    const leadData = validation.sanitizedData;

    // Verify DB connectivity
    if (!isDbConnected()) {
      console.warn("⚠️ [LeadController] Database unavailable when submitting lead.");
      return res.status(503).json({
        success: false,
        message: "I couldn't submit your project requirements right now. Please try again.",
      });
    }

    // Duplicate submission protection (within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const duplicateQuery = {
      email: leadData.email,
      createdAt: { $gte: fiveMinutesAgo },
    };

    if (leadData.sessionId) {
      duplicateQuery.sessionId = leadData.sessionId;
    }

    const existingLead = await Lead.findOne(duplicateQuery).lean();

    if (existingLead) {
      return res.status(200).json({
        success: true,
        message: "Your project requirements have been submitted successfully. Aayush can review the details and get back to you.",
        duplicate: true,
      });
    }

    // Create lead record
    const newLead = await Lead.create(leadData);

    return res.status(201).json({
      success: true,
      message: "Project requirement submitted successfully.",
      leadId: newLead._id,
    });
  } catch (error) {
    console.error("Lead submission error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "I couldn't submit your project requirements right now. Please try again.",
    });
  }
}

module.exports = {
  submitLead,
  validateLeadInput,
};
