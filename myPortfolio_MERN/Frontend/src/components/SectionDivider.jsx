import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Terminal, Cpu, Layers } from "lucide-react";

export default function SectionDivider({ icon: Icon = Code2 }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-6 sm:py-8 px-4 z-20 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-center relative"
      >
        {/* Left Horizontal Neon Gradient Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#BE93FD] to-[#FF6F91] shadow-[0_0_18px_rgba(190,147,253,0.8)]" />

        {/* Center Futuristic Cyber-Core Emblem */}
        <div className="mx-4 sm:mx-6 shrink-0 relative flex items-center justify-center">
          {/* Outer Spinning Dashed Neon Ring */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-[#BE93FD]/70 animate-[spin_10s_linear_infinite] absolute shadow-[0_0_20px_rgba(190,147,253,0.5)]" />

          {/* Glowing Pulse Ripple */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#BE93FD]/25 to-[#FF6F91]/25 animate-ping opacity-45" />

          {/* Center Glass Node Badge */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#0D0814]/95 border-2 border-[#BE93FD] shadow-[0_0_25px_rgba(214,93,177,0.8)] flex items-center justify-center relative z-10 backdrop-blur-xl">
            <Icon className="w-5 h-5 text-[#FF6F91] filter drop-shadow-[0_0_8px_#FF6F91]" />

            {/* Corner Neon Accent Dots */}
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF6F91] shadow-[0_0_8px_#FF6F91]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#BE93FD] shadow-[0_0_8px_#BE93FD]" />
          </div>
        </div>

        {/* Right Horizontal Neon Gradient Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#FF6F91] via-[#BE93FD] to-transparent shadow-[0_0_18px_rgba(255,111,145,0.8)]" />
      </motion.div>
    </div>
  );
}


