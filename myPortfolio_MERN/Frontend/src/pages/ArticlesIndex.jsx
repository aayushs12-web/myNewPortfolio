import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Code2,
  Server,
  Cloud,
  Search,
  Calendar,
  Clock,
  Layers,
} from "lucide-react";
import { getAllArticles } from "../data/articles";

export default function ArticlesIndex() {
  const articles = getAllArticles();
  const navigate = useNavigate();

  const plannedTopics = [
    {
      title: "React + Vite Deployment on Vercel",
      desc: "Permanent HTTP 308 redirects, SPA routing fallback rules, and edge caching architecture.",
      icon: Cloud,
      tags: ["React 19", "Vite", "Vercel", "DevOps"],
    },
    {
      title: "Node.js & Express REST API Architecture",
      desc: "Clean modular controllers, MongoDB schemas with Mongoose, and secure JWT authentication.",
      icon: Server,
      tags: ["Node.js", "Express", "MongoDB", "REST API"],
    },
    {
      title: "Technical SEO for React Single-Page Apps",
      desc: "Managing dynamic canonical tags, Open Graph metadata, and Schema.org JSON-LD graphs in SPAs.",
      icon: Search,
      tags: ["Technical SEO", "Canonical", "JSON-LD", "Core Web Vitals"],
    },
  ];

  return (
    <main className="w-full min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Back to Home Navigation */}
        <div className="w-full mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#BE93FD] hover:text-[#FF6F91] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>TOPICAL GUIDES & ARCHITECTURE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase"
          >
            TECHNICAL <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">ARTICLES</span>
          </motion.h1>

          <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] mt-3 mb-3 shadow-[0_0_12px_#D65DB1]" />

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl text-center">
            In-depth web engineering guides, architectural best practices, and production walkthroughs covering React 19, Node.js, Express, MongoDB, Technical SEO, and cloud deployments.
          </p>
        </div>

        {/* Articles List / Development State */}
        {articles.length === 0 ? (
          <div className="w-full max-w-4xl flex flex-col items-center gap-10">
            {/* Status Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="w-full rounded-3xl glass-card border border-[#BE93FD]/30 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center border border-[#BE93FD]/30 mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-[#FF6F91]" />
              </div>

              <h2 className="font-display font-bold text-2xl text-white mb-2">
                Articles Currently in Preparation
              </h2>

              <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed mb-6">
                Technical articles with step-by-step code walkthroughs and architectural explanations are being written. Explore the planned topics below or review my full-stack services.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => navigate("/services")}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  Explore Services
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2.5 rounded-xl glass-card border border-white/10 text-white font-display font-bold text-xs uppercase tracking-wider hover:border-[#BE93FD] transition-colors cursor-pointer"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>

            {/* Upcoming Topic Previews */}
            <div className="w-full">
              <h3 className="text-xs font-mono-tech text-gray-400 uppercase tracking-widest text-center mb-6">
                UPCOMING TECHNICAL TOPICS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plannedTopics.map((topic, idx) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={idx}
                      className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#BE93FD]/60 transition-colors group"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center mb-4 group-hover:bg-[#BE93FD] group-hover:text-[#0D0814] transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-bold text-base text-white mb-2 leading-snug">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed mb-4">
                          {topic.desc}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {topic.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Live Articles Grid when articles are published */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="glass-card rounded-3xl border border-[#BE93FD]/30 overflow-hidden flex flex-col justify-between hover:border-[#FF6F91] transition-all duration-300 group shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-gray-400 mb-3">
                    <span className="text-[#BE93FD] uppercase font-bold">{article.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#BE93FD] transition-colors leading-snug">
                    <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                  </h2>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/20">
                  <span className="text-[11px] font-mono-tech text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.datePublished}
                  </span>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-display font-bold text-[#BE93FD] group-hover:text-[#FF6F91] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
