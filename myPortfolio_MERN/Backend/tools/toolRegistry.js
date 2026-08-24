/**
 * Tool Registry
 * Whitelist registry of approved Gemini tools, schemas, and handler mappings.
 * Unregistered tools are strictly prohibited from execution.
 */

const {
  getPortfolioProfile,
  getServices,
  getProjects,
  getProjectById,
  getContactInfo,
} = require("./portfolioTools");
const { createLeadDraft } = require("./leadTools");
const { getConversationSummary } = require("./conversationTools");

const FUNCTION_DECLARATIONS = [
  {
    name: "getPortfolioProfile",
    description:
      "Returns verified public developer profile info for Aayush Sharma including title, experience, and core skills overview.",
    parameters: {
      type: "OBJECT",
      properties: {},
    },
  },
  {
    name: "getServices",
    description:
      "Returns available developer services offered by Aayush (e.g. Full-Stack MERN, E-Commerce, Landing Pages, DevOps). Optional category to filter.",
    parameters: {
      type: "OBJECT",
      properties: {
        category: {
          type: "STRING",
          description: "Optional service category filter (e.g. ecommerce, landing, mern, devops)",
        },
      },
    },
  },
  {
    name: "getProjects",
    description:
      "Returns verified showcase portfolio projects by Aayush with tech stack and live links. Supports filtering by category or technology.",
    parameters: {
      type: "OBJECT",
      properties: {
        category: {
          type: "STRING",
          description: "Optional project category (e.g. ecommerce, ai, devops, mern)",
        },
        technology: {
          type: "STRING",
          description: "Optional technology filter (e.g. MERN, React, Node, Docker)",
        },
        limit: {
          type: "INTEGER",
          description: "Max number of projects to return (1 to 10)",
        },
      },
    },
  },
  {
    name: "getProjectById",
    description: "Returns detailed parameters for a single verified project by its unique ID.",
    parameters: {
      type: "OBJECT",
      properties: {
        projectId: {
          type: "STRING",
          description:
            "Project identifier (e.g. mern-ecommerce, mern-portfolio-ai, devops-cicd-pipeline)",
        },
      },
      required: ["projectId"],
    },
  },
  {
    name: "getContactInfo",
    description:
      "Returns verified public social links, email, availability, and contact information for Aayush.",
    parameters: {
      type: "OBJECT",
      properties: {},
    },
  },
  {
    name: "createLeadDraft",
    description:
      "Captures a structured temporary client project intake draft from user requirements to display the intake form.",
    parameters: {
      type: "OBJECT",
      properties: {
        projectType: {
          type: "STRING",
          description: "Selected or described project type (e.g. Full-Stack MERN, E-Commerce, Landing Page)",
        },
        businessType: {
          type: "STRING",
          description: "Client business domain or niche",
        },
        requirements: {
          type: "STRING",
          description: "Summary of project requirements",
        },
        timeline: {
          type: "STRING",
          description: "Estimated timeline preference (e.g. 1-2 Weeks, 1-2 Months)",
        },
        budget: {
          type: "STRING",
          description: "Estimated budget range",
        },
      },
      required: ["projectType"],
    },
  },
  {
    name: "getConversationSummary",
    description:
      "Provides a compact summary of safe conversation history for the current session.",
    parameters: {
      type: "OBJECT",
      properties: {
        sessionId: {
          type: "STRING",
          description: "The active session ID",
        },
      },
      required: ["sessionId"],
    },
  },
];

const HANDLER_MAP = {
  getPortfolioProfile,
  getServices,
  getProjects,
  getProjectById,
  getContactInfo,
  createLeadDraft,
  getConversationSummary,
};

/**
 * Returns Gemini SDK compatible tools configuration array
 */
function getGeminiToolsConfig() {
  return [
    {
      functionDeclarations: FUNCTION_DECLARATIONS,
    },
  ];
}

/**
 * Retrieves the handler function for a given tool name
 * @param {string} toolName
 * @returns {Function|null}
 */
function getToolHandler(toolName) {
  if (typeof toolName !== "string") return null;
  return HANDLER_MAP[toolName.trim()] || null;
}

/**
 * Check if a tool is registered in the whitelist
 * @param {string} toolName
 * @returns {boolean}
 */
function isToolRegistered(toolName) {
  return typeof toolName === "string" && Object.prototype.hasOwnProperty.call(HANDLER_MAP, toolName.trim());
}

module.exports = {
  getGeminiToolsConfig,
  getToolHandler,
  isToolRegistered,
  FUNCTION_DECLARATIONS,
};
