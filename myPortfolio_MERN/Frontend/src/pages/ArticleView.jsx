import React, { useEffect, useMemo, lazy, Suspense } from "react";
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
  Tag,
  Layers,
  Code2,
} from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "../data/articles";
import { updateArticleMetadata, updatePageMetadata } from "../components/SEO";

function ArticleLoadingFallback() {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-3">
      <div className="w-9 h-9 rounded-full border-2 border-[#BE93FD]/30 border-t-[#FF6F91] animate-spin shadow-[0_0_20px_rgba(214,93,177,0.4)]" />
      <span className="font-mono-tech text-xs text-[#BE93FD] font-semibold tracking-wider uppercase">
        Loading Article Content...
      </span>
    </div>
  );
}

export default function ArticleView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  const relatedArticles = useMemo(() => {
    return slug ? getRelatedArticles(slug, 2) : [];
  }, [slug]);

  useEffect(() => {
    if (article) {
      updateArticleMetadata(article);
    } else {
      updatePageMetadata("/articles");
    }
  }, [article, slug]);

  const LazyContent = useMemo(() => {
    if (!article) return null;
    const loader = article.loadContent || article.content || article.component;
    if (typeof loader === "function") {
      return lazy(loader);
    }
    return null;
  }, [article]);

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

  const publishedDate = article.publishedDate || article.datePublished;
  const modifiedDate = article.modifiedDate || article.dateModified;
  const readingTime = article.readingTime || article.readTime;

  return (
    <article className="w-full min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#BE93FD] hover:text-[#FF6F91] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ARTICLES HUB</span>
          </Link>
          <Link
            to={`/articles?category=${encodeURIComponent(article.category || "All")}`}
            className="text-[11px] font-mono-tech text-gray-400 uppercase hover:text-[#BE93FD] transition-colors"
          >
            {article.category || "Technical Guide"}
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Link
              to={`/articles?category=${encodeURIComponent(article.category || "All")}`}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase hover:border-[#FF6F91] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>{article.category || "ENGINEERING GUIDE"}</span>
            </Link>
            {article.featured && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6F91]/20 border border-[#FF6F91]/40 text-[#FF6F91] text-[10px] font-mono-tech font-bold uppercase tracking-wider">
                FEATURED
              </span>
            )}
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
              <span>Published: {publishedDate}</span>
            </div>
            {modifiedDate && modifiedDate !== publishedDate && (
              <div className="flex items-center gap-1.5">
                <span>(Updated: {modifiedDate})</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FF6F91]" />
              <span>{readingTime || "5 min read"}</span>
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

        {/* Dynamic Article Content Body with Lazy-Loading Suspense */}
        <div className="prose prose-invert max-w-none text-gray-200 text-sm sm:text-base leading-relaxed space-y-6">
          {LazyContent ? (
            <Suspense fallback={<ArticleLoadingFallback />}>
              <LazyContent />
            </Suspense>
          ) : (
            <p className="text-gray-400 italic">Article content is unavailable.</p>
          )}
        </div>

        {/* Related Technologies / Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <section aria-label="Related Technologies" className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#BE93FD]" />
              <span>RELATED TECHNOLOGIES & TOPICS:</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="text-xs font-mono-tech px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-[#BE93FD] hover:text-white hover:bg-[#BE93FD]/10 transition-all"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section aria-label="Related Articles" className="mt-10 pt-8 border-t border-white/10">
            <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>RELATED ARCHITECTURAL GUIDES:</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/articles/${rel.slug}`}
                  className="p-4 rounded-2xl glass-card border border-white/10 hover:border-[#BE93FD] transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono-tech text-[#BE93FD] uppercase font-bold">
                      {rel.category}
                    </span>
                    <h3 className="font-display font-bold text-sm text-white mt-1 group-hover:text-[#BE93FD] transition-colors leading-snug">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono-tech text-gray-400">
                    <span>{rel.readingTime || rel.readTime}</span>
                    <span className="text-[#FF6F91] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
