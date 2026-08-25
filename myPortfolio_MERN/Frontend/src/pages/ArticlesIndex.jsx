import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  X,
  Layers,
  Filter,
  CheckCircle2,
  Cpu,
  Server,
  Cloud,
  Code2,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  getAllArticles,
  getFeaturedArticles,
  ARTICLE_CATEGORIES,
  searchArticles,
  getAllTags,
} from "../data/articles";

export default function ArticlesIndex() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter states from URL search params if present
  const initialCategory = searchParams.get("category") || "All";
  const initialTag = searchParams.get("tag") || "";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const searchInputRef = useRef(null);

  // Sync state with URL params
  useEffect(() => {
    const params = {};
    if (selectedCategory && selectedCategory !== "All") params.category = selectedCategory;
    if (selectedTag) params.tag = selectedTag;
    if (searchQuery.trim()) params.q = searchQuery.trim();

    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedTag, searchQuery, setSearchParams]);

  // Keyboard shortcut (Ctrl+K or /) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement !== searchInputRef.current)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allArticles = useMemo(() => getAllArticles(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: allArticles.length };
    ARTICLE_CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        const norm = cat.toLowerCase();
        counts[cat] = allArticles.filter((a) => {
          const artCat = (a.category || "").toLowerCase();
          if (norm === "seo" && (artCat === "seo" || artCat === "technical seo")) return true;
          return artCat === norm;
        }).length;
      }
    });
    return counts;
  }, [allArticles]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return searchArticles({
      query: searchQuery,
      category: selectedCategory,
      tag: selectedTag,
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Determine if featured article is in the active filter set
  const featuredArticle = useMemo(() => {
    if (selectedCategory !== "All" && selectedCategory !== "SEO") {
      return null;
    }
    return filteredArticles.find((a) => a.featured) || null;
  }, [filteredArticles, selectedCategory]);

  // Non-featured articles or list view
  const regularArticles = useMemo(() => {
    if (featuredArticle && selectedCategory === "All" && !searchQuery && !selectedTag) {
      return filteredArticles.filter((a) => a.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle, selectedCategory, searchQuery, selectedTag]);

  const hasActiveFilters = selectedCategory !== "All" || Boolean(selectedTag) || Boolean(searchQuery.trim());

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedTag("");
    setSearchQuery("");
  };

  const handleTagClick = (tag) => {
    if (selectedTag.toLowerCase() === tag.toLowerCase()) {
      setSelectedTag("");
    } else {
      setSelectedTag(tag);
    }
  };

  // Planned engineering topics roadmap (architectural blueprint preview)
  const roadmapTopics = [
    {
      title: "Production Node.js REST API Architecture",
      category: "Node.js",
      desc: "Clean layered controllers, repository patterns, JWT auth, MongoDB schemas, and automated middleware validation.",
      icon: Server,
      tags: ["Node.js", "Express", "MongoDB", "REST API", "Architecture"],
    },
    {
      title: "React Performance Optimization & Memoization",
      category: "React",
      desc: "Eliminating unnecessary re-renders, profiling React 19 render cycles, dynamic imports, and memory footprint management.",
      icon: Code2,
      tags: ["React 19", "Performance", "Web Vitals", "Optimization"],
    },
    {
      title: "Vercel Edge Rewrites & Deployment Pipelines",
      category: "DevOps",
      desc: "Permanent HTTP 308 redirects, SPA fallback rules, edge headers, and automated GitHub CI/CD deployments.",
      icon: Cloud,
      tags: ["Vercel", "DevOps", "CI/CD", "Edge Config"],
    },
    {
      title: "MongoDB Indexing Strategies & Aggregations",
      category: "MongoDB",
      desc: "Compound index design, explain plan analysis, aggregation pipelines, and high-concurrency read/write scaling.",
      icon: Layers,
      tags: ["MongoDB", "Mongoose", "Database", "Performance"],
    },
  ];

  return (
    <main className="w-full min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Navigation Breadcrumb */}
        <div className="w-full mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#BE93FD] hover:text-[#FF6F91] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME</span>
          </Link>
          <span className="text-[11px] font-mono-tech text-gray-400">
            ENGINEERING KNOWLEDGE HUB
          </span>
        </div>

        {/* Hero Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-3 shadow-[0_0_20px_rgba(190,147,253,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>ENGINEERING KNOWLEDGE HUB</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase"
          >
            TECHNICAL <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">ARTICLES</span>
          </motion.h1>

          <div className="h-0.5 w-28 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] mt-3 mb-4 shadow-[0_0_15px_#D65DB1]" />

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl text-center">
            In-depth web engineering guides, architectural best practices, and production walkthroughs covering React 19, Node.js, Express, MongoDB, Technical SEO, and cloud deployments.
          </p>

          {/* Quick Metrics Badge Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 text-[11px] font-mono-tech text-gray-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Production Tested</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-[#BE93FD]" />
              <span>Zero-Fluff Code</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>Full-Stack Standards</span>
            </span>
          </div>
        </header>

        {/* Central Search & Category Filter Control Hub */}
        <section aria-label="Article Filters" className="w-full mb-10 space-y-5">
          {/* Search Bar */}
          <div className="w-full relative">
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-gray-400">
                <Search className="w-4 h-4 text-[#BE93FD]" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, keyword or tech stack... (Press / to focus)"
                aria-label="Search technical articles"
                className="w-full pl-11 pr-24 py-3.5 rounded-2xl glass-card border border-white/10 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#BE93FD] focus:ring-2 focus:ring-[#BE93FD]/20 transition-all shadow-lg"
              />
              <div className="absolute right-3 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono-tech text-gray-400 bg-white/5 rounded border border-white/10">
                  Ctrl K
                </kbd>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="w-full flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-mono-tech text-gray-400 px-1">
              <span className="flex items-center gap-1.5 uppercase font-bold text-gray-300">
                <Filter className="w-3.5 h-3.5 text-[#BE93FD]" />
                <span>Categories</span>
              </span>
              <span>{filteredArticles.length} {filteredArticles.length === 1 ? "Guide" : "Guides"} Available</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {ARTICLE_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                const count = categoryCounts[category] || 0;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-gradient-to-r from-[#BE93FD]/25 via-[#D65DB1]/25 to-[#FF6F91]/25 text-white border-[#BE93FD] shadow-[0_0_15px_rgba(190,147,253,0.3)]"
                        : "bg-white/[0.03] text-gray-300 border-white/10 hover:border-[#BE93FD]/50 hover:text-white"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-[#BE93FD] text-[#0D0814] font-bold"
                          : count > 0
                          ? "bg-white/10 text-gray-300"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Tags & Reset Bar */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono-tech"
            >
              <div className="flex flex-wrap items-center gap-2 text-gray-300">
                <span className="text-[#BE93FD] font-bold uppercase">Active Filters:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#BE93FD]/15 border border-[#BE93FD]/30 text-[#BE93FD]">
                    <span>Category: {selectedCategory}</span>
                    <button onClick={() => setSelectedCategory("All")} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FF6F91]/15 border border-[#FF6F91]/30 text-[#FF6F91]">
                    <span>Tag: {selectedTag}</span>
                    <button onClick={() => setSelectedTag("")} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/20 text-white">
                    <span>Query: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery("")} className="hover:text-gray-300">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                onClick={handleResetFilters}
                className="text-xs font-mono-tech text-[#FF6F91] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Clear All Filters</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </section>

        {/* Featured Article Hero Card (Visible on All or matching filters) */}
        {featuredArticle && (
          <section aria-label="Featured Blueprint" className="w-full mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#FF6F91]" />
              <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
                FEATURED ARCHITECTURE BLUEPRINT
              </h2>
            </div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-3xl glass-card border border-[#BE93FD]/40 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-[#FF6F91]/70 transition-all duration-300"
            >
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#BE93FD]/15 via-[#FF6F91]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between">
                {/* Meta Top Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#BE93FD]/20 border border-[#BE93FD]/40 text-[#BE93FD] font-bold uppercase">
                      {featuredArticle.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6F91]/20 border border-[#FF6F91]/40 text-[#FF6F91] text-[10px] font-bold uppercase tracking-wider">
                      FEATURED
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF6F91]" />
                      {featuredArticle.readingTime || featuredArticle.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {featuredArticle.publishedDate || featuredArticle.datePublished}
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white mb-4 group-hover:text-[#BE93FD] transition-colors leading-tight">
                  <Link to={`/articles/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-4xl">
                  {featuredArticle.description}
                </p>

                {/* Related Technologies / Tags */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono-tech text-gray-400 mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#BE93FD]" />
                    <span>RELATED TECHNOLOGIES:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(featuredArticle.tags || []).map((tag, idx) => {
                      const isTagActive = selectedTag.toLowerCase() === tag.toLowerCase();
                      return (
                        <button
                          key={idx}
                          onClick={() => handleTagClick(tag)}
                          className={`text-xs font-mono-tech px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isTagActive
                              ? "bg-[#FF6F91]/20 border-[#FF6F91] text-[#FF6F91] font-bold"
                              : "bg-white/5 border-white/10 text-gray-300 hover:border-[#BE93FD] hover:text-white"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer CTA Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-gray-300">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#BE93FD] to-[#FF6F91] text-[#0D0814] flex items-center justify-center font-bold">
                      AS
                    </div>
                    <span>By {featuredArticle.author || "Aayush Sharma"}</span>
                  </div>

                  <Link
                    to={`/articles/${featuredArticle.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Read Complete Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          </section>
        )}

        {/* Regular Articles Section / Live Results */}
        {filteredArticles.length > 0 ? (
          <section aria-label="Published Articles" className="w-full mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#BE93FD]" />
                <span>
                  {selectedCategory === "All" ? "ALL PUBLISHED ARTICLES" : `${selectedCategory.toUpperCase()} ARTICLES`}
                </span>
              </h2>
              <span className="text-xs font-mono-tech text-gray-400">
                {filteredArticles.length} {filteredArticles.length === 1 ? "Result" : "Results"}
              </span>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl border border-[#BE93FD]/30 overflow-hidden flex flex-col justify-between hover:border-[#FF6F91] transition-all duration-300 group shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-gray-400 mb-3">
                      <span className="text-[#BE93FD] uppercase font-bold">{article.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF6F91]" />
                        {article.readingTime || article.readTime}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#BE93FD] transition-colors leading-snug">
                      <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                      {article.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(article.tags || []).slice(0, 4).map((tag, i) => {
                        const isTagActive = selectedTag.toLowerCase() === tag.toLowerCase();
                        return (
                          <button
                            key={i}
                            onClick={() => handleTagClick(tag)}
                            className={`text-[10px] font-mono-tech px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                              isTagActive
                                ? "bg-[#FF6F91]/20 border-[#FF6F91] text-[#FF6F91] font-bold"
                                : "bg-white/5 border-white/10 text-gray-300 hover:border-[#BE93FD]"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/20">
                    <span className="text-[11px] font-mono-tech text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.publishedDate || article.datePublished}
                    </span>
                    <Link
                      to={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-display font-bold text-[#BE93FD] group-hover:text-[#FF6F91] transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        ) : (
          /* Empty / In-Preparation Status Card for Zero Search Results or Empty Category */
          <section aria-label="No Articles State" className="w-full max-w-3xl my-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full rounded-3xl glass-card border border-[#BE93FD]/30 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center border border-[#BE93FD]/30 mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-[#FF6F91]" />
              </div>

              <h2 className="font-display font-bold text-2xl text-white mb-2">
                {selectedCategory !== "All"
                  ? `${selectedCategory} Guides Currently in Preparation`
                  : "No Articles Match Your Filter"}
              </h2>

              <p className="text-gray-300 text-xs sm:text-sm max-w-lg leading-relaxed mb-6">
                {selectedCategory !== "All"
                  ? `Comprehensive, production-tested blueprints for ${selectedCategory} are actively being authored with real-world code walkthroughs. Reset your filter to explore all available articles or review full-stack services.`
                  : "No technical guides found matching your active search query or selected tag. Clear your filters to browse all engineering articles."}
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  View All Articles
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="px-6 py-2.5 rounded-xl glass-card border border-white/10 text-white font-display font-bold text-xs uppercase tracking-wider hover:border-[#BE93FD] transition-colors cursor-pointer"
                >
                  Explore Services
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {/* Upcoming Engineering Blueprints Roadmap */}
        <section aria-label="Upcoming Roadmap" className="w-full mt-8 pt-10 border-t border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#BE93FD] text-[11px] font-mono-tech font-bold uppercase mb-2">
              <Cpu className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>EDITORIAL ROADMAP</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Upcoming Architectural Blueprints
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              In-depth engineering deep-dives currently being written and verified against production benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadmapTopics.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#BE93FD]/50 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center group-hover:bg-[#BE93FD] group-hover:text-[#0D0814] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#BE93FD]">
                        {topic.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-white mb-1.5 leading-snug group-hover:text-[#BE93FD] transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {topic.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                    {topic.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-white/5 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
