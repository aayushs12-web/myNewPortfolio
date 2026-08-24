import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Layers,
  Target,
  ChevronLeft,
  ChevronRight,
  Code2,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import photo from "../assets/p.webp";

// Card 01 Data - EXPERIENCE Slides
const experienceSlides = [
  {
    id: 1,
    title: "Fresher",
    subtitle: "Real-World Project Focus",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=75&w=600&auto=format&fit=crop",
    description: "Building production-ready MERN projects, mastering clean component architecture, RESTful API design, and continuous learning.",
  },
  {
    id: 2,
    title: "Full-Stack Dev",
    subtitle: "MERN & Microservices",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=75&w=600&auto=format&fit=crop",
    description: "Developing scalable backends with Node/Express/MongoDB, paired with high-performance React 19 glassmorphism interfaces.",
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    subtitle: "Docker & Deployment",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=75&w=600&auto=format&fit=crop",
    description: "Containerizing services with Docker, deploying to AWS Cloud servers, and establishing automated CI/CD GitHub workflows.",
  },
];

// Card 02 Data - SPECIALTY Slides
const specialtySlides = [
  {
    id: 1,
    title: "MERN Stack",
    subtitle: "Core Tech Ecosystem",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=75&w=600&auto=format&fit=crop",
    skills: ["MongoDB & Mongoose", "Express.js Framework", "React 19 & Redux", "Node.js Asynchronous Runtime"],
  },
  {
    id: 2,
    title: "Styling & UI Systems",
    subtitle: "Modern Responsive CSS",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=75&w=600&auto=format&fit=crop",
    skills: ["Tailwind CSS (v4)", "Bootstrap 5 Utilities", "Framer Motion 3D", "Vanilla CSS Design Tokens"],
  },
  {
    id: 3,
    title: "APIs & Backend",
    subtitle: "Backend & Integrations",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=75&w=600&auto=format&fit=crop",
    skills: ["RESTful API Engineering", "FastAPI Integration", "JWT & OAuth Security", "Thunder Client API Testing"],
  },
];

// Card 03 Data - FOCUS Slides
const focusSlides = [
  {
    id: 1,
    title: "Performance & UX",
    subtitle: "Speed & Fluid Motion",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=75&w=600&auto=format&fit=crop",
    highlights: ["Lighthouse 100/100 Scores", "Fast-Loading Responsive UI", "Accessibility (a11y) Standards", "Smooth Micro-Animations"],
  },
  {
    id: 2,
    title: "Architecture",
    subtitle: "Clean & Maintainable",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=75&w=600&auto=format&fit=crop",
    highlights: ["Modular Code Base", "Scalable Database Schema", "Component Reusability", "Optimized Data Flow"],
  },
  {
    id: 3,
    title: "Product Delivery",
    subtitle: "Concept to Production",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=75&w=600&auto=format&fit=crop",
    highlights: ["Intuitive User Flows", "Robust Error Handling", "Production Cloud Deployment", "Continuous Maintenance"],
  },
];

