import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import avatar from "../assets/avator.png";

export default function Hero3DViewer() {
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto h-[480px] sm:h-[560px] md:h-[600px] flex items-center justify-center perspective-1000 select-none"
    >
      {/* 3D Stage Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
      >
        {/* Outer Cosmic Particle Ring Aura in Amethyst Pink */}
        <div
          className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[480px] md:h-[480px] rounded-full border border-[#BE93FD]/40 bg-gradient-to-tr from-[#845EC2]/30 via-[#D65DB1]/20 to-[#FF6F91]/20 shadow-[0_0_60px_rgba(214,93,177,0.4)] animate-pulse-glow"
          style={{ transform: "translateZ(-50px)" }}
        >
          <div className="w-[108%] h-[108%] -translate-x-[4%] -translate-y-[4%] rounded-full border border-[#BE93FD]/30 border-dashed animate-spin-3d opacity-80 pointer-events-none" />
        </div>

        {/* Inner Neon Halo Ring */}
        <div
          className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] rounded-full border-2 border-[#FF6F91]/50 bg-[#D65DB1]/10 backdrop-blur-sm shadow-[0_0_40px_rgba(255,111,145,0.4)]"
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Sleek Multi-Tiered Pedestal Ring Base */}
        <div
          className="absolute bottom-4 sm:bottom-6 w-[280px] sm:w-[350px] md:w-[390px] h-20 sm:h-24 rounded-[100%] bg-gradient-to-b from-[#D65DB1]/50 via-[#1D112B] to-[#0D0814] border-2 border-[#BE93FD] shadow-[0_25px_60px_rgba(214,93,177,0.5)] flex items-center justify-center"
          style={{ transform: "translateZ(-30px) rotateX(75deg)" }}
        >
          <div className="w-[85%] h-[85%] rounded-[100%] border border-[#BE93FD] bg-[#DCB0FF]/20 flex items-center justify-center shadow-inner">
            <div className="w-[68%] h-[68%] rounded-[100%] border border-[#FF6F91] bg-[#FF6F91]/30 shadow-inner" />
          </div>
        </div>

        {/* Clean Avatar Portrait */}
        <motion.img
          src={avatar}
          alt="3D illustrated avatar of Aayush Sharma, Full-Stack Developer"
          width="500"
          height="560"
          fetchPriority="high"
          className="relative z-10 h-[420px] sm:h-[500px] md:h-[560px] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)] filter contrast-105"
          style={{ transform: "translateZ(60px)" }}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* Floating Glowing Orbs & Crystals around character */}
        <div className="absolute top-16 left-12 w-4 h-4 rounded-full bg-[#BE93FD] shadow-[0_0_15px_#BE93FD] animate-float opacity-85" />
        <div className="absolute top-28 right-10 w-6 h-6 rounded-full bg-[#FF6F91] shadow-[0_0_20px_#FF6F91] animate-float opacity-80" />
        <div className="absolute bottom-32 left-8 w-5 h-5 rounded-full bg-[#DCB0FF] shadow-[0_0_15px_#DCB0FF] animate-float opacity-75" />
        <div className="absolute bottom-24 right-12 w-4 h-4 rounded-full bg-[#845EC2] shadow-[0_0_15px_#845EC2] animate-float opacity-85" />
      </motion.div>
    </div>
  );
}
