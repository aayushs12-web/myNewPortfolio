import React from "react";
import { Sparkles, Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 my-3 animate-fadeIn">
      {/* AI Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-[1.5px] shrink-0 shadow-[0_0_10px_rgba(190,147,253,0.4)]">
        <div className="w-full h-full rounded-full bg-[#12081E] flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-[#DCB0FF]" />
        </div>
      </div>

      {/* Typing Bubble */}
      <div className="rounded-2xl rounded-tl-sm px-4 py-2.5 bg-[#1A1128]/90 border border-[#BE93FD]/25 shadow-md flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BE93FD] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#D65DB1] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F91] animate-bounce" />
        </div>
        <span className="text-[11px] font-mono-tech text-[#CBB5E2]/80">
          Aayush AI is thinking...
        </span>
      </div>
    </div>
  );
}
