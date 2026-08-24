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
  Building2,
  Lock,
} from "lucide-react";

export const GANDHINAGAR_FAQS = [
  {
    q: "Do you provide web development services for companies in Gandhinagar and GIFT City?",
    a: "Yes. I provide full-stack web engineering and consulting for companies, tech initiatives, and emerging startups in Gandhinagar and the broader GIFT City tech ecosystem remotely from my base in Pali, Rajasthan.",
  },
  {
    q: "What are the benefits of choosing the MERN stack for Gandhinagar tech startups?",
    a: "The MERN stack (MongoDB, Express.js, React 19, Node.js) allows startups to build and iterate on unified JavaScript codebases quickly. It provides high concurrency, non-blocking I/O, seamless JSON data structures, and easy containerization with Docker for cloud deployments.",
  },
  {
    q: "Can you build custom administrative dashboards and REST API backends?",
    a: "Yes. I engineer modular RESTful API architectures using Express.js and Node.js with structured controller layers, input sanitization, automated error handling, and intuitive React dashboard interfaces with real-time state updates.",
  },
  {
    q: "How do you handle data security and user authentication?",
    a: "I implement JSON Web Token (JWT) stateless authentication, bcrypt password hashing, HTTP-only secure cookies, CORS security headers, rate limiting, and role-based access control (RBAC) to ensure enterprise-grade security.",
  },
  {
    q: "What is your typical project timeline from requirements to deployment?",
    a: "A focused MVP or business web application typically takes 2 to 4 weeks depending on feature complexity, API integrations, and database schemas. Every milestone follows a strict schedule with weekly progress reviews.",
  },
  {
    q: "How can a Gandhinagar team initiate a web development consultation?",
    a: "You can reach out through the contact form with your technical scope and milestones, or send an email directly to aayush.s4568@gmail.com to schedule an introductory video call.",
  },
];

