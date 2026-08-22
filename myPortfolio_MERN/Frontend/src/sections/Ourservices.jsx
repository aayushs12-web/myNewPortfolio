import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  ArrowRight,
  Rotate3D,
  Cloud,
  CheckCircle2,
  ShoppingBag,
  Rocket,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  ShieldCheck,
  HelpCircle,
  GitBranch,
  FileText,
} from "lucide-react";

const services = [
  {
    id: "web",
    title: "Full-Stack MERN Web App",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop",
    description:
      "High-performance, full-stack web applications using MongoDB, Express, React 19, and Node.js with secure REST APIs.",
    buttonLabel: "Build App",
    tags: ["React 19", "Node.js", "MongoDB", "Express"],
    deliverables: [
      "RESTful API & Database Schema Design",
      "JWT & OAuth Authentication System",
      "Fast Client & Server-Side Rendering",
      "Clean Modular Code Base & Deployment",
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Websites",
    icon: ShoppingBag,
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop",
    description:
      "Custom, high-converting online stores with shopping carts, secure checkout gateways, order tracking, and product management.",
    buttonLabel: "Build Store",
    tags: ["Stripe / Payment", "Redux", "Cart System", "Dashboard"],
    deliverables: [
      "Secure Payment Gateway Integration",
      "Custom Shopping Cart & Checkout",
      "Admin Product & Order Management",
      "Optimized Conversion Funnel UI",
    ],
  },
  {
    id: "landing",
    title: "Landing Pages & UI/UX",
    icon: Rocket,
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=600&auto=format&fit=crop",
    description:
      "Pixel-perfect, high-converting landing pages built with fluid glassmorphism, responsive Tailwind CSS, and 3D micro-animations.",
    buttonLabel: "Design Landing Page",
    tags: ["Figma UI/UX", "Tailwind CSS", "Framer Motion", "3D Stage"],
    deliverables: [
      "Custom Modern Glassmorphism Theme",
      "Responsive Mobile-First Layouts",
      "High-Conversion Copy & CTA Buttons",
      "Micro-animations & Interactive Motion",
    ],
  },
  {
    id: "seo",
    title: "SEO & Performance Optimization",
    icon: Search,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    description:
      "Boosting search ranking, Lighthouse scores, speed optimization, technical SEO meta tags, and structured schema data.",
    buttonLabel: "Optimize Site",
    tags: ["Technical SEO", "Speed Boost", "Meta Tags", "Lighthouse 100"],
    deliverables: [
      "100/100 Google Lighthouse Audit",
      "Dynamic OpenGraph & Twitter Meta Tags",
      "Semantic HTML & Accessibility (a11y)",
      "Asset Compression & Lazy Loading",
    ],
  },
  {
    id: "devops",
    title: "Cloud DevOps & Containers",
    icon: Cloud,
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&auto=format&fit=crop",
    description:
      "Automating deployment pipelines with Docker containerization, Kubernetes orchestration, AWS Cloud infrastructure, and CI/CD.",
    buttonLabel: "Deploy Cloud System",
    tags: ["Docker", "Kubernetes", "AWS Cloud", "GitHub Actions"],
    deliverables: [
      "Containerized Production Builds",
      "CI/CD Workflow Automation",
      "Cloud Server & SSL Configuration",
      "Monitoring & Auto-Scaling Setup",
    ],
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Requirements & Planning",
    desc: "Defining project goals, technical scope, user journeys, data structures, and concrete development milestones.",
  },
  {
    step: "02",
    title: "UI / Component Design",
    desc: "Crafting modern, accessible user interfaces using Tailwind CSS design tokens and modular React components.",
  },
  {
    step: "03",
    title: "Full-Stack Development",
    desc: "Engineering frontend logic, Express.js REST APIs, MongoDB data models, and secure JWT authentication.",
  },
  {
    step: "04",
    title: "Testing & Optimization",
    desc: "Rigorous cross-device testing, API error handling validation, Lighthouse performance audit, and SEO metadata sync.",
  },
  {
    step: "05",
    title: "Deployment & Handoff",
    desc: "Deploying to production on Vercel or Docker with clean Git source code repository and setup documentation.",
  },
];

const clientDeliverables = [
  { title: "Responsive Frontend", desc: "Clean React 19 interface styled with modern Tailwind CSS tokens." },
  { title: "Backend REST API", desc: "Modular Express.js server architecture with structured controllers." },
  { title: "Database Integration", desc: "Mongoose database schemas, indexing, and input validation." },
  { title: "Secure Authentication", desc: "JSON Web Tokens (JWT) with password hashing and route guards." },
  { title: "Full Source Code Ownership", desc: "Complete Git repository with clear commit history and README." },
  { title: "Production Deployment", desc: "Live deployment on Vercel or containerized Docker configuration." },
  { title: "SEO Foundation & Meta", desc: "Semantic HTML, dynamic Open Graph tags, and sitemap indexing." },
  { title: "Post-Launch Handoff", desc: "Walkthrough of codebase, deployment steps, and basic support." },
];

const faqs = [
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in the MERN stack: MongoDB, Express.js, React 19, and Node.js. For styling and animations, I use Tailwind CSS and Framer Motion. For deployments, I work with Vercel, Docker, and GitHub Actions CI/CD.",
  },
  {
    q: "What is your typical project development workflow?",
    a: "Every project follows a structured 5-stage roadmap: Requirements Planning -> UI/Component Design -> Full-Stack Engineering -> Testing & Speed Optimization -> Cloud Deployment & Code Handoff.",
  },
  {
    q: "Do I receive complete source code ownership?",
    a: "Yes. Upon project completion, you receive full ownership of the Git repository, clean modular source code, asset files, and setup documentation.",
  },
  {
    q: "Do you handle hosting, domain setup, and deployment?",
    a: "Yes. I configure production deployments on platforms like Vercel or containerized Docker environments, including SSL security, environment variables, and custom domain linking.",
  },
  {
    q: "Are you available for freelance projects as well as full-time roles?",
    a: "Yes. I am available for freelance client projects, contract development, and open to full-time junior/entry-level Full-Stack Developer opportunities.",
  },
];

