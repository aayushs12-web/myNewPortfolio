import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Square } from "lucide-react";
import { CHATBOT_CONFIG } from "./config/chatbotConfig";

export default function ChatInput({
  onSendMessage,
  isLoading = false,
  isStreaming = false,
  onStopGenerating,
  placeholder,
}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);
  const maxChars = CHATBOT_CONFIG.behavior.maxInputChars;

  // Auto-resize textarea height as content expands
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || isStreaming) return;

    onSendMessage(trimmed);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 bg-[#110A1E]/95 border-t border-[#BE93FD]/20 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-1.5">
        <div className="relative flex items-end bg-[#1E1231]/90 rounded-2xl border border-[#BE93FD]/30 focus-within:border-[#D65DB1] focus-within:shadow-[0_0_15px_rgba(214,93,177,0.25)] transition-all duration-200">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            maxLength={maxChars}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || isStreaming}
            placeholder={
              isStreaming
                ? "Aayush AI is responding..."
                : placeholder || "Ask about MERN stack, services, projects, or JWT..."
            }
            className="w-full bg-transparent text-xs text-[#FDF7FF] placeholder:text-[#CBB5E2]/50 px-3.5 py-3 pr-24 resize-none max-h-28 focus:outline-none leading-relaxed disabled:opacity-60"
            aria-label="Chat input query"
          />

          {/* Action buttons inside the right side of input */}
          <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
            {input.length > 0 && !isLoading && !isStreaming && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="w-6 h-6 rounded-full hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Clear input"
                aria-label="Clear input text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {isStreaming ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 flex items-center gap-1.5 text-[11px] font-semibold transition-all cursor-pointer shadow-md"
                title="Stop generating response"
                aria-label="Stop generating response"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] flex items-center justify-center shadow-md hover:shadow-[0_0_15px_rgba(214,93,177,0.5)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                title="Send message (Enter)"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5 ml-[-1px] mt-[1px]" />
              </button>
            )}
          </div>
        </div>

        {/* Input Footer Note */}
        <div className="flex items-center justify-between px-1 text-[9px] font-mono-tech text-[#CBB5E2]/60">
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#FF6F91]" />
            <span>
              {isStreaming ? "Streaming live response..." : "Enter to send • Shift+Enter for new line"}
            </span>
          </span>
          {input.length > 100 && (
            <span>
              {input.length}/{maxChars}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
