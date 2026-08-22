import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Info, Terminal, Code2, Globe, ShieldCheck } from "lucide-react";

export default function TechnicalSeoReactViteContent() {
  return (
    <div className="space-y-10 text-gray-200">
      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-gray-100">
          Building web applications with <strong>React 19</strong> and <strong>Vite</strong> provides an exceptional developer experience and lightning-fast client-side navigation. However, Single-Page Applications (SPAs) present unique technical challenges for search engine crawlers and social media preview scrapers.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Unlike traditional multi-page websites where every URL returns pre-rendered HTML markup from a server, a React SPA initially serves a minimal <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">&lt;div id="root"&gt;&lt;/div&gt;</code> shell and relies on client-side JavaScript to construct the DOM, fetch data, and update document metadata. In this guide, we walk through the exact architectural patterns implemented on <Link to="/" className="text-[#BE93FD] underline hover:text-[#FF6F91]">my portfolio</Link> to achieve reliable canonical indexing, structured data recognition, and edge routing for a React Vite application.
        </p>
      </section>

      {/* The SEO Challenges of React SPAs */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">01.</span> The SEO Challenges of React SPAs
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Googlebot uses a two-wave indexing pipeline. In the first wave, it crawls and indexes the raw static HTML. If the page requires JavaScript execution, the URL enters a queue for the Web Rendering Service (WRS), which renders the DOM when computing resources become available.
        </p>
        <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2.5">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-[#BE93FD]" />
            <span>Key SPA Indexing Hurdles:</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-300 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-[#FF6F91] font-bold">•</span>
              <span><strong>Static HTML vs. Dynamic DOM:</strong> If your initial <code className="text-[#BE93FD]">index.html</code> has generic or empty metadata, search engines during the first crawl wave see no unique title, description, or canonical tag.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF6F91] font-bold">•</span>
              <span><strong>Social Scraper Limitations:</strong> Bots from WhatsApp, Twitter/X, and LinkedIn do not execute JavaScript. They only read the raw static <code className="text-[#BE93FD]">&lt;meta property="og:*"&gt;</code> tags in the initial HTML payload.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF6F91] font-bold">•</span>
              <span><strong>Client-Side Routing & History Rewriting:</strong> React Router updates the browser URL via the History API (<code className="text-[#BE93FD]">pushState</code>/<code className="text-[#BE93FD]">replaceState</code>), requiring custom logic to keep document metadata synchronized.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Canonical URLs and React Router */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">02.</span> Canonical URLs and React Router
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          A common pitfall in React applications is duplicate URL indexing. For example, having the homepage accessible at both <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">/</code> and <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">/home</code> splits link authority and creates duplicate content signals.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          To resolve this, designate a single canonical URL for each unique page view and implement permanent 301/308 redirects at the edge server level, backed by a client-side <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">&lt;Navigate to="/" replace /&gt;</code> fallback in React Router.
        </p>
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// React Router Canonical Redirection Pattern</div>
          <span className="text-[#BE93FD]">&lt;Routes&gt;</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">&lt;Route</span> <span className="text-[#BE93FD]">path</span>=<span className="text-emerald-400">"/home"</span> <span className="text-[#BE93FD]">element</span>=&#123;<span className="text-[#FF6F91]">&lt;Navigate</span> <span className="text-[#BE93FD]">to</span>=<span className="text-emerald-400">"/"</span> <span className="text-[#BE93FD]">replace</span> <span className="text-[#FF6F91]">/&gt;</span>&#125; <span className="text-[#FF6F91]">/&gt;</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">&lt;Route</span> <span className="text-[#BE93FD]">path</span>=<span className="text-emerald-400">"/"</span> <span className="text-[#BE93FD]">element</span>=&#123;<span className="text-[#BE93FD]">&lt;Home /&gt;</span>&#125; <span className="text-[#FF6F91]">/&gt;</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">&lt;Route</span> <span className="text-[#BE93FD]">path</span>=<span className="text-emerald-400">"/services"</span> <span className="text-[#BE93FD]">element</span>=&#123;<span className="text-[#BE93FD]">&lt;Services /&gt;</span>&#125; <span className="text-[#FF6F91]">/&gt;</span><br />
          <span className="text-[#BE93FD]">&lt;/Routes&gt;</span>
        </div>
      </section>

      {/* Page Titles and Meta Descriptions */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">03.</span> Page Titles and Meta Descriptions
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Rather than installing heavy external header management packages, you can engineer a lightweight, zero-dependency <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">SEO.jsx</code> component that listens to <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">useLocation().pathname</code>.
        </p>
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// Lightweight DOM Metadata Synchronization</div>
          <span className="text-[#FF6F91]">export function</span> <span className="text-[#BE93FD]">updatePageMetadata</span>(pathname) &#123;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> meta = SEO_CONFIGS[pathname] || SEO_CONFIGS[<span className="text-emerald-400">"/"</span>];<br />
          &nbsp;&nbsp;document.title = meta.title;<br />
          &nbsp;&nbsp;setOrCreateMeta(<span className="text-emerald-400">"name"</span>, <span className="text-emerald-400">"description"</span>, meta.description);<br />
          &nbsp;&nbsp;setOrCreateLink(<span className="text-emerald-400">"canonical"</span>, meta.canonical);<br />
          &#125;
        </div>
      </section>

      {/* Open Graph and Social Metadata */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">04.</span> Open Graph and Social Metadata
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          When a user shares a URL on WhatsApp, iMessage, Twitter/X, or LinkedIn, the crawler requests the URL and immediately extracts tags like <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">og:title</code>, <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">og:image</code>, and <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">twitter:card</code> from the raw HTML payload.
        </p>
        <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
          <h3 className="font-display font-bold text-sm text-white">Social Metadata Best Practices:</h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 pl-2">
            <li>• <strong>Image Dimensions:</strong> Create dedicated <code className="text-[#BE93FD]">1200 x 630 px</code> PNG or WebP preview images. Do not use tiny 32x32 favicons as social images.</li>
            <li>• <strong>Static HTML Fallback:</strong> Always define default Open Graph tags inside <code className="text-[#BE93FD]">index.html</code> so crawlers that bypass JavaScript still render a pristine rich card.</li>
            <li>• <strong>Card Format:</strong> Use <code className="text-[#BE93FD]">twitter:card = "summary_large_image"</code> for prominent display.</li>
          </ul>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">05.</span> JSON-LD Structured Data
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Structured data using Schema.org vocabulary removes ambiguity for search engines and AI answer engines. By nesting <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">Person</code>, <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">WebSite</code>, <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">BreadcrumbList</code>, and <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">TechArticle</code> nodes into an interconnected graph, you establish direct entity authority.
        </p>
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// Interconnected JSON-LD Graph Structure</div>
          &#123;<br />
          &nbsp;&nbsp;<span className="text-emerald-400">"@context"</span>: <span className="text-emerald-400">"https://schema.org"</span>,<br />
          &nbsp;&nbsp;<span className="text-emerald-400">"@graph"</span>: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"@type"</span>: <span className="text-emerald-400">"Person"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"@id"</span>: <span className="text-emerald-400">"https://aayushlabs.vercel.app/#person"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"name"</span>: <span className="text-emerald-400">"Aayush Sharma"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"jobTitle"</span>: <span className="text-emerald-400">"Full-Stack MERN Developer"</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"sameAs"</span>: [<span className="text-emerald-400">"https://github.com/aayushs12-web"</span>, <span className="text-emerald-400">"https://www.linkedin.com/in/..."</span>]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
          &nbsp;&nbsp;]<br />
          &#125;
        </div>
      </section>

      {/* robots.txt and sitemap.xml */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">06.</span> robots.txt and sitemap.xml
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          A pure canonical sitemap ensures search engines only spend crawl budget on indexable URLs. Never include redirecting URLs, staging subdomains, or query parameters in <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">sitemap.xml</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <span className="text-xs font-mono-tech text-[#BE93FD] uppercase font-bold block mb-2">robots.txt Standard</span>
            <pre className="font-mono-tech text-xs text-gray-300 leading-relaxed">
User-agent: *{"\n"}
Allow: /{"\n"}
{"\n"}
Sitemap: https://aayushlabs.vercel.app/sitemap.xml
            </pre>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <span className="text-xs font-mono-tech text-[#BE93FD] uppercase font-bold block mb-2">sitemap.xml Principle</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              List only HTTP 200 OK canonical routes with accurate <code className="text-[#BE93FD]">&lt;lastmod&gt;</code> timestamps. Avoid inflating change frequencies artificially.
            </p>
          </div>
        </div>
      </section>

      {/* Vercel SPA Routing, Redirects and Rewrites */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">07.</span> Vercel SPA Routing, Redirects and Rewrites
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          When deploying a Vite SPA to Vercel, navigating directly to deep routes like <Link to="/services" className="text-[#BE93FD] underline hover:text-[#FF6F91]">/services</Link> or <Link to="/articles" className="text-[#BE93FD] underline hover:text-[#FF6F91]">/articles</Link> will result in a 404 error unless an edge rewrite rule routes non-file paths to <code className="text-[#BE93FD] bg-black/40 px-1.5 py-0.5 rounded font-mono-tech text-xs">/index.html</code>.
        </p>
        <div className="p-4 rounded-2xl border border-[#FF6F91]/40 bg-[#FF6F91]/5 text-xs sm:text-sm text-gray-200">
          <strong className="text-[#FF6F91] flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Critical Vercel Configuration Order:</span>
          </strong>
          Redirects must be declared <em>before</em> rewrites in <code className="text-[#BE93FD] font-mono-tech">vercel.json</code>. If a rewrite executes first, deprecated URLs will be rewritten to the SPA shell before the server can emit an HTTP 308 permanent redirect status code.
        </div>
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// vercel.json Production Configuration</div>
          &#123;<br />
          &nbsp;&nbsp;<span className="text-emerald-400">"redirects"</span>: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="text-emerald-400">"source"</span>: <span className="text-emerald-400">"/home"</span>, <span className="text-emerald-400">"destination"</span>: <span className="text-emerald-400">"/"</span>, <span className="text-emerald-400">"permanent"</span>: <span className="text-[#BE93FD]">true</span> &#125;<br />
          &nbsp;&nbsp;],<br />
          &nbsp;&nbsp;<span className="text-emerald-400">"rewrites"</span>: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="text-emerald-400">"source"</span>: <span className="text-emerald-400">"/(.*)"</span>, <span className="text-emerald-400">"destination"</span>: <span className="text-emerald-400">"/index.html"</span> &#125;<br />
          &nbsp;&nbsp;]<br />
          &#125;
        </div>
      </section>

      {/* Google Search Console and Indexing */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">08.</span> Google Search Console and Indexing
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          After deploying, use the <strong>URL Inspection Tool</strong> in Google Search Console to verify how Googlebot renders your client-side application:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-300 pl-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>Test Live URL:</strong> Check the rendered screenshot to ensure content and navigation render without unhandled JavaScript exceptions.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>User-declared vs. Google-selected Canonical:</strong> Confirm that Google recognizes your declared canonical URL.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>Structured Data Validation:</strong> Verify that Schema.org types (<code className="text-[#BE93FD]">Person</code>, <code className="text-[#BE93FD]">WebSite</code>, <code className="text-[#BE93FD]">TechArticle</code>) pass with zero errors or missing required fields.</span>
          </li>
        </ul>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">09.</span> Common Mistakes to Avoid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">1. Keyword Stuffing</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Repeating city names or job titles artificially in every heading triggers search quality demotions. Use location details only in legitimate contextual sentences.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">2. Unstable DOM H1 Headings</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Putting rotating role carousels inside the semantic <code className="text-[#BE93FD]">&lt;h1&gt;</code> causes indexing volatility. Keep the H1 stable and animate roles outside it.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">3. Broken Server 404s</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Failing to configure SPA rewrites on Vercel/Nginx causes direct bookmarked URLs and deep links to break on page refresh.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">4. Massive Uncompressed Images</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Unoptimized asset bundles delay First Contentful Paint (FCP) and Largest Contentful Paint (LCP), harming Core Web Vitals scores.
            </p>
          </div>
        </div>
      </section>

      {/* Final Checklist */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">10.</span> Final Checklist
        </h2>
        <div className="p-6 rounded-3xl glass-card border border-[#BE93FD]/30 space-y-3">
          {[
            "Single stable semantic <h1> per page with clear entity identification.",
            "Canonical tag on every route pointing to its single authoritative URL.",
            "Permanent HTTP 308 redirects configured for deprecated routes (/home -> /).",
            "1200x630 Open Graph preview image set in static index.html and dynamic meta.",
            "Interconnected Schema.org JSON-LD graph with valid sameAs entity links.",
            "Pure sitemap.xml containing only 200 OK canonical routes with accurate lastmod dates.",
            "robots.txt pointing to the production sitemap URL.",
            "Vercel SPA rewrite (/(.*) -> /index.html) active for smooth direct refreshes.",
            "Google Search Console verification meta tag present and verified.",
            "Zero JavaScript console errors and clean production build with Vite."
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
