import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { getArticleBySlug } from "../data/articles";
import { updateArticleMetadata, updatePageMetadata } from "../components/SEO";

export default function ArticleView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      updateArticleMetadata(article);
    } else {
      updatePageMetadata("/articles");
    }
  }, [article, slug]);

  if (!article) {
    return (
      <main className="w-full min-h-screen pt-32 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-md w-full rounded-3xl glass-card border border-white/10 p-8 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6F91]/15 text-[#FF6F91] flex items-center justify-center border border-[#FF6F91]/30 mb-4">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white mb-2">Article Not Found</h1>
          <p className="text-gray-300 text-xs sm:text-sm mb-6 leading-relaxed">
            The requested technical article does not exist or has not been published yet.
          </p>
          <Link
            to="/articles"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
          >
            Browse All Articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="w-full min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#BE93FD] hover:text-[#FF6F91] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ARTICLES</span>
          </Link>
          <span className="text-[11px] font-mono-tech text-gray-400 uppercase">
            {article.category || "Technical Guide"}
          </span>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6F91]" />
            <span>{article.category || "ENGINEERING GUIDE"}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono-tech text-gray-400">
            <div className="flex items-center gap-1.5 text-gray-200">
              <User className="w-4 h-4 text-[#BE93FD]" />
              <span>{article.author || "Aayush Sharma"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Published: {article.datePublished}</span>
            </div>
            {article.dateModified && article.dateModified !== article.datePublished && (
              <div className="flex items-center gap-1.5">
                <span>(Updated: {article.dateModified})</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FF6F91]" />
              <span>{article.readTime || "5 min read"}</span>
            </div>
          </div>
        </header>

        {/* Key Takeaways / Summary Box */}
        {article.summary && (
          <div className="mb-10 p-6 rounded-2xl glass-card border border-[#BE93FD]/40 bg-[#BE93FD]/5">
            <h2 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6F91]" />
              <span>Summary & Key Takeaways</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {article.summary}
            </p>
          </div>
        )}

        {/* Dynamic Article Content Body */}
        <div className="prose prose-invert max-w-none text-gray-200 text-sm sm:text-base leading-relaxed space-y-6">
          {article.component ? (
            <article.component />
          ) : article.content ? (
            article.content
          ) : (
            <p className="text-gray-400 italic">Article content is loading...</p>
          )}
        </div>

        {/* Author Sign-Off & Context Bio */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#BE93FD]/30 to-[#FF6F91]/30 text-[#BE93FD] flex items-center justify-center shrink-0 border border-[#BE93FD]/50 shadow-lg">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-base sm:text-lg text-white mb-1">
              About the Author: Aayush Sharma
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              Full-Stack MERN Developer based in Pali, Rajasthan, specializing in React 19 frontends, Node.js and Express REST APIs, MongoDB data modeling, and cloud deployments for local and remote projects.
            </p>
            <div className="flex gap-4 text-xs font-mono-tech">
              <Link to="/about" className="text-[#BE93FD] hover:text-[#FF6F91] transition-colors">
                View Developer Profile →
              </Link>
              <Link to="/contact" className="text-[#BE93FD] hover:text-[#FF6F91] transition-colors">
                Get In Touch →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Services CTA */}
        <div className="mt-8 p-6 rounded-2xl glass-card border border-[#BE93FD]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white">
              Need assistance with your web application or deployment?
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Explore available full-stack MERN development, technical SEO, and cloud services.
            </p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform shrink-0 cursor-pointer"
          >
            Explore Services
          </button>
        </div>
      </div>
    </article>
  );
}
