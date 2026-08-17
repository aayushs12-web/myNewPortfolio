import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
} from "lucide-react";

const services = [
  {
    id: "web",
    title: "Full-Stack MERN Web App",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop",
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

function ServiceCard({ service, isHovered, isAnyHovered, onMouseEnter, onMouseLeave }) {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const scrollToContact = () => {
    navigate("/contact");
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const IconComp = service.icon;

  // Uiverse Kamehame-ha Focus-Blur & Scale calculation
  let focusBlurClasses = "opacity-100 filter-none";
  if (isHovered) {
    focusBlurClasses = "z-40 opacity-100 filter-none border-[#FF6F91] shadow-[0_25px_60px_rgba(255,111,145,0.45)] scale-[1.04]";
  } else if (isAnyHovered) {
    focusBlurClasses = "opacity-40 scale-[0.95] border-[#BE93FD]/10";
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`perspective-1000 w-full h-[395px] sm:h-[415px] transition-all duration-400 ease-out ${focusBlurClasses}`}
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full glass-card rounded-3xl overflow-hidden border border-[#BE93FD]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer group flex flex-col justify-between"
      >
        {/* Front Side */}
        <div
          className={`w-full h-full flex flex-col justify-between ${
            isFlipped ? "pointer-events-none opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {/* Flip Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
            className="absolute top-3.5 right-3.5 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-[#BE93FD]/40 text-[#BE93FD] text-[10px] font-mono-tech font-bold uppercase hover:border-[#FF6F91] hover:bg-[#D65DB1]/30 transition-all cursor-pointer shadow-lg"
            title="Toggle Card Details"
          >
            <Rotate3D className="w-3.5 h-3.5 text-[#FF6F91]" />
            <span>DETAILS</span>
          </button>

          {/* Image Banner */}
          <div className="relative w-full h-40 sm:h-44 overflow-hidden border-b border-white/10">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0814] via-[#0D0814]/40 to-transparent" />

            <div className="absolute bottom-3 left-4 p-2.5 rounded-2xl glass-card border border-[#BE93FD]/50 text-[#BE93FD] group-hover:bg-[#BE93FD] group-hover:text-[#0D0814] group-hover:scale-110 transition-all duration-300 shadow-md">
              <IconComp className="w-5 h-5" />
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-6 flex flex-col justify-between gap-4 flex-1">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1.5 group-hover:text-[#BE93FD] transition-colors leading-snug">
                {service.title}
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-1">
                {service.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#845EC2]/20 border border-[#BE93FD]/30 text-[#BE93FD] font-mono-tech text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(214,93,177,0.35)] hover:shadow-[0_0_30px_rgba(255,111,145,0.65)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <span>{service.buttonLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Back Side (Flip Scope & Deliverables) */}
        {isFlipped && (
          <div
            className="absolute inset-0 w-full h-full p-5 sm:p-6 bg-[#160E22]/95 text-white flex flex-col justify-between backdrop-blur-xl"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <span className="font-mono-tech text-[11px] text-[#BE93FD] font-bold uppercase">
                  DELIVERABLES & SCOPE
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono-tech text-gray-200 hover:text-white hover:bg-white/20 transition-colors"
                >
                  ← BACK
                </button>
              </div>

              <h4 className="font-display font-bold text-base text-white mb-2.5">
                Key Scope & Features
              </h4>

              <ul className="space-y-2 text-xs text-gray-200">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6F91] shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#BE93FD] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-lg"
            >
              <span>BOOK THIS SERVICE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderHoveredId, setSliderHoveredId] = useState(null);
  const [gridHoveredId, setGridHoveredId] = useState(null);

  // Auto-rotate 3.5 seconds left to right
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section
      id="ourservices"
      className="relative w-full py-10 sm:py-16 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 px-4 sm:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>WHAT I OFFER</span>
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

          <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
            High-performance web applications, custom e-commerce platforms, SEO optimization, and cloud DevOps engineering built to scale.
          </p>
        </div>

        {/* FULL-WIDTH 3D CURVE SLIDER (Touching left & right viewport edges) */}
        <div className="w-full relative py-8 flex flex-col items-center justify-center overflow-hidden">
          {/* Edge Blur Curtain Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#0D0814] via-[#0D0814]/90 to-transparent z-40 pointer-events-none backdrop-blur-[4px]" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#0D0814] via-[#0D0814]/90 to-transparent z-40 pointer-events-none backdrop-blur-[4px]" />

          {/* Navigation Control Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-50 p-3.5 sm:p-4 rounded-full glass-card border border-[#BE93FD]/40 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-115 hover:border-[#D65DB1] transition-all duration-300 cursor-pointer shadow-2xl"
            aria-label="Previous Service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-50 p-3.5 sm:p-4 rounded-full glass-card border border-[#BE93FD]/40 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-115 hover:border-[#D65DB1] transition-all duration-300 cursor-pointer shadow-2xl"
            aria-label="Next Service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Single-Line 3D Arc Container */}
          <div className="w-full h-[480px] sm:h-[510px] md:h-[530px] relative flex items-center justify-center perspective-2000 py-4">
            {services.map((service, index) => {
              const count = services.length;
              let offset = (index - activeIndex) % count;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              if (Math.abs(offset) > 2) return null;

              const isCenter = offset === 0;

              const translateX = offset * 310;
              const translateZ = isCenter ? 70 : -Math.abs(offset) * 190;
              const rotateY = offset * -32;
              const rotateX = isCenter ? 0 : 4;
              const scale = isCenter ? 1.08 : 0.84 - Math.abs(offset) * 0.1;
              const opacity = isCenter ? 1 : 0.62 - Math.abs(offset) * 0.18;
              const zIndex = 50 - Math.abs(offset) * 10;

              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  initial={false}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    rotateX: rotateX,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: zIndex,
                  }}
                  className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-[290px] sm:w-[350px]"
                >
                  <ServiceCard
                    service={service}
                    isHovered={sliderHoveredId === service.id}
                    isAnyHovered={sliderHoveredId !== null}
                    onMouseEnter={() => setSliderHoveredId(service.id)}
                    onMouseLeave={() => setSliderHoveredId(null)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Progress Indicators */}
          <div className="flex items-center gap-2 mt-4 z-40">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === activeIndex
                    ? "w-9 bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] shadow-[0_0_12px_#FF6F91]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 5-CARD RESPONSIVE GRID SHOWCASING ALL 5 SERVICES DIRECTLY BELOW THE SLIDER */}
        <div className="w-full max-w-7xl px-4 sm:px-8 mt-8">
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
      </div>
    </section>
  );
}
