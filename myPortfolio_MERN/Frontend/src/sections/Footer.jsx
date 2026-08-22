import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Quote, Code2 } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aayush-sharma-14b259409/", icon: FaLinkedinIn },
  { name: "GitHub", href: "https://github.com/aayushs12-web", icon: FaGithub },
];

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative z-10 text-white pt-0 overflow-hidden bg-transparent">
      
      {/* TOP EDGE WAVE (ACCURATE TO REFERENCE IMAGE CURVATURE) */}
      <div className="w-full overflow-hidden leading-none relative z-20 pointer-events-none -mb-[1px]">
        <svg
          className="relative block w-full h-[70px] sm:h-[110px] md:h-[140px]"
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Glowing Accent Stroke Gradient using site color palette */}
            <linearGradient id="footer-wave-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BE93FD" />
              <stop offset="50%" stopColor="#D65DB1" />
              <stop offset="100%" stopColor="#FF6F91" />
            </linearGradient>
          </defs>

          {/* Solid Footer Background Wave Fill (#0A0612) */}
          <path
            d="M 0,50 C 300,95 500,80 720,50 C 940,20 1180,10 1440,35 L 1440,140 L 0,140 Z"
            fill="#0A0612"
          />

          {/* Glowing Wave Top Boundary Accent Stroke */}
          <path
            d="M 0,50 C 300,95 500,80 720,50 C 940,20 1180,10 1440,35"
            stroke="url(#footer-wave-glow)"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* FOOTER CONTAINER BODY WITH SITE FOOTER COLOR */}
      <div className="w-full bg-[#0A0612] relative z-20 pb-12">
        {/* BACKGROUND DESIGN: GRID PATTERN & AMBIENT NEON GLOW ORBS */}
        <div className="absolute inset-0 bg-[radial-gradient(#BE93FD_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#BE93FD]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#FF6F91]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-20 flex flex-col items-center text-center pt-4">
          
          {/* Centered Brand / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Sparkles Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase shadow-[0_0_15px_rgba(190,147,253,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>PORTFOLIO ARCHITECTURE</span>
            </div>

            {/* Centered Name */}
            <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase mt-1">
              Aayush <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">Sharma</span>
            </div>

            {/* Title: FULL STACK DEVELOPER */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-mono-tech font-bold text-[#BE93FD] uppercase tracking-widest shadow-inner">
              <Code2 className="w-4 h-4 text-[#D65DB1]" />
              <span>FULL STACK DEVELOPER</span>
            </div>
          </motion.div>

          {/* Centered Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="my-8 max-w-xl w-full p-6 sm:p-7 rounded-3xl glass-card border border-[#BE93FD]/30 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] group hover:border-[#D65DB1]/60 transition-all duration-500"
          >
            <Quote className="w-7 h-7 text-[#BE93FD]/30 absolute top-3 left-4 -scale-x-100" />
            <p className="font-display italic text-base sm:text-lg text-gray-200 leading-relaxed relative z-10 px-4 font-light">
              "Preparation creates the path to opportunity."
            </p>
            <Quote className="w-7 h-7 text-[#FF6F91]/30 absolute bottom-3 right-4" />
          </motion.div>

          {/* Semantic Internal Navigation Links for AEO & Internal Discovery */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono-tech font-bold text-gray-300 uppercase tracking-wider mb-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-[#BE93FD] transition-colors"
            >
              Home
            </a>
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                navigate("/services");
                document.getElementById("ourservices")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hover:text-[#BE93FD] transition-colors"
            >
              Services
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate("/about");
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hover:text-[#BE93FD] transition-colors"
            >
              About Me
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hover:text-[#BE93FD] transition-colors"
            >
              Contact
            </a>
            <a
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                navigate("/articles");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-[#BE93FD] transition-colors"
            >
              Articles
            </a>
          </nav>

          {/* Social Profile Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#FF6F91] hover:border-[#BE93FD] hover:bg-[#BE93FD]/10 hover:scale-110 transition-all duration-300 shadow-md"
                  title={s.name}
                  aria-label={s.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>

          {/* Subtle Horizontal Line */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

          {/* SMALL & CENTERED COPYRIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full text-center"
          >
            <p className="text-xs sm:text-sm font-mono-tech text-gray-400 tracking-wider">
              © 2026 Aayush Sharma. All rights reserved.
            </p>
          </motion.div>

        </div>
      </div>

      {/* END-BOTTOM-RIGHT BACK TO TOP BUTTON (JUST AN UPPER SIDE ARROW) */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Back to top"
        className="absolute bottom-6 right-6 sm:right-10 z-30 p-3.5 rounded-full bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] shadow-[0_0_25px_rgba(214,93,177,0.5)] hover:shadow-[0_0_35px_rgba(255,111,145,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center border border-white/30"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </motion.button>

    </footer>
  );
}