export default function GandhinagarDeveloper() {
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
          <li className="text-[#BE93FD] font-semibold">Gandhinagar Web Developer</li>
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
              <Building2 className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>Target Location: Gandhinagar & GIFT City Corridor, Gujarat</span>
            </div>

            {/* Exactly One Semantic H1 */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4">
              Web Developer in Gandhinagar |{" "}
              <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">
                Scalable MERN & Full-Stack Solutions
              </span>
            </h1>

            {/* Factual Intro Paragraph for AEO */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-body mb-6">
              I am <strong className="text-white">Aayush Sharma</strong>, a Full-Stack MERN Developer based in Pali, Rajasthan, providing modern web engineering and bespoke web application development for businesses, tech startups, and organizations in Gandhinagar, Gujarat. Specializing in high-concurrency Node.js backends, secure MongoDB databases, and fluid React 19 frontends, I build cloud-ready web systems with clean architecture.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(214,93,177,0.4)] hover:scale-105 transition-all duration-300"
              >
                <span>Initiate Gandhinagar Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass-card border border-[#BE93FD]/40 text-white font-display font-extrabold text-xs sm:text-sm tracking-wide hover:border-[#FF6F91] hover:bg-[#BE93FD]/10 transition-all duration-300"
              >
                <span>Explore Technical Deliverables</span>
                <Layers className="w-4 h-4 text-[#BE93FD]" />
              </Link>
            </div>
          </div>

          {/* Tech Architecture Snapshot Card */}
          <div className="w-full sm:w-80 glass-card p-6 rounded-3xl border border-[#BE93FD]/30 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD]">
              <Cpu className="w-4 h-4 text-[#FF6F91]" />
              <span>Enterprise Stack Matrix</span>
            </div>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Architecture:</span>
                <span className="font-semibold text-white">MERN & Microservices</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Security:</span>
                <span className="font-semibold text-white">JWT / OAuth 2.0 / RBAC</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Database:</span>
                <span className="font-semibold text-white">MongoDB / Index Tuning</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">DevOps:</span>
                <span className="font-semibold text-white">Docker / CI/CD Pipelines</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Collaboration:</span>
                <span className="font-semibold text-[#BE93FD]">Git / Milestone Delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Section 1: Full-Stack Web Development in Gandhinagar */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Building2 className="w-4 h-4 text-[#FF6F91]" />
          <span>Regional Tech Hub & Enterprise Landscape</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Full-Stack Web Development in Gandhinagar
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          As Gujarat's administrative capital and home to emerging technology enclaves including Infocity, Kudasan, and the flagship GIFT City (Gujarat International Finance Tec-City), Gandhinagar is evolving into a high-growth hub for software engineering, financial technology, and SaaS startups. Projects in this ecosystem demand clean code modularity, strict authentication safeguards, and high-throughput backend services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Security-First Design
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Protecting business data with bcrypt password hashing, encrypted transmission, sanitized queries, and granular role-based access controls.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D65DB1]/15 text-[#D65DB1] flex items-center justify-center mb-3">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Scalable Backend Systems
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Asynchronous Express.js REST APIs capable of handling high concurrent traffic loads with sub-millisecond database response times.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FF6F91]/15 text-[#FF6F91] flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Clean Git Workflows
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Fully documented repositories with clear commit histories, modular component folders, and zero technical debt upon handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: MERN Stack Applications */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Code2 className="w-4 h-4 text-[#FF6F91]" />
          <span>Full-Stack Architecture</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          MERN Stack Applications
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Engineering scalable web applications requires seamless synergy between the presentation, business logic, and persistence layers. By leveraging MongoDB, Express.js, React 19, and Node.js, I build unified JavaScript applications tailored for complex workflows and data visualization.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-[#BE93FD] font-bold">CLIENT LOGIC</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">React 19 & Redux</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Interactive user interfaces with React 19 actions, reusable components, and predictable state management via Redux Toolkit.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-[#D65DB1] font-bold">SERVER RUNTIME</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">Node.js Engine</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Event-driven non-blocking runtime designed to handle I/O-intensive operations and real-time client requests smoothly.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-[#FF6F91] font-bold">DATA PERSISTENCE</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">MongoDB Atlas</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              High-availability document storage with automated schema validation via Mongoose and optimized compound indexing.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/20">
            <span className="font-mono-tech text-xs text-emerald-400 font-bold">CONTAINERIZATION</span>
            <h4 className="font-display font-bold text-base text-white mt-1 mb-2">Docker & Cloud</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Standardized container builds for reproducible development and production environments across AWS, Vercel, and cloud VMs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Business Websites & Web Applications */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Laptop className="w-4 h-4 text-[#FF6F91]" />
          <span>Web Systems & Portals</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Business Websites & Web Applications
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Gandhinagar businesses and institutions need online platforms that project technical credibility and deliver real operational utility. I create bespoke web applications including client management dashboards, booking engines, and multi-tenant portals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#BE93FD]" />
                <span>Admin Dashboards & Internal Tools</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Real-time data visualization, filtering, and export capabilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Secure administrative panels with multi-level role permissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Automated audit logs and system telemetry tracking</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/services"
                className="text-xs font-mono-tech font-bold text-[#BE93FD] hover:text-[#FF6F91] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View all full-stack web app services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#FF6F91]" />
                <span>Modern Institutional & Brand Websites</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Accessible, mobile-first design styled with Tailwind CSS tokens</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Sub-second page loading speeds with optimized asset bundling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0" />
                  <span>Interactive inquiry forms with instant email and webhook notifications</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/contact"
                className="text-xs font-mono-tech font-bold text-[#BE93FD] hover:text-[#FF6F91] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Consult on your Gandhinagar web platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: E-commerce Development */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <ShoppingBag className="w-4 h-4 text-[#FF6F91]" />
          <span>Transactional Systems</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          E-commerce Development
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          Building high-performance e-commerce applications requires scalable checkout funnels and secure transaction handling. I build tailored online stores that avoid the slow speeds and rigid constraints of pre-built CMS plugins.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-base text-white mb-2">Custom Cart & Checkout</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Optimized multi-step or single-page checkout flows designed to minimize cart abandonment and accelerate user conversion.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-base text-white mb-2">Payment Gateways</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Flawless integration with Razorpay, Stripe, and modern UPI endpoints with automated webhook verification and receipt triggers.
            </p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <h4 className="font-display font-bold text-base text-white mb-2">Order Management</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Real-time inventory decrementing, customer order history lookups, and administrative order status tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Technical SEO & Performance */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <Search className="w-4 h-4 text-[#FF6F91]" />
          <span>Core Web Vitals & Search Authority</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Technical SEO & Performance
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
          In competitive technology markets, search engines prioritize fast, accessible, and semantically structured web pages. Every application is optimized for Google Core Web Vitals, rich snippet eligibility, and Answer Engine Optimization (AEO).
        </p>

        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#BE93FD]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono-tech text-xs text-[#BE93FD] font-bold uppercase tracking-wider">
              TECHNICAL GUIDE
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Single-Page Application Technical SEO in React 19 & Vite
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Explore my comprehensive guide detailing dynamic metadata injection, Schema.org JSON-LD graph generation, and server edge routing.
            </p>
          </div>
          <Link
            to="/articles/technical-seo-react-vite"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-[#BE93FD]/40 text-white font-mono-tech font-bold text-xs hover:border-[#FF6F91] hover:bg-[#BE93FD]/10 transition-all shrink-0"
          >
            <span>View Technical SEO Guide</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#BE93FD]" />
          </Link>
        </div>
      </section>

      {/* Section 6: How I Work With Gandhinagar Clients */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <GitBranch className="w-4 h-4 text-[#FF6F91]" />
          <span>Agile Milestones & Delivery Protocol</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          How I Work With Gandhinagar Clients
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
          Engaging an independent full-stack developer gives Gandhinagar startups direct technical accountability without agency overhead. Here is my structured 5-stage project lifecycle:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-[#BE93FD] font-black">01</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Architecture Planning</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Defining database schemas, REST endpoints, UI wireframes, and project completion criteria.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-[#D65DB1] font-black">02</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Design System</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Building responsive Tailwind CSS components, color variables, and interactive UI states.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-[#FF6F91] font-black">03</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">API & Frontend Build</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Engineering Express controllers, MongoDB models, JWT token handling, and React state connections.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-purple-400 font-black">04</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Testing & Security</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rigorous API endpoint validation, Lighthouse performance scoring, and vulnerability mitigation.
              </p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono-tech text-xl text-emerald-400 font-black">05</span>
              <h4 className="font-display font-bold text-sm text-white mt-2 mb-1">Cloud Deployment</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Live Vercel or Docker container release with full Git repository handover and technical documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Frequently Asked Questions */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase text-[#BE93FD] mb-2">
          <HelpCircle className="w-4 h-4 text-[#FF6F91]" />
          <span>Direct & Factual Answers</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
          Clear answers about my full-stack MERN expertise, remote collaboration workflows, and deliverables for Gandhinagar clients.
        </p>

        <div className="space-y-3">
          {GANDHINAGAR_FAQS.map((faq, idx) => {
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BE93FD]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-[#FF6F91]" />
            <span>Ready To Build?</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Start a Web Development Project
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
            Looking for a dedicated Full-Stack MERN developer to engineer a high-performance web application, corporate portal, or e-commerce solution for your Gandhinagar organization? Let's connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(214,93,177,0.5)] hover:scale-105 transition-all duration-300"
            >
              <span>Request a Project Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/ahmedabad-web-developer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full glass-card border border-white/20 text-gray-200 font-mono-tech font-bold text-xs hover:border-[#BE93FD] hover:text-white transition-all duration-300"
            >
              <span>Explore Ahmedabad Services</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#BE93FD]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
