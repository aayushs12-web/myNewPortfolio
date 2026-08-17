import React from "react";

export default function ThreeCanvasBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0D0814]">
      {/* Uiverse Cosmic Animated Starfield Layers */}
      <div id="stars" className="pointer-events-none opacity-50" />
      <div id="stars2" className="pointer-events-none opacity-40" />

      {/* High-Tech Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(190, 147, 253, 0.5) 1px, transparent 1px), linear-gradient(to right, rgba(132, 94, 194, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(132, 94, 194, 0.12) 1px, transparent 1px)`,
          backgroundSize: `50px 50px, 50px 50px, 50px 50px`
        }}
      />

      {/* Hardware-Accelerated Ambient Orbs */}
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-[#845EC2]/18 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-1/4 -right-28 w-[550px] h-[550px] bg-[#D65DB1]/14 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-[#FF6F91]/12 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-2/3 right-1/4 w-[400px] h-[400px] bg-[#BE93FD]/14 rounded-full blur-3xl pointer-events-none transform-gpu" />
    </div>
  );
}
