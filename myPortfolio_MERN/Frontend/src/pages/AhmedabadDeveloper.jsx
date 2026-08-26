import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Rocket,
  Search,
  ChevronDown,
  Layers,
  ShieldCheck,
  HelpCircle,
  Clock,
  GitBranch,
  FileText,
  MapPin,
  Laptop,
  Cpu,
  Server,
  ArrowUpRight,
  ExternalLink,
  Mail,
  Zap,
  Check,
  Sliders,
  Database,
  LayoutTemplate,
} from "lucide-react";

export const AHMEDABAD_FAQS = [
  {
    q: "How much does a custom website cost for an Ahmedabad business?",
    a: "Website development costs depend on project scope, custom UI design, third-party integrations, database schema complexity, authentication, and deployment architecture. Rather than charging fixed template packages, I provide transparent, scope-based estimates for landing pages, multi-page business websites, e-commerce storefronts, and full-stack MERN web applications based on your exact technical requirements.",
  },
  {
    q: "How long does it take to design and develop a website?",
    a: "Development timelines vary according to project scale, design complexity, and backend features. A single-page responsive landing page typically requires 5–7 business days, while a multi-page corporate website or full-stack MERN application with custom APIs, authentication, and database schemas generally takes 2–6 weeks depending on feedback cycles and content readiness.",
  },
  {
    q: "What does a Full-Stack MERN Developer build?",
    a: "A Full-Stack MERN Developer designs and builds complete web applications across both client and server layers. This includes dynamic React frontends, robust Node.js and Express REST APIs, MongoDB database schemas, user authentication (JWT/OAuth), third-party payment and webhook integrations, and cloud deployment pipelines.",
  },
  {
    q: "Why choose a custom MERN application instead of a template-based website?",
    a: "A custom MERN application gives greater control over application architecture, business logic, dependencies, APIs, and data handling. It can be a strong fit for custom workflows, dashboards, integrations, and application-specific functionality. Template-based CMS platforms can remain practical for simpler content-focused websites.",
  },
  {
    q: "Does Aayush Sharma provide web development services to Ahmedabad businesses remotely?",
    a: "Yes. Based in Pali, Rajasthan, I work with businesses, startups, and founders in Ahmedabad and Gandhinagar remotely. Collaboration is conducted through structured Google Meet calls, milestone updates on live staging environments, clear Git repositories, and transparent project tracking without geographical friction.",
  },
  {
    q: "What is included when hiring Aayush Sharma?",
    a: "Engagements include end-to-end development: architectural planning, responsive UI implementation with React and Tailwind CSS, backend API engineering, database design, technical SEO setup, security validation, live cloud deployment, and 100% full source code ownership transferred upon project sign-off.",
  },
];