export default function About() {
  const navigate = useNavigate();
  const [expIdx, setExpIdx] = useState(0);
  const [specIdx, setSpecIdx] = useState(0);
  const [focusIdx, setFocusIdx] = useState(0);

  function scrollToContact() {
    navigate("/contact");
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="about"
      aria-label="About Aayush Sharma, Background and Technical Specialties"
      className="relative w-full py-10 sm:py-16 px-4 sm:px-8 overflow-hidden text-white font-sans"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* ================= TOP HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Profile Photo with Futuristic Glassmorphic Frame & Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl p-3.5 glass-card border-2 border-[#BE93FD]/50 shadow-[0_0_50px_rgba(190,147,253,0.35)] group">
              {/* Outer Decorative Glow Rings */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] opacity-40 blur-lg group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

              {/* Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20">
                <img
                  src={photo}
                  alt="Portrait photograph of Aayush Sharma, Full-Stack MERN Developer"
                  loading="lazy"
                  width="384"
                  height="480"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0814] via-transparent to-transparent opacity-75" />

                {/* Floating Status Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-card border border-[#BE93FD]/40 backdrop-blur-xl flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF6F91] animate-ping" />
                  <span className="font-mono-tech text-xs text-[#BE93FD] font-bold uppercase tracking-wider">
                    Pali, Rajasthan • Open to Work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Big Heading & Requested Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase w-fit">
              <Sparkles className="w-4 h-4 text-[#FF6F91]" />
              <span>ABOUT ME</span>
            </div>

            {/* Big Name & Title */}
            <div>
              <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
                AAYUSH <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">SHARMA</span>
              </h2>
              <p className="font-display font-extrabold text-2xl sm:text-3xl text-[#BE93FD] mt-2 tracking-wide uppercase">
                MERN STACK DEVELOPER
              </p>
            </div>

            <div className="h-0.5 w-28 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] my-2 shadow-[0_0_12px_#D65DB1]" />

            {/* Factual, Authentic Bio Paragraphs */}
            <div className="space-y-3 text-gray-200 text-sm sm:text-base leading-relaxed">
              <p>
                My journey into software engineering started with curiosity about how complex web applications function behind the scenes. That curiosity evolved into hands-on development across the JavaScript and Node.js ecosystem, building full-stack projects from ground up using React, Express, MongoDB, and modern styling tools.
              </p>
              <p>
                I learn by building real projects — breaking problems down into modular components, engineering secure REST APIs, and refining user interfaces for speed and usability. Based in Pali, Rajasthan, I focus on delivering clean, maintainable code for local client projects and remote engineering collaborations.
              </p>
              <p className="text-gray-300 font-medium italic text-xs sm:text-sm border-l-2 border-[#BE93FD] pl-3">
                "Committed to building thoughtful, scalable web software through continuous learning, clean architecture, and practical engineering."
              </p>
            </div>

            {/* Code Snippet Pill with Location Info */}
            <div className="p-4 rounded-2xl glass-card border border-[#BE93FD]/30 font-mono-tech text-xs text-gray-300 mt-2">
              <span className="text-[#FF6F91] font-bold">const</span> developer = {"{"}{" "}
              <span className="text-[#BE93FD]">name</span>: <span className="text-emerald-400">'Aayush Sharma'</span>,{" "}
              <span className="text-[#BE93FD]">specialization</span>: <span className="text-emerald-400">'MERN Stack'</span>,{" "}
              <span className="text-[#BE93FD]">location</span>: <span className="text-emerald-400">'Pali, Rajasthan, India'</span>{" "}{"}"};
            </div>
          </motion.div>
        </div>

        {/* ================= 3 CARDS ROW WITH MATCHING DESIGN & LANDSCAPE SLIDERS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {/* CARD 01 - EXPERIENCE */}
          <div className="relative rounded-3xl glass-card border-2 border-[#BE93FD]/60 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden group hover:border-[#FF6F91] transition-all duration-300">
            {/* Arrows */}
            <button
              onClick={() => setExpIdx((prev) => (prev - 1 + experienceSlides.length) % experienceSlides.length)}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-card border border-[#BE93FD]/50 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-110 transition-all cursor-pointer shadow-lg"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setExpIdx((prev) => (prev + 1) % experienceSlides.length)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-card border border-[#BE93FD]/50 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-110 transition-all cursor-pointer shadow-lg"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech font-extrabold text-sm text-[#FF6F91]">01</span>
                  <span className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#BE93FD]">
                    EXPERIENCE
                  </span>
                </div>
                <div className="p-2 rounded-xl glass-card border border-[#BE93FD]/40 text-[#BE93FD]">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>

              <div className="px-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={experienceSlides[expIdx].id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-black text-2xl text-white mb-0.5">
                      {experienceSlides[expIdx].title}
                    </h3>
                    <p className="font-mono-tech text-[10px] text-[#BE93FD] mb-2.5 font-bold uppercase">
                      {experienceSlides[expIdx].subtitle}
                    </p>

                    <p className="text-xs text-gray-300 leading-relaxed mb-2 min-h-[55px]">
                      {experienceSlides[expIdx].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dynamic Scenic Landscape Image Backdrop */}
            <div className="mt-4 -mx-6 -mb-6 h-32 relative overflow-hidden rounded-b-3xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={experienceSlides[expIdx].id}
                  src={experienceSlides[expIdx].image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover filter contrast-110 brightness-90"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0814] via-[#0D0814]/30 to-transparent" />
            </div>
          </div>

          {/* CARD 02 - SPECIALTY (Matching Layout & Slide Feature) */}
          <div className="relative rounded-3xl glass-card border-2 border-[#BE93FD]/60 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden group hover:border-[#FF6F91] transition-all duration-300">
            {/* Arrows */}
            <button
              onClick={() => setSpecIdx((prev) => (prev - 1 + specialtySlides.length) % specialtySlides.length)}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-card border border-[#BE93FD]/50 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-110 transition-all cursor-pointer shadow-lg"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSpecIdx((prev) => (prev + 1) % specialtySlides.length)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-card border border-[#BE93FD]/50 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-110 transition-all cursor-pointer shadow-lg"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech font-extrabold text-sm text-[#FF6F91]">02</span>
                  <span className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#BE93FD]">
                    SPECIALTY
                  </span>
                </div>
                <div className="p-2 rounded-xl glass-card border border-[#BE93FD]/40 text-[#BE93FD]">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div className="px-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={specialtySlides[specIdx].id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-black text-2xl text-white mb-0.5">
                      {specialtySlides[specIdx].title}
                    </h3>
                    <p className="font-mono-tech text-[10px] text-[#BE93FD] mb-2.5 font-bold uppercase">
                      {specialtySlides[specIdx].subtitle}
                    </p>

                    <ul className="space-y-1.5 text-xs text-gray-200 font-medium min-h-[55px]">
                      {specialtySlides[specIdx].skills.map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F91]" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dynamic Scenic Tech Image Backdrop */}
            <div className="mt-4 -mx-6 -mb-6 h-32 relative overflow-hidden rounded-b-3xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={specialtySlides[specIdx].id}
                  src={specialtySlides[specIdx].image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover filter contrast-110 brightness-90"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0814] via-[#0D0814]/30 to-transparent" />
            </div>
          </div>

          {/* CARD 03 - FOCUS (Matching Layout & Slide Feature) */}
          <div className="relative rounded-3xl glass-card border-2 border-[#BE93FD]/60 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden group hover:border-[#FF6F91] transition-all duration-300">
            {/* Arrows */}
            <button
              onClick={() => setFocusIdx((prev) => (prev - 1 + focusSlides.length) % focusSlides.length)}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-card border border-[#BE93FD]/50 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-110 transition-all cursor-pointer shadow-lg"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFocusIdx((prev) => (prev + 1) % focusSlides.length)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass-card border border-[#BE93FD]/50 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-110 transition-all cursor-pointer shadow-lg"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech font-extrabold text-sm text-[#FF6F91]">03</span>
                  <span className="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#BE93FD]">
                    FOCUS
                  </span>
                </div>
                <div className="p-2 rounded-xl glass-card border border-[#BE93FD]/40 text-[#BE93FD]">
                  <Target className="w-4 h-4" />
                </div>
              </div>

              <div className="px-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={focusSlides[focusIdx].id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display font-black text-2xl text-white mb-0.5">
                      {focusSlides[focusIdx].title}
                    </h3>
                    <p className="font-mono-tech text-[10px] text-[#BE93FD] mb-2.5 font-bold uppercase">
                      {focusSlides[focusIdx].subtitle}
                    </p>

                    <ul className="space-y-1.5 text-xs text-gray-200 font-medium min-h-[55px]">
                      {focusSlides[focusIdx].highlights.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F91]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dynamic Scenic Tech Image Backdrop */}
            <div className="mt-4 -mx-6 -mb-6 h-32 relative overflow-hidden rounded-b-3xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={focusSlides[focusIdx].id}
                  src={focusSlides[focusIdx].image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover filter contrast-110 brightness-90"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0814] via-[#0D0814]/30 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ================= ENGINEERING PRINCIPLES SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pt-6 border-t border-white/10 flex flex-col items-center"
        >
          <div className="text-center max-w-3xl mx-auto mb-8 px-4 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>HOW I BUILD SOFTWARE</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              ENGINEERING <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">PRINCIPLES</span>
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-2xl text-center">
              Core technical practices and standards applied across every web application and backend system I build.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col gap-2.5 hover:border-[#FF6F91] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center border border-[#BE93FD]/30">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Reusable Component Architecture</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Building modular React components with isolated state, predictable props, and clean separation between UI and business logic.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col gap-2.5 hover:border-[#FF6F91] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF6F91]/15 text-[#FF6F91] flex items-center justify-center border border-[#FF6F91]/30">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Semantic HTML & Accessibility</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Writing standards-compliant, accessible markup for optimal SEO crawling, search engine clarity, and assistive technologies.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col gap-2.5 hover:border-[#FF6F91] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#D65DB1]/15 text-[#D65DB1] flex items-center justify-center border border-[#D65DB1]/30">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Mobile-First & Responsive UI</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Designing fluid, responsive interfaces using Tailwind CSS design tokens that render seamlessly across mobile, tablet, and desktop viewports.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col gap-2.5 hover:border-[#FF6F91] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#BE93FD]/15 text-[#BE93FD] flex items-center justify-center border border-[#BE93FD]/30">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Maintainable Code & Git Hygiene</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Maintaining clean repository structures, clear commit conventions, linting standards, and well-organized directory patterns.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col gap-2.5 hover:border-[#FF6F91] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF6F91]/15 text-[#FF6F91] flex items-center justify-center border border-[#FF6F91]/30">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Secure Configuration & Auth</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Safely isolating environment variables (`.env`), validating user inputs, and implementing secure JWT token authentication.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[#BE93FD]/30 flex flex-col gap-2.5 hover:border-[#FF6F91] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#D65DB1]/15 text-[#D65DB1] flex items-center justify-center border border-[#D65DB1]/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-base text-white">Structured REST APIs & Performance</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Engineering modular Express controllers, standardized JSON response structures, asset compression, and performance optimization.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= NEW CTA BANNER (Single Primary Button) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl glass-card border border-[#BE93FD]/40 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Background Accent Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#BE93FD]/15 via-[#FF6F91]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Header */}
            <div className="text-center lg:text-left space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-[#FF6F91]/40 text-[#FF6F91] text-[11px] font-mono-tech font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LET'S CONNECT</span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
                LET'S BUILD <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">SOMETHING GREAT</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm font-medium pt-1">
                Have an exciting project, full-time role, or innovative web application idea? Let's turn it into a high-performance digital product together.
              </p>
            </div>

            <div className="flex items-center justify-center w-full lg:w-auto shrink-0">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-4 px-9 rounded-2xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,111,145,0.4)] hover:shadow-[0_0_35px_rgba(255,111,145,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
