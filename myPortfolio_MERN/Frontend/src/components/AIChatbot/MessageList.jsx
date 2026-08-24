import React, { useRef, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import MessageBubble from "./MessageBubble";
import WelcomeScreen from "./WelcomeScreen";
import TypingIndicator from "./TypingIndicator";
import ChatbotError from "./ChatbotError";

export default function MessageList({
  messages = [],
  isLoading = false,
  error = null,
  onActionClick,
  onSuggestionClick,
  onSelectPrompt,
  onRetry,
}) {
  const scrollContainerRef = useRef(null);
  const bottomAnchorRef = useRef(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const userScrolledUpRef = useRef(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const isUp = distanceToBottom > 80;
    setShowScrollBottom(isUp);
    userScrolledUpRef.current = isUp;
  };

  // Smart auto-scroll: only scrolls to bottom if user hasn't scrolled up
  useEffect(() => {
    if (!userScrolledUpRef.current && bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, error]);

  const scrollToBottom = () => {
    userScrolledUpRef.current = false;
    setShowScrollBottom(false);
    if (bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex-1 h-full min-h-0 overflow-hidden">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-4 py-3 space-y-1 scroll-smooth"
      >
        {messages.length === 0 ? (
          <WelcomeScreen onSelectPrompt={onSelectPrompt} />
        ) : (
          <>
            {messages.map((msg, idx) => (
              <MessageBubble
                key={msg.id || idx}
                message={msg}
                onActionClick={onActionClick}
                onSuggestionClick={onSuggestionClick}
              />
            ))}
          </>
        )}

        {/* Typing indicator shown ONLY before first chunk arrives */}
        {isLoading && <TypingIndicator />}

        {error && <ChatbotError message={error} onRetry={onRetry} />}

        <div ref={bottomAnchorRef} className="h-1" />
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-3 right-4 px-2.5 py-1 rounded-full bg-[#341D52]/90 hover:bg-[#4E2B7A] border border-[#BE93FD]/40 text-[#DCB0FF] flex items-center gap-1 shadow-lg text-[11px] font-mono-tech transition-all duration-200 cursor-pointer animate-bounce"
          aria-label="Scroll to latest message"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>Jump to latest</span>
        </button>
      )}
    </div>
  );
}
