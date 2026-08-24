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
  PhoneCall,
  Mail,
  Zap,
} from "lucide-react";

export const AHMEDABAD_FAQS = [
  {
    q: "Do you work with businesses and startups in Ahmedabad?",
    a: "Yes. Although I am based in Pali, Rajasthan, I work with businesses, startups, and founders across Ahmedabad (including teams along SG Highway, Prahlad Nagar, and Bodakdev) remotely through structured video calls, collaborative Git repositories, and transparent milestone deliveries.",
  },
  {
    q: "What technologies do you use for web application development?",
    a: "I specialize in the modern JavaScript ecosystem using the full MERN stack: React 19 and Tailwind CSS on the frontend, Node.js and Express.js on the backend, and MongoDB (with Mongoose) for the database layer. For cloud deployments, I use Vercel and Docker containerization.",
  },
  {
    q: "What types of websites and digital solutions can you build?",
    a: "I build full-stack SaaS web applications, custom e-commerce storefronts with integrated payment gateways, high-converting responsive landing pages, real-time client portals, and administrative management dashboards.",
  },
  {
    q: "How do you manage communication and project delivery remotely?",
    a: "Communication is handled smoothly via scheduled Google Meet calls, email, and Loom video walkthroughs. Project milestones are tracked on GitHub or agile boards with live preview staging URLs so you can test updates before production release.",
  },
  {
    q: "Do I get full source code ownership upon project completion?",
    a: "Yes. Upon final project sign-off and milestone settlement, you receive 100% full ownership of the clean Git source code repository, documentation, deployment scripts, and database schemas with zero vendor lock-in.",
  },
  {
    q: "How can an Ahmedabad business request a project quote?",
    a: "You can navigate to the contact page to share your project scope, select required deliverables, and specify your target timeline. Alternatively, you can email me directly at aayush.s4568@gmail.com for an initial consultation.",
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
              I am <strong className="text-white">Aayush Sharma</strong>, a Full-Stack MERN Developer based in Pali, Rajasthan, delivering high-performance web engineering services for businesses, commercial ventures, and startups across Ahmedabad, Gujarat. From modernizing traditional trade workflows to building high-converting e-commerce platforms and bespoke React single-page applications, I engineer fast, reliable, and scalable web solutions.
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
                <span>View Full Service Scope</span>
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
          <span>Local Market Context & Scalability</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Full-Stack Web Development for Ahmedabad Businesses
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Ahmedabad represents one of western India's most dynamic commercial and industrial epicenters. From long-standing textile and manufacturing enterprises transitioning to digital operations to new consumer brands and tech startups situated around SG Highway, Prahlad Nagar, and Sindhu Bhavan Road, modern businesses require robust web infrastructure rather than slow, cookie-cutter templates.
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
                Purpose-built React and Node.js solutions tailored precisely to your company's operational workflow, eliminating bloated plugins and slow page loads.
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

      {/* Section 2: MERN Stack Web Applications */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Code2 className="w-4 h-4 text-[#FF6F91]" />
          <span>Modern Engineering Stack</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          MERN Stack Web Applications
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          The MERN stack (MongoDB, Express.js, React 19, Node.js) provides the ideal balance between frontend responsiveness and backend processing power. Whether building interactive portals, workflow automation tools, or data-intensive dashboards for Ahmedabad teams, this stack ensures modular scalability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-[#BE93FD] font-bold">FRONTEND</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">React 19 & Vite</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Component-based modular architecture, instant sub-second page transitions, state management with React Hooks and Redux Toolkit.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-[#D65DB1] font-bold">API LAYER</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">Express.js Framework</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              RESTful API design, controller-service pattern, rate limiting, CORS configuration, and structured request validation.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-[#FF6F91] font-bold">DATABASE</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">MongoDB & Mongoose</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Flexible document schemas, optimized indexing, aggregation pipelines, and robust data sanitization protocols.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-emerald-400 font-bold">SECURITY</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">JWT & OAuth</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Token-based stateless authentication, bcrypt password hashing, role-based access control, and secure HTTP-only cookies.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Business Websites & E-commerce Development */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <ShoppingBag className="w-4 h-4 text-[#FF6F91]" />
          <span>Commerce & Conversion</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Business Websites & E-commerce Development
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Ahmedabad is a powerhouse of retail, wholesale, and direct-to-consumer businesses. Transitioning from generic template stores to bespoke e-commerce engines allows local merchants to offer frictionless checkout experiences, custom product configuration, and seamless order management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#FF6F91]" />
                <span>Custom E-Commerce Storefronts</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Secure payment gateway integration (Razorpay, Stripe, UPI)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Dynamic shopping cart, discount vouchers, and checkout flow</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Administrative product catalogue & live inventory management</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/services"
                className="text-xs font-mono-tech font-bold text-[#BE93FD] hover:text-[#FF6F91] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Learn more about e-commerce deliverables</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-[#BE93FD]" />
                <span>Corporate & B2B Portals</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>High-authority brand presentation tailored to manufacturing and trade</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Automated lead capture, quotation request forms, and CRM webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Optimized for fast mobile loading across Indian telecom networks</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/contact"
                className="text-xs font-mono-tech font-bold text-[#BE93FD] hover:text-[#FF6F91] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Request a corporate website consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Responsive Landing Pages & UI Development */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Rocket className="w-4 h-4 text-[#FF6F91]" />
          <span>Visual Aesthetics & Conversion</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Responsive Landing Pages & UI Development
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          A marketing campaign is only as effective as the landing page handling visitor traffic. I design and develop responsive, high-converting landing pages engineered with Tailwind CSS, fluid typography, subtle micro-interactions, and clear conversion funnels.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-base text-white mb-2">Modern Glassmorphism</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Curated color palettes, dark mode ergonomics, and premium design tokens that make your brand stand out from generic templates.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-base text-white mb-2">Mobile-First Layouts</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              100% fluid responsive styling tested thoroughly across smartphones, tablets, laptops, and ultra-wide displays.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-base text-white mb-2">Smooth Interactions</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              GPU-accelerated micro-animations with Framer Motion that engage visitors without degrading device performance.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Technical SEO & Performance */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Search className="w-4 h-4 text-[#FF6F91]" />
          <span>Search Engine & AI Discoverability</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Technical SEO & Performance
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Building a website is only half the battle; it must be discoverable by search engines and answer engines (AEO). Every web application I engineer incorporates strict technical SEO fundamentals: dynamic canonical URL synchronization, Open Graph metadata, Schema.org JSON-LD graphs, and near-perfect Google Lighthouse scores.
        </p>

        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#BE93FD]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono-tech text-xs text-[#BE93FD] font-bold uppercase tracking-wider">
              ENGINEERING INSIGHT
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Want to see how technical SEO works in modern React SPAs?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Read my published technical guide on optimizing Single-Page Applications for dynamic indexing, structured JSON-LD graphs, and Vercel edge routing.
            </p>
          </div>
          <Link
            to="/articles/technical-seo-react-vite"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-[#BE93FD]/40 text-white font-mono-tech font-bold text-xs hover:border-[#FF6F91] hover:bg-[#BE93FD]/10 transition-all shrink-0"
          >
            <span>Read SEO Guide</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#BE93FD]" />
          </Link>
        </div>
      </section>

      {/* Section 6: How I Work With Ahmedabad Clients */}
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
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">UI & Component Design</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Structuring modular React interfaces with accessible design tokens, responsive breakpoints, and glassmorphism styling.
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
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Testing & Audits</h4>
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

      {/* Section 7: Frequently Asked Questions */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <HelpCircle className="w-4 h-4 text-[#FF6F91]" />
          <span>Factual Answers & Inquiries</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
          Direct, transparent answers regarding my engineering stack, remote collaboration workflow, and technical deliverables.
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

      {/* Section 8: Start a Web Development Project */}
      <section className="glass-card p-8 sm:p-12 rounded-3xl border border-[#BE93FD]/40 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D65DB1]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-[#FF6F91]" />
            <span>Ready To Build?</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Start a Web Development Project
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
            Whether you need a full-stack MERN application, a custom e-commerce store, or a high-performance corporate landing page for your Ahmedabad business, let's connect and discuss your technical requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(214,93,177,0.5)] hover:scale-105 transition-all duration-300"
            >
              <span>Get in Touch for a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/gandhinagar-web-developer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full glass-card border border-white/20 text-gray-200 font-mono-tech font-bold text-xs hover:border-[#BE93FD] hover:text-white transition-all duration-300"
            >
              <span>Explore Gandhinagar Services</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#BE93FD]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
