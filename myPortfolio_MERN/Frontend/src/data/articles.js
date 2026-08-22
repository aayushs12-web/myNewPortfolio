import React from "react";
import TechnicalSeoReactViteContent from "./articles/TechnicalSeoReactVite.jsx";

/**
 * Technical Articles Data Registry
 * 
 * Lightweight repository of technical articles and web engineering guides.
 * Each published article defines metadata, canonical slug, publication date,
 * and structured content blocks.
 */

export const ARTICLES = [
  {
    slug: "technical-seo-react-vite",
    title: "Technical SEO for React + Vite Single-Page Applications",
    description:
      "A comprehensive guide to technical SEO, dynamic canonical tags, Open Graph metadata, Schema.org JSON-LD graphs, and Vercel edge routing in React 19 and Vite SPAs.",
    category: "Technical SEO",
    readTime: "7 min read",
    datePublished: "2026-08-22",
    dateModified: "2026-08-22",
    author: "Aayush Sharma",
    tags: ["React 19", "Vite", "Technical SEO", "Canonical Tags", "JSON-LD", "Vercel"],
    summary:
      "Single-Page Applications require specific technical patterns to ensure optimal search crawling, social card previews, and entity recognition. This guide covers dynamic DOM metadata, canonical synchronization, Schema.org graphs, and Vercel edge routing.",
    component: TechnicalSeoReactViteContent,
  },
];

export function getAllArticles() {
  return ARTICLES.filter((article) => article.published !== false);
}

export function getArticleBySlug(slug) {
  if (!slug) return null;
  const normalizedSlug = slug.trim().toLowerCase();
  return ARTICLES.find((article) => article.slug.toLowerCase() === normalizedSlug) || null;
}