function ServiceCard({ service, isHovered, isAnyHovered, onMouseEnter, onMouseLeave }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onMouseLeave();
  };

  const handleCardClick = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;
    setIsFlipped(!isFlipped);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      navigate("/contact");
    } else {
      navigate("/contact");
    }
  };

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="relative w-full h-[460px] cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full rounded-3xl glass-card border transition-all duration-300 ${
          isHovered
            ? "border-[#FF6F91] shadow-[0_0_35px_rgba(255,111,145,0.4)]"
            : "border-[#BE93FD]/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
        }`}
      >
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden rounded-3xl"
        >
          <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-white/10 shrink-0">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0814] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3 p-2 rounded-xl glass-card border border-white/20 text-[#BE93FD]">
              <Icon className="w-5 h-5" />
            </div>
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
              {service.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono-tech px-2 py-0.5 rounded-md bg-[#0D0814]/80 border border-white/10 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start">
            <h3 className="font-display font-black text-xl text-white tracking-tight mb-2">
              {service.title}
            </h3>
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#BE93FD] hover:text-[#FF6F91] transition-colors"
            >
              <Rotate3D className="w-3.5 h-3.5" />
              <span>View Deliverables</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollToContact();
              }}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#BE93FD] to-[#D65DB1] text-[#0D0814] hover:scale-105 transition-transform shadow-md"
              aria-label={`Inquire about ${service.title}`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden rounded-3xl bg-[#160E22]/95 border border-[#FF6F91]/50"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-mono-tech uppercase text-[#FF6F91] tracking-wider font-bold">
                Key Scope & Deliverables
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
                aria-label="Flip back"
              >
                <Rotate3D className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-display font-bold text-lg text-white mb-3">{service.title}</h4>

            <ul className="space-y-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#BE93FD] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="text-xs text-gray-400 hover:text-white"
            >
              ← Back
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollToContact();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
            >
              {service.buttonLabel}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Ourservices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderHoveredId, setSliderHoveredId] = useState(null);
  const [gridHoveredId, setGridHoveredId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (sliderHoveredId === null) {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderHoveredId]);

  return (
    <section
      id="ourservices"
      aria-label="Web Development Services and Technical Deliverables"
      className="w-full py-16 sm:py-24 relative overflow-hidden flex flex-col items-center"
    >
      <div className="w-full relative z-10 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-12 px-4 sm:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>WHAT I OFFER & DELIVER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#BE93FD] tracking-tight uppercase"
          >
            PREMIUM <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">SERVICES</span>
          </motion.h2>

          <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] mt-3 mb-2 shadow-[0_0_12px_#D65DB1]" />

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-2 max-w-2xl text-center">
            Comprehensive web engineering services: full-stack MERN applications, e-commerce storefronts, responsive landing pages, SEO optimization, and containerized cloud deployments.
          </p>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isHovered={gridHoveredId === service.id}
                isAnyHovered={gridHoveredId !== null}
                onMouseEnter={() => setGridHoveredId(service.id)}
                onMouseLeave={() => setGridHoveredId(null)}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-8 mt-20">
          <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-2">
              <GitBranch className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>STRUCTURED PROCESS</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              PROJECT <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">WORKFLOW</span>
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-xl text-center">
              A transparent, 5-stage roadmap from initial concept to live cloud deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowSteps.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col justify-between hover:border-[#FF6F91] transition-all group"
              >
                <div>
                  <span className="font-mono-tech font-black text-2xl text-[#BE93FD] group-hover:text-[#FF6F91] transition-colors">
                    {item.step}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white mt-2 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 sm:px-8 mt-20">
          <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#BE93FD]" />
              <span>PROJECT DELIVERABLES</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              WHAT YOU <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">RECEIVE</span>
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-xl text-center">
              Every client project is delivered with complete source code, tested components, and production-ready setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {clientDeliverables.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-white/10 flex items-start gap-3 hover:border-[#BE93FD]/60 transition-colors"
              >
                <div className="p-2 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-4xl px-4 sm:px-8 mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>COMMON INQUIRIES</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              FREQUENTLY ASKED <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">QUESTIONS</span>
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 text-center">
              Answers to common questions regarding my tech stack, workflow, deliverables, and engagement availability.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-card border border-white/10 overflow-hidden transition-colors hover:border-[#BE93FD]/50"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
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
        </div>
      </div>
    </section>
  );
}
