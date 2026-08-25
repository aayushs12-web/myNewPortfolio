/**
 * Standard Categories for Engineering Knowledge Hub
 */
export const ARTICLE_CATEGORIES = [
  "All",
  "React",
  "Node.js",
  "MongoDB",
  "MERN",
  "SEO",
  "Performance",
  "DevOps",
  "Vercel",
];

/**
 * Centralized Article Registry
 * 
 * Supports full metadata schema:
 * - slug: unique URL path identifier
 * - title: article headline
 * - description: meta summary and card preview text
 * - category: primary technical domain
 * - tags: related technologies / topics
 * - author: creator of the guide
 * - publishedDate: initial release ISO date
 * - modifiedDate: last updated ISO date
 * - readingTime: estimated read duration
 * - featured: boolean highlight flag
 * - loadContent: dynamic import loader for route-level code splitting
 * - content: dynamic import loader alias
 * - component: dynamic import loader alias
 * - canonical: full canonical URL
 * - image: social share / Open Graph image
 * - summary: key takeaways / executive overview
 * - published: publication status flag
 */
export const ARTICLES = [
  {
    slug: "technical-seo-react-vite",
    title: "Technical SEO for React + Vite Single-Page Applications",
    description:
      "A comprehensive guide to technical SEO, dynamic canonical tags, Open Graph metadata, Schema.org JSON-LD graphs, and Vercel edge routing in React 19 and Vite SPAs.",
    category: "SEO",
    tags: ["React 19", "Vite", "SEO", "Canonical Tags", "JSON-LD", "Vercel", "Performance"],
    author: "Aayush Sharma",
    publishedDate: "2026-08-22",
    modifiedDate: "2026-08-22",
    readingTime: "7 min read",
    featured: true,
    canonical: "https://aayushlabs.vercel.app/articles/technical-seo-react-vite",
    image: "https://aayushlabs.vercel.app/og-image.png",
    summary:
      "Single-Page Applications require specific technical patterns to ensure optimal search crawling, social card previews, and entity recognition. This guide covers dynamic DOM metadata, canonical synchronization, Schema.org graphs, and Vercel edge routing.",
    loadContent: () => import("./articles/TechnicalSeoReactVite.jsx"),
    content: () => import("./articles/TechnicalSeoReactVite.jsx"),
    component: () => import("./articles/TechnicalSeoReactVite.jsx"),
    published: true,

    // Backward compatibility aliases
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
    readTime: "7 min read",
  },
  {
    slug: "production-nodejs-rest-api-architecture",
    title:
      "Production-Grade Node.js & Express REST API Architecture: Modular Controller, Service, and Repository Layers",
    description:
      "A production-oriented architectural guide to building maintainable Node.js & Express REST APIs with clean controller, service, and repository layers, Mongoose validation, centralized error handling, and JWT security.",
    category: "Node.js",
    tags: ["Node.js", "Express", "REST API", "Architecture", "MongoDB", "Mongoose", "JWT", "Security"],
    author: "Aayush Sharma",
    publishedDate: "2026-08-26",
    modifiedDate: "2026-08-26",
    readingTime: "9 min read",
    featured: false,
    canonical: "https://aayushlabs.vercel.app/articles/production-nodejs-rest-api-architecture",
    image: "https://aayushlabs.vercel.app/og-image.png",
    summary:
      "Layering Express backends into Controllers, Services, and Repositories eliminates fat controllers, guarantees unit testability, and standardizes centralized error handling, Mongoose data integrity, and JWT authentication.",
    loadContent: () => import("./articles/ProductionNodejsRestApiArchitecture.jsx"),
    content: () => import("./articles/ProductionNodejsRestApiArchitecture.jsx"),
    component: () => import("./articles/ProductionNodejsRestApiArchitecture.jsx"),
    published: true,

    // Backward compatibility aliases
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
    readTime: "9 min read",
  },
];

/**
 * Retrieve all published articles
 */
