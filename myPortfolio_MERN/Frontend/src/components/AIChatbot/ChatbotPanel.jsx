import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotHeader from "./ChatbotHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatbotPanel({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onClear,
  messages,
  isLoading,
  isStreaming,
  onStopGenerating,
  error,
  onSendMessage,
  onActionClick,
  onSuggestionClick,
  onSelectPrompt,
  onRetry,
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || isMinimized) return null;

  return (
    <AnimatePresence>
      {/* Mobile Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] sm:hidden"
        aria-hidden="true"
      />

      {/* Main Chat Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[90] 
          inset-x-0 bottom-0 top-12 
          sm:top-auto sm:inset-auto sm:bottom-24 sm:right-6 
          sm:w-[410px] sm:h-[600px] sm:max-h-[calc(100vh-120px)]
          rounded-t-3xl sm:rounded-2xl
          flex flex-col 
          overflow-hidden 
          border border-[#BE93FD]/30 
          bg-[#12081E]/95 backdrop-blur-2xl 
          shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
        role="dialog"
        aria-modal="true"
        aria-label="Aayush AI Assistant Window"
      >
        {/* Header */}
        <ChatbotHeader
          onClose={onClose}
          onMinimize={onMinimize}
          onClear={onClear}
          hasMessages={messages.length > 0}
        />

        {/* Message Area */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
          error={error}
          onActionClick={onActionClick}
          onSuggestionClick={onSuggestionClick}
          onSelectPrompt={onSelectPrompt}
          onRetry={onRetry}
        />

        {/* Input Bar */}
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          isStreaming={isStreaming}
          onStopGenerating={onStopGenerating}
        />
      </motion.div>
    </AnimatePresence>
  );
}
