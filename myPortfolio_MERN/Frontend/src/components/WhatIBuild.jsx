import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  BarChart3,
  Server,
  Lock,
  CloudUpload,
  RefreshCw,
  Cloud,
  Palette,
  Box,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const buildItems = [
  {
    id: "mern",
    title: "Modern MERN Web Applications",
    desc: "Full-stack web apps using MongoDB, Express, React and Node.js.",
    icon: Code2,
    badge: "Full-Stack System",
  },
  {
    id: "responsive",
    title: "Responsive & Scalable Websites",
    desc: "Pixel-perfect, mobile-first designs that scale seamlessly.",
    icon: Smartphone,
    badge: "Mobile-First UX",
  },
  {
    id: "dashboards",
    title: "High-Performance Dashboards",
    desc: "Real-time analytics, insights and visualizations that drive decisions.",
    icon: BarChart3,
    badge: "Analytics Engine",
  },
  {
    id: "restapi",
    title: "REST APIs & Backend Systems",
    desc: "Robust, secure and well-structured APIs for any application.",
    icon: Server,
    badge: "Microservices Architecture",
  },
  {
    id: "auth",
    title: "Authentication & Secure Apps",
    desc: "JWT, OAuth, RBAC and industry-standard security practices.",
    icon: Lock,
    badge: "Enterprise Security",
  },
  {
    id: "devops",
    title: "DevOps-Powered Deployments",
    desc: "Automated deployments with zero-downtime and reliability.",
    icon: CloudUpload,
    badge: "Cloud Automation",
  },
  {
    id: "cicd",
    title: "CI/CD Pipelines",
    desc: "Automate, test and deliver code with confidence and speed.",
    icon: RefreshCw,
    badge: "Continuous Delivery",
  },
  {
    id: "cloud",
    title: "Cloud-Ready Applications",
    desc: "Deploy on cloud platforms for global scalability and performance.",
    icon: Cloud,
    badge: "Cloud Scale",
  },
  {
    id: "uiux",
    title: "Interactive UI/UX Experiences",
    desc: "Beautiful, accessible and engaging interfaces users love.",
    icon: Palette,
    badge: "Sora & Glassmorphism",
  },
  {
    id: "3d",
    title: "3D & Animated Web Experiences",
    desc: "Bringing ideas to life with 3D, animations and smooth interactions.",
    icon: Box,
    badge: "Three.js & Motion",
  },
];