export function getAllArticles() {
  return ARTICLES.filter((article) => article.published !== false);
}

/**
 * Retrieve featured articles
 */
export function getFeaturedArticles() {
  return getAllArticles().filter((article) => Boolean(article.featured));
}

/**
 * Retrieve latest published articles (sorted by date descending)
 */
export function getLatestArticles(limit = null) {
  const sorted = [...getAllArticles()].sort((a, b) => {
    const dateA = new Date(a.publishedDate || a.datePublished || 0);
    const dateB = new Date(b.publishedDate || b.datePublished || 0);
    return dateB - dateA;
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Find an article by its unique URL slug
 */
export function getArticleBySlug(slug) {
  if (!slug) return null;
  const normalizedSlug = slug.trim().toLowerCase();
  return (
    ARTICLES.find(
      (article) =>
        article.slug.toLowerCase() === normalizedSlug &&
        article.published !== false
    ) || null
  );
}

/**
 * Get related articles based on category and shared technology tags
 */
export function getRelatedArticles(currentSlug, limit = 3) {
  if (!currentSlug) return [];
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  const allOtherArticles = getAllArticles().filter(
    (a) => a.slug.toLowerCase() !== currentSlug.toLowerCase()
  );

  if (allOtherArticles.length === 0) return [];

  // Score articles by matching category and shared tags
  const scored = allOtherArticles.map((article) => {
    let score = 0;
    if (article.category && current.category && article.category.toLowerCase() === current.category.toLowerCase()) {
      score += 3;
    }
    const currentTags = (current.tags || []).map((t) => t.toLowerCase());
    const articleTags = (article.tags || []).map((t) => t.toLowerCase());
    const sharedTags = articleTags.filter((t) => currentTags.includes(t));
    score += sharedTags.length;

    return { article, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.article);
}

/**
 * Filter articles by category
 */
export function getArticlesByCategory(category) {
  if (!category || category === "All") return getAllArticles();
  const normalizedCategory = category.trim().toLowerCase();

  return getAllArticles().filter((article) => {
    const artCat = (article.category || "").toLowerCase();
    if (normalizedCategory === "seo" && (artCat === "seo" || artCat === "technical seo")) {
      return true;
    }
    return artCat === normalizedCategory;
  });
}

/**
 * Comprehensive multi-factor search across articles
 */
export function searchArticles({ query = "", category = "All", tag = "" } = {}) {
  let results = getAllArticles();

  // 1. Category Filter
  if (category && category !== "All") {
    const normCategory = category.trim().toLowerCase();
    results = results.filter((article) => {
      const artCat = (article.category || "").toLowerCase();
      if (normCategory === "seo" && (artCat === "seo" || artCat === "technical seo")) {
        return true;
      }
      return artCat === normCategory;
    });
  }

  // 2. Tag Filter
  if (tag) {
    const normTag = tag.trim().toLowerCase();
    results = results.filter((article) =>
      (article.tags || []).some((t) => t.toLowerCase().includes(normTag) || normTag.includes(t.toLowerCase()))
    );
  }

  // 3. Text Query Search (title, description, tags, summary, category)
  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    results = results.filter((article) => {
      const titleMatch = (article.title || "").toLowerCase().includes(q);
      const descMatch = (article.description || "").toLowerCase().includes(q);
      const summaryMatch = (article.summary || "").toLowerCase().includes(q);
      const catMatch = (article.category || "").toLowerCase().includes(q);
      const tagMatch = (article.tags || []).some((t) => t.toLowerCase().includes(q));

      return titleMatch || descMatch || summaryMatch || catMatch || tagMatch;
    });
  }

  return results;
}

/**
 * Retrieve unique list of all tags across published articles
 */
export function getAllTags() {
  const tagSet = new Set();
  getAllArticles().forEach((article) => {
    (article.tags || []).forEach((t) => tagSet.add(t));
  });
  return Array.from(tagSet);
}
