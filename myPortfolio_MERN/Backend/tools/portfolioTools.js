/**
 * Portfolio Tools
 * Approved tool handlers for developer profile, services, projects, and contact queries.
 * Queries only from verified PORTFOLIO_KNOWLEDGE dataset.
 */

const { PORTFOLIO_KNOWLEDGE } = require("../services/portfolioContextService");

/**
 * Tool 1: getPortfolioProfile
 * Returns verified public developer profile info for Aayush Sharma
 */
async function getPortfolioProfile() {
  const dev = PORTFOLIO_KNOWLEDGE.developer;
  const skills = PORTFOLIO_KNOWLEDGE.skills;

  return {
    success: true,
    data: {
      name: dev.name,
      title: dev.title,
      location: dev.location,
      status: dev.status,
      bio: dev.bio,
      experienceLevel: dev.experienceLevel,
      stats: dev.stats,
      coreSkills: {
        frontend: skills.frontend,
        backend: skills.backend,
        devopsAndCloud: skills.devopsAndCloud,
      },
    },
  };
}

/**
 * Tool 2: getServices
 * Returns verified available development services, with optional category filtering
 */
async function getServices(args = {}) {
  let services = [...PORTFOLIO_KNOWLEDGE.services];
  const category = typeof args.category === "string" ? args.category.trim().toLowerCase() : "";

  if (category) {
    const filtered = services.filter(
      (s) =>
        (s.id && s.id.toLowerCase().includes(category)) ||
        (s.title && s.title.toLowerCase().includes(category)) ||
        (s.description && s.description.toLowerCase().includes(category))
    );
    if (filtered.length > 0) {
      services = filtered;
    }
  }

  return {
    success: true,
    count: services.length,
    services: services.map((s) => ({
      id: s.id,
      title: s.title,
      badge: s.badge,
      description: s.description,
      features: s.features,
    })),
  };
}

/**
 * Tool 3: getProjects
 * Returns verified showcase portfolio projects with safe pagination and filters
 */
async function getProjects(args = {}) {
  let projects = [...PORTFOLIO_KNOWLEDGE.projects];
  const category = typeof args.category === "string" ? args.category.trim().toLowerCase() : "";
  const technology = typeof args.technology === "string" ? args.technology.trim().toLowerCase() : "";
  const limit = Math.min(Math.max(parseInt(args.limit, 10) || 5, 1), 10);

  if (category) {
    const filtered = projects.filter(
      (p) =>
        (p.id && p.id.toLowerCase().includes(category)) ||
        (p.title && p.title.toLowerCase().includes(category)) ||
        (p.description && p.description.toLowerCase().includes(category))
    );
    if (filtered.length > 0) projects = filtered;
  }

  if (technology) {
    const techFiltered = projects.filter((p) =>
      p.tags && p.tags.some((t) => t.toLowerCase().includes(technology))
    );
    if (techFiltered.length > 0) projects = techFiltered;
  }

  const items = projects.slice(0, limit);

  return {
    success: true,
    total: projects.length,
    count: items.length,
    projects: items.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      tags: p.tags,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      featured: p.featured,
    })),
  };
}

/**
 * Tool 4: getProjectById
 * Returns detailed parameters for a single verified project
 */
async function getProjectById(args = {}) {
  const projectId = typeof args.projectId === "string" ? args.projectId.trim().toLowerCase() : "";

  if (!projectId) {
    return {
      success: false,
      error: "Missing required 'projectId' argument.",
    };
  }

  const project = PORTFOLIO_KNOWLEDGE.projects.find(
    (p) =>
      (p.id && p.id.toLowerCase() === projectId) ||
      (p.title && p.title.toLowerCase().includes(projectId))
  );

  if (!project) {
    return {
      success: false,
      error: `Project with ID '${projectId}' was not found in verified portfolio.`,
    };
  }

  return {
    success: true,
    project: {
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.tags,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
    },
  };
}

/**
 * Tool 5: getContactInfo
 * Returns public social and email contact information
 */
async function getContactInfo() {
  const contact = PORTFOLIO_KNOWLEDGE.contact;
  return {
    success: true,
    contact: {
      email: contact.email,
      location: contact.location,
      status: contact.status,
      links: contact.links,
    },
  };
}

module.exports = {
  getPortfolioProfile,
  getServices,
  getProjects,
  getProjectById,
  getContactInfo,
};
