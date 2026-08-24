/**
 * Lead Tools
 * Handles structured temporary project intake drafts.
 * NOTE: This tool creates a DRAFT object in memory; it NEVER creates a permanent Lead document.
 * Permanent leads are strictly created when the user explicitly submits the LeadForm via POST /api/leads.
 */

/**
 * Tool 6: createLeadDraft
 * Formats client parameters into a structured draft for the UI LeadForm
 */
async function createLeadDraft(args = {}) {
  const projectType = typeof args.projectType === "string" ? args.projectType.trim().slice(0, 100) : "Custom Web Application";
  const businessType = typeof args.businessType === "string" ? args.businessType.trim().slice(0, 100) : "";
  const requirements = typeof args.requirements === "string" ? args.requirements.trim().slice(0, 1000) : "";
  const timeline = typeof args.timeline === "string" ? args.timeline.trim().slice(0, 100) : "1-2 Months";
  const budget = typeof args.budget === "string" ? args.budget.trim().slice(0, 100) : "Flexible";
  const features = Array.isArray(args.features) ? args.features.map(f => String(f).slice(0, 80)).slice(0, 10) : [];

  return {
    success: true,
    isDraft: true,
    draft: {
      projectType,
      businessType,
      requirements,
      timeline,
      budget,
      features,
    },
    message: "Lead draft structured successfully. The user will be presented with the intake form to review and submit.",
  };
}

module.exports = {
  createLeadDraft,
};
