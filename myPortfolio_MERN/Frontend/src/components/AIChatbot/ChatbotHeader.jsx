import React from "react";
import { Bot, Minus, X, RotateCcw, Sparkles } from "lucide-react";
import { CHATBOT_CONFIG } from "./config/chatbotConfig";

export default function ChatbotHeader({
  onClose,
  onMinimize,
  onClear,
  hasMessages = false,
}) {
  const { brand } = CHATBOT_CONFIG;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#170D28]/95 border-b border-[#BE93FD]/20 backdrop-blur-xl shrink-0">
      {/* Brand & Status */}
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-[1.5px] shadow-[0_0_12px_rgba(190,147,253,0.35)]">
            <div className="w-full h-full rounded-xl bg-[#12081E] flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#DCB0FF]" />
            </div>
          </div>
          {/* Active online dot */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#12081E]"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-heading font-bold text-[13px] text-[#FDF7FF] leading-tight">
              {brand.name}
            </h3>
            <span className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
              Online
            </span>
          </div>
          <p className="text-[10px] text-[#CBB5E2] font-mono-tech leading-none mt-0.5">
            {brand.subtitle}
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        {/* Reset / Clear Chat */}
        {hasMessages && onClear && (
          <button
            onClick={onClear}
            className="w-7 h-7 rounded-lg hover:bg-white/10 text-[#CBB5E2] hover:text-[#FF6F91] flex items-center justify-center transition-colors cursor-pointer"
            title="Clear Conversation"
            aria-label="Clear Conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Minimize Button */}
        {onMinimize && (
          <button
            onClick={onMinimize}
            className="w-7 h-7 rounded-lg hover:bg-white/10 text-[#CBB5E2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Minimize Chatbot"
            aria-label="Minimize Chatbot"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-white/10 text-[#CBB5E2] hover:text-[#FF6F91] flex items-center justify-center transition-colors cursor-pointer"
            title="Close Chatbot (Esc)"
            aria-label="Close Chatbot"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
