import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Gauge,
  Layers,
  Image as ImageIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Cpu,
  Monitor,
  Smartphone,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function ReactPerformanceOptimizationInpWebVitals() {
  return (
    <div className="space-y-12 text-gray-200">
      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-gray-300">
          Modern single-page applications built with React and Vite frequently suffer from bundle bloat, unoptimized asset delivery, and main-thread execution stalls. While React 19 introduces automatic compilation and refined concurrent rendering primitives, application performance remains fundamentally governed by client-side payload sizes, efficient DOM scheduling, and responsive user interaction handling.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          In this engineering guide, we examine practical performance engineering strategies applied directly to this production portfolio—spanning route-level code splitting, WebP image encoding, reducing main-thread execution for Interaction to Next Paint (INP), and replacing expensive scroll event listeners with hardware-accelerated APIs like <code className="text-[#BE93FD] font-mono-tech text-xs bg-white/5 px-1.5 py-0.5 rounded">IntersectionObserver</code> and <code className="text-[#FF6F91] font-mono-tech text-xs bg-white/5 px-1.5 py-0.5 rounded">requestAnimationFrame</code>.
        </p>
      </section>

      {/* 01. Why React Applications Become Slow */}
      <section id="why-react-slow" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">01.</span>
          Why React Applications Become Slow
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What causes React client slowdowns?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            React applications become slow primarily due to excessive initial JavaScript bundle sizes that delay parsing and execution, uncompressed raster images blocking Largest Contentful Paint (LCP), long JavaScript execution tasks on the browser main thread delaying Interaction to Next Paint (INP), and continuous event listeners triggering layout thrashing during scroll operations.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          A standard React single-page application downloads its entire component tree, utility libraries, and third-party dependencies before the client can mount interactive elements. When third-party packages or large view components are imported statically at the root level, the browser CPU is forced to parse and evaluate megabytes of unused scripts during the initial page bootstrap.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Furthermore, heavy visual effects—such as multiple nested backdrop filters, continuous coordinate calculations on mouse movement, and synchronous state dispatches inside scroll listeners—block the browser compositor and starve the event loop, causing dropped frames on mobile hardware.
        </p>
      </section>

      {/* 02. Measuring Performance Before Optimizing */}
      <section id="measuring-performance" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">02.</span>
          Measuring Performance Before Optimizing
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Performance engineering requires precise measurements rather than guesswork. Before making structural modifications, developers should establish concrete baselines across two distinct domains: <strong>Build-time bundle composition</strong> and <strong>Runtime frame timing</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#BE93FD]" />
              <span>Build-Time Bundle Inspection</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Using tools like <code className="text-[#BE93FD] font-mono-tech text-xs">rollup-plugin-visualizer</code> or Vite bundle analyzer to identify oversized packages, duplicate dependencies, and modules that should be dynamically imported rather than bundled into the entry chunk.
            </p>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#FF6F91]" />
              <span>Runtime Profiler & Long Tasks</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Recording Chrome DevTools Performance profiles to detect tasks exceeding 50 milliseconds on the main thread, layout shifts caused by unsized images, and dropped animation frames during interactions.
            </p>
          </div>
        </div>
      </section>

      {/* 03. Route-Level Code Splitting with React.lazy and Suspense */}
      <section id="route-code-splitting" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">03.</span>
          Route-Level Code Splitting with React.lazy and Suspense
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What is React code splitting and how does React.lazy help?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            React code splitting is a build optimization technique that breaks a monolithic JavaScript bundle into smaller, independent chunks loaded on demand. <code className="text-[#BE93FD] font-mono-tech text-xs">React.lazy()</code> defers downloading a component until it is actually rendered in the DOM, allowing Vite or Webpack to output separate network assets and drastically reducing initial script payloads.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          In a multi-page SPA, users visiting the homepage or services section do not need the code for administrative dashboards, regional landing pages, or in-depth technical guides. By wrapping route components in <code className="text-[#BE93FD] font-mono-tech text-xs">React.lazy()</code> and providing a lightweight <code className="text-[#FF6F91] font-mono-tech text-xs">&lt;Suspense&gt;</code> boundary, each route becomes an isolated network fetch.
        </p>

        {/* Code Example: Route-Level Code Splitting */}
        <div className="p-5 rounded-2xl bg-[#08040C] border border-white/10 space-y-3 font-mono-tech text-xs">
          <div className="flex items-center justify-between text-gray-400 border-b border-white/10 pb-2">
            <span className="text-[#BE93FD] font-bold">App.jsx (Illustrative Example of Route Code Splitting)</span>
            <span>JavaScript (ES Modules)</span>
          </div>
          <pre className="text-gray-300 overflow-x-auto leading-relaxed">
{`import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Statically imported critical shell
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageFallback from "./components/PageFallback";

// Lazily imported routes — loaded only on navigation
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ArticlesIndex = lazy(() => import("./pages/ArticlesIndex"));
const ArticleView = lazy(() => import("./pages/ArticleView"));
const AhmedabadDeveloper = lazy(() => import("./pages/AhmedabadDeveloper"));

export default function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/articles" element={<ArticlesIndex />} />
          <Route path="/articles/:slug" element={<ArticleView />} />
          <Route path="/ahmedabad-web-developer" element={<AhmedabadDeveloper />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}`}
          </pre>
        </div>
      </section>

      {/* 04. Reducing Initial JavaScript Payload */}
      <section id="reducing-js-payload" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">04.</span>
          Reducing Initial JavaScript Payload: The Articles Registry Example
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: How can dynamic imports reduce content registry bloat?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            By replacing static component imports in a centralized data registry with dynamic loader functions like <code className="text-[#BE93FD] font-mono-tech text-xs">loadContent: () =&gt; import("./Article.jsx")</code>, the metadata index can remain lightweight and synchronous for search and filtering while ensuring individual article bodies are only downloaded when the specific route is accessed.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          When we initially published the second article on this portfolio, the central articles chunk grew substantially because both full article JSX trees were bundled into the shared registry file.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          By refactoring the registry to store synchronous metadata alongside dynamic loader functions, the articles registry bundle was reduced from <strong>68.59 KB down to 5.15 KB (a 92.5% decrease)</strong>, allowing the Articles Hub to scale to dozens of publications without degrading the initial load speed of <Link to="/articles" className="text-[#BE93FD] underline hover:text-[#FF6F91]">/articles</Link>.
        </p>

        {/* Code Example: Dynamic Import Registry */}
        <div className="p-5 rounded-2xl bg-[#08040C] border border-white/10 space-y-3 font-mono-tech text-xs">
          <div className="flex items-center justify-between text-gray-400 border-b border-white/10 pb-2">
            <span className="text-[#BE93FD] font-bold">src/data/articles.js (Dynamic Loader Pattern)</span>
            <span>JavaScript (ES Modules)</span>
          </div>
          <pre className="text-gray-300 overflow-x-auto leading-relaxed">
{`// Pure synchronous metadata for search, cards, and SEO
export const ARTICLES = [
  {
    slug: "technical-seo-react-vite",
    title: "Technical SEO for React + Vite Single-Page Applications",
    description: "A comprehensive guide to technical SEO and dynamic canonical tags...",
    category: "SEO",
    tags: ["React 19", "Vite", "SEO"],
    // Dynamic import loader — Vite creates a separate chunk automatically
    loadContent: () => import("./articles/TechnicalSeoReactVite.jsx"),
    published: true,
  },
  {
    slug: "production-nodejs-rest-api-architecture",
    title: "Production-Grade Node.js & Express REST API Architecture...",
    description: "A production-oriented architectural guide to building maintainable APIs...",
    category: "Node.js",
    tags: ["Node.js", "Express", "REST API"],
    loadContent: () => import("./articles/ProductionNodejsRestApiArchitecture.jsx"),
    published: true,
  },
];`}
          </pre>
        </div>
      </section>

      {/* 05. WebP Image Optimization */}
      <section id="webp-image-optimization" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">05.</span>
          WebP Image Optimization
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: Why is WebP superior to legacy PNG/JPEG for web performance?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            WebP provides superior predictive compression algorithms for both lossy and lossless image data, typically generating files 25% to 80% smaller than equivalent PNG and JPEG images at identical visual clarity, directly accelerating byte transfer and browser decode times.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Uncompressed raster assets represent one of the most common causes of slow first impressions. On this portfolio, our image conversion pipeline produced dramatic asset reductions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-1.5">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">HERO AVATAR ASSET</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">592.36 KB PNG</span>
              <span className="text-xs text-gray-400">→</span>
              <span className="text-xl font-extrabold text-[#10B981]">73.27 KB WebP</span>
            </div>
            <p className="text-xs text-gray-300">Measured 87.6% payload reduction on initial hero render.</p>
          </div>
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">ABOUT PORTRAIT ASSET</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">96.29 KB JPEG</span>
              <span className="text-xs text-gray-400">→</span>
              <span className="text-xl font-extrabold text-[#10B981]">26.20 KB WebP</span>
            </div>
            <p className="text-xs text-gray-300">Measured 72.8% payload reduction on developer profile.</p>
          </div>
        </div>
      </section>

      {/* 06. Improving Largest Contentful Paint (LCP) */}
      <section id="improving-lcp" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">06.</span>
          Improving Largest Contentful Paint (LCP)
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What is LCP and why do large images hurt it?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            Largest Contentful Paint (LCP) is a Core Web Vitals metric measuring the time from navigation start to when the largest visual element (often a hero image or large heading block) is rendered on the screen. Large image files hurt LCP because they saturate network bandwidth and delay image resource discovery and pixel decoding.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          To optimize LCP in React applications, developers should implement three core practices:
        </p>

        <ul className="space-y-2 text-sm text-gray-300 pl-4 border-l-2 border-[#BE93FD]/40">
          <li><strong>Preload Critical Above-the-Fold Images:</strong> Avoid lazy-loading the primary hero image. Use <code className="text-[#BE93FD] font-mono-tech text-xs">&lt;link rel="preload" as="image"&gt;</code> in <code className="text-[#BE93FD] font-mono-tech text-xs">index.html</code> for instant download prioritization.</li>
          <li><strong>Explicit Dimensions to Prevent CLS:</strong> Always define <code className="text-[#BE93FD] font-mono-tech text-xs">width</code> and <code className="text-[#BE93FD] font-mono-tech text-xs">height</code> attributes to reserve layout space and prevent Cumulative Layout Shifts.</li>
          <li><strong>Modern Image Formats:</strong> Serve WebP or AVIF with fallback formats to minimize transfer duration over mobile networks.</li>
        </ul>
      </section>

      {/* 07. Reducing Main-Thread Work and Improving INP */}
      <section id="reducing-main-thread-inp" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">07.</span>
          Reducing Main-Thread Work and Improving INP
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What is INP and how does main-thread work affect it?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            Interaction to Next Paint (INP) is a Core Web Vitals metric that evaluates application responsiveness by measuring the latency of user interactions (clicks, taps, key presses) throughout the entire page lifecycle. Long JavaScript tasks blocking the main thread prevent the browser from rendering visual feedback promptly.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          In React 19, state updates that trigger heavy component re-renders can delay button feedback. Developers should defer non-urgent state transitions using <code className="text-[#BE93FD] font-mono-tech text-xs">startTransition()</code> or <code className="text-[#BE93FD] font-mono-tech text-xs">useDeferredValue()</code>, keeping user input interactions immediate while complex computations resolve asynchronously.
        </p>
      </section>

      {/* 08. IntersectionObserver vs Continuous Scroll Measurements */}
      <section id="intersection-observer" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">08.</span>
          IntersectionObserver vs Continuous Scroll Measurements
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: Why use IntersectionObserver instead of scroll event listeners?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            <code className="text-[#BE93FD] font-mono-tech text-xs">IntersectionObserver</code> executes asynchronously off the main thread, informing the application when an element enters the viewport without invoking repetitive <code className="text-[#BE93FD] font-mono-tech text-xs">getBoundingClientRect()</code> calls that trigger forced synchronous reflows (layout thrashing).
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          A common performance flaw in interactive portfolios is listening to <code className="text-[#BE93FD] font-mono-tech text-xs">window.addEventListener("scroll", handler)</code> to trigger section highlights or reveal animations. Even when throttled, polling element geometry during scroll forces the browser to recalculate the entire page layout on every tick.
        </p>

        {/* Code Example: IntersectionObserver */}
        <div className="p-5 rounded-2xl bg-[#08040C] border border-white/10 space-y-3 font-mono-tech text-xs">
          <div className="flex items-center justify-between text-gray-400 border-b border-white/10 pb-2">
            <span className="text-[#BE93FD] font-bold">useIntersectionObserver Hook (Illustrative Pattern)</span>
            <span>JavaScript (ES Modules)</span>
          </div>
          <pre className="text-gray-300 overflow-x-auto leading-relaxed">
{`import { useState, useEffect, useRef } from "react";

export function useInView(options = { threshold: 0.15 }) {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    // Browser-native observer decoupled from scroll event loop
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Unobserve once revealed if animation runs once
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [targetRef, isInView];
}`}
          </pre>
        </div>
      </section>

      {/* 09. requestAnimationFrame for High-Frequency Interactions */}
      <section id="request-animation-frame" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">09.</span>
          requestAnimationFrame for High-Frequency Interactions
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-5 rounded-2xl glass-card border border-[#BE93FD]/30 bg-[#BE93FD]/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#BE93FD]">
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: When should requestAnimationFrame be used?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            <code className="text-[#BE93FD] font-mono-tech text-xs">requestAnimationFrame</code> should be used whenever visual updates (such as custom cursor tracking, canvas renders, or fluid 3D card tilt effects) depend on continuous input events, ensuring state writes synchronize perfectly with the browser's hardware refresh rate (typically 60Hz or 120Hz).
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          When mouse movement listeners update React state on every single <code className="text-[#BE93FD] font-mono-tech text-xs">pointermove</code> event, they can schedule hundreds of render cycles per second, clogging the queue. Throttling visual updates via <code className="text-[#BE93FD] font-mono-tech text-xs">requestAnimationFrame</code> ensures that calculations execute only once per display frame.
        </p>
      </section>

      {/* 10. Font and Third-Party Dependency Optimization */}
      <section id="font-third-party-optimization" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">10.</span>
          Font and Third-Party Dependency Optimization
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          External font files and non-critical third-party SDKs can introduce significant network latency if not carefully managed:
        </p>

        <ul className="space-y-2 text-sm text-gray-300 pl-4 border-l-2 border-[#FF6F91]/40">
          <li><strong>Preconnect Font Origins:</strong> Connect early to Google Fonts domains using <code className="text-[#BE93FD] font-mono-tech text-xs">&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;</code> to save TCP and TLS negotiation rounds.</li>
          <li><strong>Font-Display Swap:</strong> Enforce <code className="text-[#BE93FD] font-mono-tech text-xs">&display=swap</code> to prevent Flash of Invisible Text (FOIT) while custom typography streams.</li>
          <li><strong>On-Demand SDK Imports:</strong> Defer loading third-party communication SDKs (such as EmailJS or payment gateways) until the user actually interacts with the corresponding form component.</li>
        </ul>
      </section>

      {/* 11. Mobile GPU and Visual Effect Optimization */}
      <section id="mobile-gpu-optimization" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">11.</span>
          Mobile GPU and Visual Effect Optimization
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Glassmorphic designs with heavy CSS <code className="text-[#BE93FD] font-mono-tech text-xs">backdrop-filter: blur(...)</code> and multi-layered radial gradients look stunning on high-powered desktop workstations but can cause severe GPU throttling and battery drain on mid-range mobile devices.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          To maintain smooth scrolling across all devices, mobile CSS should reduce blur radii, replace dynamic glass filters with lightweight semi-transparent solid backgrounds (<code className="text-[#BE93FD] font-mono-tech text-xs">rgba(13, 8, 20, 0.85)</code>), and use hardware-accelerated CSS transforms (<code className="text-[#BE93FD] font-mono-tech text-xs">translate3d</code>) for positioning.
        </p>
      </section>

      {/* 12. What Changed in My Portfolio (Measured Implementation Results) */}
      <section id="portfolio-results" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">12.</span>
          What Changed in My Portfolio (Verified Implementation Data)
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          The following metrics represent real, verified build-time and asset size measurements taken before and after optimization on this production website:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">MAIN JS ENTRY BUNDLE</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-400 line-through">543.57 KB</span>
              <span className="text-xl font-extrabold text-white">351.08 KB</span>
            </div>
            <p className="text-xs text-[#10B981] font-semibold">~35.4% reduction via route-level code splitting</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">ARTICLES REGISTRY CHUNK</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-400 line-through">68.59 KB</span>
              <span className="text-xl font-extrabold text-white">5.15 KB</span>
            </div>
            <p className="text-xs text-[#10B981] font-semibold">~92.5% reduction via dynamic article lazy loading</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">HERO AVATAR IMAGE</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-400 line-through">592.36 KB PNG</span>
              <span className="text-xl font-extrabold text-white">73.27 KB WebP</span>
            </div>
            <p className="text-xs text-[#10B981] font-semibold">~87.6% byte savings on hero element</p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">ABOUT PORTRAIT IMAGE</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-400 line-through">96.29 KB JPEG</span>
              <span className="text-xl font-extrabold text-white">26.20 KB WebP</span>
            </div>
            <p className="text-xs text-[#10B981] font-semibold">~72.8% byte savings on profile image</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 italic">
          Note: These figures reflect concrete bundle and media measurements from production builds. Individual network latencies and user device rendering speeds will vary.
        </p>
      </section>

      {/* 13. Performance Optimization Checklist */}
      <section id="performance-checklist" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-3 border-b border-white/10 pb-3">
          <span className="text-[#FF6F91] font-mono-tech text-base">13.</span>
          Performance Optimization Checklist
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Use this production audit checklist when architecting and shipping React 19 web applications:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            "Route-level lazy loading implemented with React.lazy and Suspense",
            "Heavy data registries decoupled from full component bodies",
            "Raster assets converted to WebP or AVIF formats",
            "Above-the-fold hero assets preloaded in HTML header",
            "Explicit width/height attributes applied to all image nodes",
            "Scroll polling replaced with asynchronous IntersectionObserver",
            "High-frequency pointer interactions throttled with requestAnimationFrame",
            "Third-party SDKs imported on-demand rather than at bootstrap",
            "Font connections preconnected with font-display: swap",
            "Mobile glassmorphism and blur radii optimized for low-end GPUs",
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-start gap-2.5 text-xs text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Author & Consultation Context */}
      <section className="pt-6 border-t border-white/10 space-y-4">
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          For further architectural patterns, explore our companion guides on{" "}
          <Link to="/articles/technical-seo-react-vite" className="text-[#BE93FD] font-semibold hover:text-[#FF6F91]">
            Technical SEO for React SPAs
          </Link>{" "}
          and{" "}
          <Link to="/articles/production-nodejs-rest-api-architecture" className="text-[#BE93FD] font-semibold hover:text-[#FF6F91]">
            Production-Grade Node.js & Express REST API Architecture
          </Link>
          . If you are building high-performance web applications in{" "}
          <Link to="/ahmedabad-web-developer" className="text-[#BE93FD] font-semibold hover:text-[#FF6F91]">
            Ahmedabad
          </Link>{" "}
          or{" "}
          <Link to="/gandhinagar-web-developer" className="text-[#BE93FD] font-semibold hover:text-[#FF6F91]">
            Gandhinagar
          </Link>
          , feel free to review our{" "}
          <Link to="/services" className="text-[#BE93FD] font-semibold hover:text-[#FF6F91]">
            available web engineering services
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-[#BE93FD] font-semibold hover:text-[#FF6F91]">
            reach out directly
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
