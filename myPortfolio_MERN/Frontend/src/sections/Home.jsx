import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Download, ArrowRight, Mail, User, Briefcase, Code2, Smile } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import Hero3DViewer from "../components/Hero3DViewer";
import WhatIBuild from "../components/WhatIBuild";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/aayushs12-web" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/aayush-sharma-14b259409/" },
  { icon: Mail, label: "Email", href: "/contact" },
];

const stats = [
  { icon: User, value: "Fresher", label: "Open to Work" },
  { icon: Briefcase, value: "Full Stack", label: "MERN Focus" },
  { icon: Code2, value: "18+", label: "Tech Arsenal" },
  { icon: Smile, value: "Pali, RJ", label: "India & Remote" },
];

const roles = [
  "MERN Stack Developer",
  "Full-Stack Web Developer",
  "React & Node.js Engineer",
  "Web Developer in Pali, Rajasthan",
  "DevOps & Cloud Engineer",
];

const Home = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id, path) => {
    if (path) navigate(path);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Home and Developer Profile"
      className="min-h-screen w-full relative pt-24 sm:pt-28 pb-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Main Hero Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left Column: Text Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 1. ROTATING ROLES / TITLE (INCREASED SIZE, ABOVE GREETING) */}
          <div className="h-12 sm:h-14 flex items-center mb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="font-mono-tech font-extrabold text-xl sm:text-3xl md:text-4xl text-[#BE93FD] uppercase tracking-wider drop-shadow-[0_0_18px_rgba(190,147,253,0.5)]"
              >
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. COMBINED GREETING & NAME ON THE SAME LINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-extrabold text-2xl sm:text-4xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-6 drop-shadow-lg "
          >
            <span className="text-white">Hello, I'm <br /> </span>

            <span className="bg-gradient-to-r from-[#BE93FD] via-[#DCB0FF] to-[#FF6F91] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(190,147,253,0.5)] font-black">
              Aayush Sharma
            </span>
          </motion.h1>

          {/* Bio Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-body">
            Full-Stack MERN Developer based in Pali, Rajasthan, specializing in engineering modern web applications, scalable backend systems with Node.js and MongoDB, responsive React interfaces, and cloud-ready digital solutions for businesses in Rajasthan and clients worldwide.
          </p>

          {/* Horizontal Social Icons (No "CONNECT:" text label) */}
          <div className="flex items-center gap-3 mb-8">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 rounded-2xl glass-card border border-white/10 text-gray-300 hover:text-[#FF6F91] hover:border-[#BE93FD] hover:scale-110 hover:shadow-[0_0_20px_rgba(214,93,177,0.35)] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-9">
            {/* Download Resume Button */}
            <a
              href="/Resume.pdf"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(214,93,177,0.4)] hover:shadow-[0_0_40px_rgba(255,111,145,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </a>

            {/* View My Services Link */}
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("ourservices", "/services");
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full glass-card border border-[#BE93FD]/50 text-white font-display font-extrabold text-xs sm:text-sm tracking-wide hover:border-[#D65DB1] hover:bg-[#BE93FD]/15 transition-all duration-300 cursor-pointer"
            >
              <span>View My Services</span>
              <ArrowRight className="w-4 h-4 text-[#BE93FD]" />
            </a>
          </div>

          {/* Bottom Stats Glass Card */}
          <div className="w-full max-w-xl p-4 sm:p-5 rounded-3xl bg-[#160E22]/90 border border-[#BE93FD]/30 shadow-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {stats.map((st, i) => {
              const IconComp = st.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center text-center p-2 ${i !== stats.length - 1 ? "sm:border-r border-white/10" : ""
                    }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#231535] text-[#BE93FD] flex items-center justify-center mb-1.5 border border-[#BE93FD]/30">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-[#FDF7FF]">
                    {st.value}
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono-tech font-medium mt-0.5">
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: 3D Character Stage */}
        <motion.div
          className="lg:col-span-5 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Hero3DViewer />
        </motion.div>
      </div>

      {/* WHAT I BUILD Section */}
      <WhatIBuild />
    </section>
  );
});

export default Home;