export default function AhmedabadDeveloper() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative z-10 w-full pt-28 sm:pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs font-mono-tech text-gray-400">
          <li>
            <Link to="/" className="hover:text-[#BE93FD] transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#BE93FD] font-semibold">Ahmedabad Web Developer</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="mb-16 sm:mb-20 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6"
        >
          <div className="max-w-3xl">
            {/* Geo Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>Target Location: Ahmedabad, Gujarat</span>
            </div>

            {/* Exactly One Semantic H1 */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4">
              Web Developer in Ahmedabad |{" "}
              <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">
                Custom MERN & Web Applications
              </span>
            </h1>

            {/* Factual Intro Paragraph for AEO */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-body mb-6">
              I am <strong className="text-white">Aayush Sharma</strong>, a Full-Stack MERN Developer based in Pali, Rajasthan, providing high-performance website development services and custom web application engineering for businesses, startups, and commercial ventures in Ahmedabad, Gujarat. Operating as an independent freelance web developer with a remote delivery model, I engineer fast, reliable, and scalable web solutions tailored to modern digital workflows.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(214,93,177,0.4)] hover:scale-105 transition-all duration-300"
              >
                <span>Discuss Your Ahmedabad Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass-card border border-[#BE93FD]/40 text-white font-display font-extrabold text-xs sm:text-sm tracking-wide hover:border-[#FF6F91] hover:bg-[#BE93FD]/10 transition-all duration-300"
              >
                <span>View Web Development Services</span>
                <Layers className="w-4 h-4 text-[#BE93FD]" />
              </Link>
            </div>
          </div>

          {/* Quick Technical Summary Card */}
          <div className="w-full sm:w-80 glass-card p-6 rounded-3xl border border-[#BE93FD]/30 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#FF6F91]">
              <Sparkles className="w-4 h-4" />
              <span>Core Tech Matrix</span>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Frontend:</span>
                <span className="font-semibold text-white">React 19 / Vite</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Backend:</span>
                <span className="font-semibold text-white">Node.js / Express</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Database:</span>
                <span className="font-semibold text-white">MongoDB / Mongoose</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Styling:</span>
                <span className="font-semibold text-white">Tailwind CSS / Motion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Delivery:</span>
                <span className="font-semibold text-[#BE93FD]">Remote / Milestone-Based</span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Section 1: Full-Stack Web Development for Ahmedabad Businesses */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Laptop className="w-4 h-4 text-[#FF6F91]" />
          <span>Local Market Context & Digital Modernization</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Full-Stack Web Development for Ahmedabad Businesses
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Ahmedabad represents one of western India's most vibrant commercial centers, spanning manufacturing powerhouses, B2B exporters, direct-to-consumer e-commerce brands, service enterprises, and emerging SaaS startups. As modern businesses expand their digital presence along SG Highway, Prahlad Nagar, Bodakdev, and Sindhu Bhavan Road, they need robust, custom-engineered web infrastructure instead of slow, generic templates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Custom Web Architecture
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Purpose-built React and Node.js solutions tailored precisely to your company's operational workflow, focusing on maintainable code, controlled dependencies, and fast page loads.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D65DB1]/15 text-[#D65DB1] flex items-center justify-center mb-3">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Startup MVP Acceleration
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rapid prototype-to-production cycles for founders looking to validate ideas with clean, maintainable, and modular JavaScript codebases.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FF6F91]/15 text-[#FF6F91] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                100% Code Ownership
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Complete source code rights transferred upon milestone completion. No recurring licensing fees or restrictive proprietary site-builder locks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Web Development Capabilities */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Code2 className="w-4 h-4 text-[#FF6F91]" />
          <span>Engineering Solutions</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Web Development Services in Ahmedabad
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Whether you need a full-stack SaaS platform, a high-converting landing page, or a custom merchant portal, I build scalable web software using the modern JavaScript ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#BE93FD]" />
                <span>Custom MERN Web Applications</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Full-stack web software built with React 19, Node.js, Express, and MongoDB for interactive dashboards, internal tools, and SaaS MVPs.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Secure JWT authentication & role-based access control</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Modular REST API architecture & database indexing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Cloud deployment with Docker containerization or Vercel</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/services"
                className="text-xs font-mono-tech font-bold text-[#BE93FD] hover:text-[#FF6F91] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Explore MERN services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#FF6F91]" />
                <span>E-Commerce & B2B Portals</span>
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Bespoke digital storefronts and B2B quotation portals designed for frictionless transactions, high conversions, and seamless catalog management.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0" />
                  <span>Payment gateway integration (Razorpay, Stripe, UPI)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0" />
                  <span>Dynamic shopping cart, discount rules & order processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6F91] shrink-0" />
                  <span>Administrative inventory & customer management</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/contact"
                className="text-xs font-mono-tech font-bold text-[#BE93FD] hover:text-[#FF6F91] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Request e-commerce consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Custom MERN Application vs Traditional CMS */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Sliders className="w-4 h-4 text-[#FF6F91]" />
          <span>Architectural Comparison</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Custom MERN Application vs Traditional CMS
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Every digital project has distinct technical requirements. Choosing between a custom MERN architecture and a traditional Content Management System (CMS) depends on whether your project requires bespoke business logic, interactive dashboards, or standard content publishing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Custom MERN Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#BE93FD]/40 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BE93FD]/15 border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4">
              <Code2 className="w-3.5 h-3.5" />
              <span>Custom MERN Application</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-3">
              Purpose-Built Engineering
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Ideal for SaaS platforms, custom client portals, web applications, and products requiring bespoke database schemas and business logic.
            </p>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Custom Logic:</strong> Tailored business rules without template constraints.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>React Frontend:</strong> Dynamic, component-driven single-page interactions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Node & Express API:</strong> Scalable RESTful endpoints with structured middleware.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>MongoDB Data Model:</strong> Flexible JSON-like document schemas for evolving data.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Controlled Dependencies:</strong> Zero reliance on third-party theme plugins.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Modern Deployment:</strong> Optimized edge routing on Vercel or containerized Docker.</span>
              </div>
            </div>
          </div>

          {/* Traditional CMS Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono-tech font-bold uppercase mb-4">
              <LayoutTemplate className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>Traditional CMS (e.g. WordPress)</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-3">
              Standard Content Publishing
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              A well-established solution for basic informational websites, editorial blogs, and teams that prefer non-technical visual page builders.
            </p>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0 mt-0.5" />
                <span><strong>Plugin Ecosystem:</strong> Vast library of pre-built extensions and widgets.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0 mt-0.5" />
                <span><strong>Rapid Setup:</strong> Quick deployment for standard brochure sites.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0 mt-0.5" />
                <span><strong>Broad Ecosystem:</strong> Extensive non-technical admin panel support.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0 mt-0.5" />
                <span><strong>Publishing Fit:</strong> Suitable for daily articles and marketing blogs.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 text-gray-500 shrink-0 text-center font-bold font-mono-tech mt-0.5">•</span>
                <span className="text-gray-400">Requires ongoing plugin maintenance and security patch updates.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 text-gray-500 shrink-0 text-center font-bold font-mono-tech mt-0.5">•</span>
                <span className="text-gray-400">Complex custom workflows often require heavy theme customization.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Website Development Budgets & Scope */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Sparkles className="w-4 h-4 text-[#FF6F91]" />
          <span>Transparent Planning</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Website Development Budgets & Project Scope
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          To help Ahmedabad businesses plan their digital investments accurately, project scopes are structured around functional complexity rather than opaque pricing tiers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Scope 1: Landing Page */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xs text-[#BE93FD] font-bold">TYPE 01</span>
              <h3 className="font-display font-bold text-base text-white mt-1 mb-2">
                Landing Page & UI Prototype
              </h3>
              <div className="space-y-2 text-xs text-gray-300 mb-4">
                <p><strong>Typical Scope:</strong> Single high-converting landing page or interactive product prototype.</p>
                <p><strong>Deliverables:</strong> React 19/Tailwind layout, lead capture form, technical SEO, mobile optimization.</p>
                <p><strong>Cost Factors:</strong> Custom micro-animations, copy readiness, third-party analytics hooks.</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Complexity:</span>
              <span className="text-[#BE93FD] font-bold">Low to Moderate</span>
            </div>
          </div>

          {/* Scope 2: Business Website */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xs text-[#D65DB1] font-bold">TYPE 02</span>
              <h3 className="font-display font-bold text-base text-white mt-1 mb-2">
                Multi-Page Business Website
              </h3>
              <div className="space-y-2 text-xs text-gray-300 mb-4">
                <p><strong>Typical Scope:</strong> Multi-page corporate presence for B2B, manufacturing, or service companies.</p>
                <p><strong>Deliverables:</strong> Structured navigation, service catalogs, inquiry forms, dynamic routing, Schema markup.</p>
                <p><strong>Cost Factors:</strong> Total page count, custom UI components, dynamic content layer, CRM webhooks.</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Complexity:</span>
              <span className="text-[#D65DB1] font-bold">Moderate</span>
            </div>
          </div>

          {/* Scope 3: E-Commerce Storefront */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xs text-[#FF6F91] font-bold">TYPE 03</span>
              <h3 className="font-display font-bold text-base text-white mt-1 mb-2">
                E-Commerce Storefront
              </h3>
              <div className="space-y-2 text-xs text-gray-300 mb-4">
                <p><strong>Typical Scope:</strong> Direct-to-consumer (D2C) or wholesale digital product storefront.</p>
                <p><strong>Deliverables:</strong> Product catalog, dynamic shopping cart, Razorpay/Stripe checkout, admin inventory panel.</p>
                <p><strong>Cost Factors:</strong> SKU volume, payment gateways, tax/shipping logic, custom checkout steps.</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Complexity:</span>
              <span className="text-[#FF6F91] font-bold">Moderate to High</span>
            </div>
          </div>

          {/* Scope 4: Custom MERN Web App */}
          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xs text-emerald-400 font-bold">TYPE 04</span>
              <h3 className="font-display font-bold text-base text-white mt-1 mb-2">
                Custom MERN Application
              </h3>
              <div className="space-y-2 text-xs text-gray-300 mb-4">
                <p><strong>Typical Scope:</strong> Bespoke SaaS platform, internal workflow tool, or startup MVP.</p>
                <p><strong>Deliverables:</strong> JWT authentication, Node/Express REST API, MongoDB schema, dashboard, cloud deployment.</p>
                <p><strong>Cost Factors:</strong> API endpoint count, role permissions, real-time features, external API integrations.</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Complexity:</span>
              <span className="text-emerald-400 font-bold">High</span>
            </div>
          </div>
        </div>

        {/* Pricing Notice Callout */}
        <div className="glass-card p-4 sm:p-5 rounded-2xl border border-[#BE93FD]/30 text-xs sm:text-sm text-gray-300 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#BE93FD] shrink-0" />
          <span>
            <em>Note:</em> Final pricing depends on scope, integrations, content, authentication, database requirements, and deployment requirements. Contact me with your functional specification for a tailored project estimate.
          </span>
        </div>
      </section>

      {/* Section 5: Website Development Timeline */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Clock className="w-4 h-4 text-[#FF6F91]" />
          <span>Project Lifecycle & Planning</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Website Development Timeline & Factors
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Project timelines are driven by functional requirements, asset availability, and review iterations. Here are the core technical factors that determine the delivery timeline for an Ahmedabad web project:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#BE93FD]" />
              <span>Page Volume & UI Customization</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Single-page layouts take less time than multi-page portals with customized responsive states and micro-interactions.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#D65DB1]" />
              <span>Backend APIs & Logic</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Custom Node.js endpoints, complex business logic, and third-party webhook integrations require thorough design and unit testing.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6F91]" />
              <span>Authentication & Security</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Implementing JWT token validation, OAuth providers, bcrypt hashing, and role-based route guards adds necessary testing cycles.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Database Architecture</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              MongoDB schema modeling, indexing for query speed, and data validation rules ensure long-term database stability.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span>Payment & Checkout Flow</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Configuring Razorpay/Stripe webhooks, order reconciliation, and automated email receipts requires rigorous sandbox testing.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-sm text-white mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#BE93FD]" />
              <span>Content Readiness & Revisions</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Having branding assets, copy, and product photos ready accelerates development and minimizes iteration cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Technical SEO & Full-Stack Architecture Articles */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Search className="w-4 h-4 text-[#FF6F91]" />
          <span>Technical Depth & Architecture</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Engineering Standards & Technical Publications
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Every web application I develop adheres to strict engineering principles: dynamic indexing, sub-second Core Web Vitals, and modular REST API structures. Explore my published technical documentation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/articles/technical-seo-react-vite"
            className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#BE93FD]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-mono-tech text-xs text-[#BE93FD] font-bold">SEO ARCHITECTURE</span>
              <h3 className="font-display font-bold text-base text-white mt-2 mb-2 group-hover:text-[#BE93FD] transition-colors">
                Technical SEO in React & Vite SPAs
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Implementing Schema.org JSON-LD graphs, dynamic meta tag synchronization, and edge server prerendering.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono-tech text-[#BE93FD]">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/articles/production-nodejs-rest-api-architecture"
            className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#D65DB1]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-mono-tech text-xs text-[#D65DB1] font-bold">BACKEND ENGINEERING</span>
              <h3 className="font-display font-bold text-base text-white mt-2 mb-2 group-hover:text-[#D65DB1] transition-colors">
                Production Node.js REST API Architecture
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Controller-service layer separation, rate limiting, request validation, and centralized error handling.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono-tech text-[#D65DB1]">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/articles/react-performance-optimization-inp-web-vitals"
            className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#FF6F91]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-mono-tech text-xs text-[#FF6F91] font-bold">PERFORMANCE</span>
              <h3 className="font-display font-bold text-base text-white mt-2 mb-2 group-hover:text-[#FF6F91] transition-colors">
                React Performance & Interaction to Next Paint (INP)
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Optimizing React 19 render cycles, code splitting, asset preloading, and Core Web Vitals for top Lighthouse scores.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono-tech text-[#FF6F91]">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Section 7: How I Work With Ahmedabad Clients */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <GitBranch className="w-4 h-4 text-[#FF6F91]" />
          <span>Collaboration & Milestone Transparency</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          How I Work With Ahmedabad Clients
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
          Remote development allows Ahmedabad businesses to partner with specialized engineering talent without agency management markup. Here is the exact 5-step roadmap I follow for every client engagement:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-[#BE93FD] font-black">01</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Scope & Discovery</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Clarifying functional requirements, database needs, branding guidelines, and measurable delivery milestones.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-[#D65DB1] font-black">02</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">UI & Component Architecture</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Structuring modular React interfaces with accessible design tokens, responsive breakpoints, and modern aesthetics.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-[#FF6F91] font-black">03</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Full-Stack Build</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Developing Node.js REST API endpoints, MongoDB models, secure JWT authentication, and interactive React client states.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-purple-400 font-black">04</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Testing & Performance</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Executing cross-browser validation, API error handling tests, Google Lighthouse optimization, and SEO metadata sync.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-emerald-400 font-black">05</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Launch & Handoff</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Deploying to live production (Vercel or Docker) with complete Git repository transfer and setup documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Frequently Asked Questions */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <HelpCircle className="w-4 h-4 text-[#FF6F91]" />
          <span>Factual Answers & Inquiries</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
          Direct, transparent answers regarding my engineering stack, development pricing factors, timelines, and remote collaboration workflow.
        </p>

        <div className="space-y-3">
          {AHMEDABAD_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/10 overflow-hidden transition-colors hover:border-[#BE93FD]/50"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#BE93FD] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#FF6F91]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 9: Start a Web Development Project */}
      <section className="glass-card p-8 sm:p-12 rounded-3xl border border-[#BE93FD]/40 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D65DB1]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-[#FF6F91]" />
            <span>Direct Project Consultation</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Start a Web Development Project
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
            Whether you need a custom full-stack MERN application, an e-commerce platform, or a responsive corporate website for your Ahmedabad business, share your project requirements for a detailed scope review and timeline estimate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(214,93,177,0.5)] hover:scale-105 transition-all duration-300"
            >
              <span>Request a Project Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:aayush.s4568@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full glass-card border border-white/20 text-gray-200 font-mono-tech font-bold text-xs hover:border-[#BE93FD] hover:text-white transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5 text-[#BE93FD]" />
              <span>Email: aayush.s4568@gmail.com</span>
            </a>

            <Link
              to="/gandhinagar-web-developer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full glass-card border border-white/20 text-gray-200 font-mono-tech font-bold text-xs hover:border-[#BE93FD] hover:text-white transition-all duration-300"
            >
              <span>Gandhinagar Services</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#BE93FD]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
