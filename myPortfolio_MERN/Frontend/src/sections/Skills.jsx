import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Database, Cloud, Layers, Terminal } from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa6";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiKubernetes,
  SiNextdotjs,
  SiRedis,
  SiGithubactions,
} from "react-icons/si";

// Category Tabs
const categories = [
  { id: "all", label: "ALL TECH", icon: Layers },
  { id: "frontend", label: "FRONTEND", icon: Code2 },
  { id: "backend", label: "BACKEND", icon: Database },
  { id: "devops", label: "DEVOPS & CLOUD", icon: Cloud },
];

// STRICT 18 SKILLS LIST ONLY
const skillsData = [
  // FRONTEND
  { name: "HTML5", category: "frontend", icon: FaHtml5, color: "text-[#E34F26]" },
  { name: "CSS3", category: "frontend", icon: FaCss3Alt, color: "text-[#1572B6]" },
  { name: "JAVASCRIPT", category: "frontend", icon: FaJs, color: "text-[#F7DF1E]" },
  { name: "REACT JS", category: "frontend", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "NEXT JS", category: "frontend", icon: SiNextdotjs, color: "text-white" },
  { name: "TAILWIND CSS", category: "frontend", icon: SiTailwindcss, color: "text-[#38BDF8]" },
  { name: "BOOTSTRAP", category: "frontend", icon: FaBootstrap, color: "text-[#7952B3]" },

  // BACKEND
  { name: "NODE JS", category: "backend", icon: FaNodeJs, color: "text-[#5FA04E]" },
  { name: "EXPRESS JS", category: "backend", icon: SiExpress, color: "text-gray-200" },
  { name: "MONGODB", category: "backend", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "REDIS", category: "backend", icon: SiRedis, color: "text-[#DC382D]" },
  { name: "APIS", category: "backend", icon: Terminal, color: "text-[#00E5FF]" },

  // DEVOPS & CLOUD
  { name: "DOCKER", category: "devops", icon: FaDocker, color: "text-[#2496ED]" },
  { name: "Kubernetes(K8S)", category: "devops", icon: SiKubernetes, color: "text-[#326CE5]" },
  { name: "AWS", category: "devops", icon: FaAws, color: "text-[#FF9900]" },
  { name: "GIT", category: "devops", icon: FaGitAlt, color: "text-[#F05032]" },
  { name: "GITHUB", category: "devops", icon: FaGithub, color: "text-white" },
  { name: "GITHUB ACTION", category: "devops", icon: SiGithubactions, color: "text-[#2088FF]" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills =
    activeTab === "all" ? skillsData : skillsData.filter((s) => s.category === activeTab);

  // Duplicate list multiple times for seamless infinite slow scrolling
  const marqueeItems = [
    ...filteredSkills,
    ...filteredSkills,
    ...filteredSkills,
    ...filteredSkills,
    ...filteredSkills,
  ];

  return (
    <section id="skills" className="relative w-full py-10 sm:py-16 overflow-hidden">
      <div className="w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91]" />
            <span>TECHNICAL CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase"
          >
            MY TECH <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">ARSENAL</span>
          </motion.h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-3 sm:px-8">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl font-mono-tech text-[11px] sm:text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] shadow-[0_0_20px_rgba(214,93,177,0.4)] scale-105"
                    : "glass-card text-gray-300 hover:text-white hover:border-[#BE93FD]/50"
                }`}
              >
                <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= FULL-WIDTH EDGE-TO-EDGE MARQUEE ================= */}
        <div className="w-full relative py-8 sm:py-16 overflow-hidden">
          {/* Subtle Lightened Edge Fade Overlays (Desktop Only to prevent Mobile Blackouts) */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0D0814]/70 to-transparent z-20 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0D0814]/70 to-transparent z-20 pointer-events-none" />

          {/* Continuous Ultra-Slow Left-to-Right Moving Track */}
          <div className="flex overflow-hidden relative w-full py-4">
            <motion.div
              key={activeTab}
              initial={{ x: "-50%" }}
              animate={{ x: "0%" }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 75,
              }}
              className="flex items-center gap-8 sm:gap-20 shrink-0 pr-8 sm:pr-20"
            >
              {marqueeItems.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center gap-2 sm:gap-3 group/icon transition-transform duration-300 hover:scale-125 cursor-pointer shrink-0 py-2"
                  >
                    <div className="p-1.5 sm:p-2 bg-transparent transition-all duration-300">
                      <IconComp className={`w-12 h-12 sm:w-16 sm:h-16 ${item.color} filter drop-shadow-[0_0_16px_rgba(0,229,255,0.75)]`} />
                    </div>
                    <span className="font-mono-tech font-extrabold text-xs sm:text-base text-[#00E5FF] tracking-wider uppercase group-hover/icon:text-[#FF6F91] transition-colors whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