export default function WhatIBuild() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridHoveredId, setGridHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth continuous transition every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % buildItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % buildItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + buildItems.length) % buildItems.length);
  };

  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      <div className="w-full relative z-10 flex flex-col items-center">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 px-4 sm:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>SOLUTIONS & CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#BE93FD] tracking-tight uppercase"
          >
            WHAT I <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">BUILD</span>
          </motion.h2>

          <div className="h-0.5 w-24 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] mt-3 mb-2 shadow-[0_0_12px_#D65DB1]" />
        </div>

        {/* FULL-WIDTH 3D CURVE CAROUSEL */}
        <div className="w-full relative py-8 my-4 flex flex-col items-center justify-center overflow-hidden">
          {/* Edge Blur Curtain Overlays (Hidden on Mobile to eliminate black side bars) */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-44 bg-gradient-to-r from-[#0D0814] via-[#0D0814]/90 to-transparent z-40 pointer-events-none backdrop-blur-[4px]" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-44 bg-gradient-to-l from-[#0D0814] via-[#0D0814]/90 to-transparent z-40 pointer-events-none backdrop-blur-[4px]" />

          {/* Navigation Control Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-10 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-4 rounded-full glass-card border border-[#BE93FD]/40 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-115 hover:border-[#D65DB1] transition-all duration-300 cursor-pointer shadow-2xl"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-10 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-4 rounded-full glass-card border border-[#BE93FD]/40 text-[#BE93FD] hover:text-[#FF6F91] hover:scale-115 hover:border-[#D65DB1] transition-all duration-300 cursor-pointer shadow-2xl"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3D Edge-to-Edge Stage Container */}
          <div className="w-full h-[290px] sm:h-[320px] relative flex items-center justify-center perspective-2000 overflow-hidden">
            {buildItems.map((item, index) => {
              const count = buildItems.length;
              let offset = (index - activeIndex) % count;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;

              if (Math.abs(offset) > 3) return null;

              const isCenter = offset === 0;
              const Icon = item.icon;

              const translateX = offset * (isMobile ? 225 : 290);
              const translateZ = isCenter ? 70 : -Math.abs(offset) * (isMobile ? 120 : 180);
              const rotateY = offset * (isMobile ? -20 : -32);
              const rotateX = isCenter ? 0 : 4;
              const scale = isCenter ? (isMobile ? 1.02 : 1.15) : (isMobile ? 0.76 : 0.82 - Math.abs(offset) * 0.1);
              const opacity = isCenter ? 1 : (isMobile ? 0.25 : 0.6 - Math.abs(offset) * 0.18);
              const zIndex = 50 - Math.abs(offset) * 10;

              return (
                <motion.div
                  key={item.id}
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
                  className={`absolute top-1/2 -translate-y-1/2 w-[calc(100vw-3.8rem)] max-w-[320px] sm:w-[350px] p-4 sm:p-7 rounded-3xl cursor-pointer transition-colors duration-500 border ${
                    isCenter
                      ? "glass-card border-[#FF6F91] shadow-[0_25px_60px_rgba(255,111,145,0.45)] bg-[#1A102A]/90 backdrop-blur-2xl"
                      : "glass-card border-[#BE93FD]/30 bg-[#140C20]/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                        isCenter
                          ? "bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] border-white shadow-[0_0_20px_rgba(255,111,145,0.5)] scale-110"
                          : "bg-[#845EC2]/20 text-[#BE93FD] border-[#BE93FD]/30"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#160E22] border border-[#BE93FD]/30 text-[#BE93FD] font-mono-tech text-[9px] sm:text-[10px] font-bold uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-base sm:text-xl text-white mb-1.5 sm:mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Progress Indicators */}
          <div className="flex items-center gap-2 mt-4 z-40">
            {buildItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === activeIndex
                    ? "w-9 bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] shadow-[0_0_12px_#FF6F91]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 10-Card Responsive Grid with Uiverse Focus-Blur hover effect */}
        <div className="w-full max-w-7xl px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mt-6">
          {buildItems.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = gridHoveredId === item.id;
            const isAnyHovered = gridHoveredId !== null;

            let cardEffectClasses = "scale-100 opacity-100 filter-none border-[#BE93FD]/20";
            if (isHovered) {
              cardEffectClasses = "scale-[1.06] z-30 opacity-100 filter-none border-[#FF6F91] shadow-[0_20px_45px_rgba(255,111,145,0.4)]";
            } else if (isAnyHovered) {
              cardEffectClasses = "scale-[0.95] opacity-40 border-[#BE93FD]/10";
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                onMouseEnter={() => setGridHoveredId(item.id)}
                onMouseLeave={() => setGridHoveredId(null)}
                className={`glass-card p-5 sm:p-6 rounded-3xl transition-all duration-400 ease-out flex flex-col items-center text-center justify-between min-h-[220px] relative group cursor-pointer ${cardEffectClasses}`}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#845EC2]/20 via-[#D65DB1]/20 to-[#FF6F91]/20 border border-[#BE93FD]/40 text-[#BE93FD] flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-[#BE93FD] group-hover:to-[#FF6F91] group-hover:text-[#0D0814] group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(214,93,177,0.25)]">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white mb-2 leading-snug group-hover:text-[#BE93FD] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-body">
                  {item.desc}
                </p>

                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] mt-4 opacity-50 group-hover:opacity-100 group-hover:w-20 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
