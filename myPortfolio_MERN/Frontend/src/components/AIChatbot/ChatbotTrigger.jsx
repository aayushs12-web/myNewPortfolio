import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, MessageSquare } from "lucide-react";
import { CHATBOT_CONFIG } from "./config/chatbotConfig";

export default function ChatbotTrigger({ isOpen, onClick, unreadCount = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[80] flex items-center gap-3">
      {/* Floating Tooltip / Invitation Bubble on Desktop */}
      <AnimatePresence>
        {!isOpen && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#170E28]/95 border border-[#BE93FD]/40 shadow-[0_0_20px_rgba(190,147,253,0.3)] backdrop-blur-md pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6F91]" />
            <span className="text-xs font-semibold text-[#FDF7FF]">
              Ask {CHATBOT_CONFIG.brand.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Circular Floating Trigger Button */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`relative group flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 rounded-full p-[2px] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-tr from-[#845EC2] to-[#BE93FD] shadow-[0_0_25px_rgba(190,147,253,0.6)]"
            : "bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] hover:shadow-[0_0_35px_rgba(214,93,177,0.7)]"
        }`}
        aria-label="Toggle Aayush AI Chatbot"
        title="Chat with Aayush AI"
      >
        {/* Inner Glass Disc */}
        <div className="w-full h-full rounded-full bg-[#12081E] flex items-center justify-center relative overflow-hidden">
          {/* Animated Background Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#BE93FD]/20 via-[#D65DB1]/20 to-[#FF6F91]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Bot Icon with Sparkle */}
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-[#DCB0FF] group-hover:text-white transition-colors duration-200" />
            <Sparkles className="w-2.5 h-2.5 text-[#FF6F91] absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>

        {/* Pulsing Online Badge / Ping */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#12081E]"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
