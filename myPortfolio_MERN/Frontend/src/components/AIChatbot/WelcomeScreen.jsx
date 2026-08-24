import React from "react";
import { Bot, Sparkles, Terminal, Rocket, CheckCircle } from "lucide-react";
import QuickActions from "./QuickActions";

export default function WelcomeScreen({ onSelectPrompt }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 my-auto space-y-4 animate-fadeIn">
      {/* Bot Avatar with Glowing Aura */}
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-[2px] shadow-[0_0_30px_rgba(214,93,177,0.45)]">
          <div className="w-full h-full rounded-2xl bg-[#12081E] flex items-center justify-center">
            <Bot className="w-7 h-7 text-[#DCB0FF]" />
          </div>
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#12081E]"></span>
        </span>
      </div>

      {/* Greeting Title and Body */}
      <div className="space-y-1.5 max-w-xs">
        <h3 className="font-heading font-bold text-base text-[#FDF7FF] flex items-center justify-center gap-1.5">
          <span>Hi! I'm Aayush AI</span>
          <Sparkles className="w-4 h-4 text-[#FF6F91]" />
        </h3>
        <p className="text-xs text-[#CBB5E2] leading-relaxed">
          I can help you explore Aayush's portfolio, services and projects, or help solve technical development questions.
        </p>
      </div>

      {/* Capabilities Badges */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#BE93FD]/10 border border-[#BE93FD]/25 text-[#DCB0FF]">
          ⚡ MERN Stack
        </span>
        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#BE93FD]/10 border border-[#BE93FD]/25 text-[#DCB0FF]">
          🛡️ JWT & APIs
        </span>
        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#BE93FD]/10 border border-[#BE93FD]/25 text-[#DCB0FF]">
          🐳 Docker & DevOps
        </span>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="w-full pt-1">
        <p className="text-[10px] font-mono-tech text-[#BE93FD]/80 uppercase tracking-wider mb-2.5">
          Quick Actions
        </p>
        <QuickActions onActionClick={onSelectPrompt} />
      </div>
    </div>
  );
}
