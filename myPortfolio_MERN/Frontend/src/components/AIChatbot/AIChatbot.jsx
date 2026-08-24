import React, { useState, useRef, useCallback } from "react";
import ChatbotTrigger from "./ChatbotTrigger";
import ChatbotPanel from "./ChatbotPanel";
import { startChatSession, clearChatSession, streamChatMessage } from "./services/chatbotApi";

const SESSION_STORAGE_KEY = "aayush_ai_session_id";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thinking state (before 1st token)
  const [isStreaming, setIsStreaming] = useState(false); // Active streaming state
  const [error, setError] = useState(null);
  const [lastUserMessage, setLastUserMessage] = useState("");
  const [sessionId, setSessionId] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const abortControllerRef = useRef(null);

  // Ensure session is initialized
  const ensureSession = useCallback(async () => {
    if (sessionId) return sessionId;
    try {
      const result = await startChatSession("portfolio");
      if (result.sessionId) {
        setSessionId(result.sessionId);
        try {
          sessionStorage.setItem(SESSION_STORAGE_KEY, result.sessionId);
        } catch (e) {
          console.warn("Could not save sessionId to sessionStorage:", e);
        }
        return result.sessionId;
      }
    } catch (err) {
      console.warn("Session init warning (using transient session):", err);
    }
    return "";
  }, [sessionId]);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setIsMinimized(false);
        ensureSession();
      }
      return nextState;
    });
  }, [ensureSession]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleStopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsLoading(false);

    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.role === "assistant" && last.isStreaming) {
        return [
          ...prev.slice(0, -1),
          {
            ...last,
            isStreaming: false,
          },
        ];
      }
      return prev;
    });
  }, []);

  const handleClearChat = useCallback(async () => {
    handleStopGenerating();

    const currentSessionId = sessionId;
    setMessages([]);
    setError(null);

    if (currentSessionId) {
      try {
        await clearChatSession(currentSessionId);
      } catch (err) {
        console.warn("Failed to clear session on backend:", err);
      }
    }

    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}

    setSessionId("");
    try {
      const result = await startChatSession("portfolio");
      if (result?.sessionId) {
        setSessionId(result.sessionId);
        sessionStorage.setItem(SESSION_STORAGE_KEY, result.sessionId);
      }
    } catch {}
  }, [sessionId, handleStopGenerating]);

  const handleSendMessage = useCallback(
    async (content) => {
      if (!content || !content.trim() || isStreaming) return;

      // Abort any previous pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const trimmed = content.trim();
      setLastUserMessage(trimmed);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const userMsg = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: timeStr,
      };

      const aiMsgId = `ai-${Date.now()}`;
      const aiInitialMsg = {
        id: aiMsgId,
        role: "assistant",
        content: "",
        cards: [],
        suggestions: [],
        intent: "general",
        isStreaming: true,
        timestamp: timeStr,
      };

      // Add user message & placeholder assistant message
      setMessages((prev) => [...prev, userMsg, aiInitialMsg]);
      setIsLoading(true);
      setIsStreaming(true);
      setError(null);

      let accumulatedContent = "";

      try {
        const activeSessionId = await ensureSession();

        await streamChatMessage({
          userMessage: trimmed,
          conversationHistory: messages,
          sessionId: activeSessionId,
          signal: abortControllerRef.current?.signal,
          onStart: (startEvent) => {
            if (startEvent?.sessionId && startEvent.sessionId !== sessionId) {
              setSessionId(startEvent.sessionId);
              try {
                sessionStorage.setItem(SESSION_STORAGE_KEY, startEvent.sessionId);
              } catch {}
            }
          },
          onChunk: (chunkText) => {
            setIsLoading(false); // Hide thinking indicator once first chunk arrives
            accumulatedContent += chunkText;

            setMessages((prev) => {
              const targetIdx = prev.findIndex((m) => m.id === aiMsgId);
              if (targetIdx === -1) return prev;

              const updated = [...prev];
              updated[targetIdx] = {
                ...updated[targetIdx],
                content: accumulatedContent,
              };
              return updated;
            });
          },
          onDone: (doneEvent) => {
            setIsLoading(false);
            setIsStreaming(false);

            if (doneEvent?.sessionId && doneEvent.sessionId !== sessionId) {
              setSessionId(doneEvent.sessionId);
              try {
                sessionStorage.setItem(SESSION_STORAGE_KEY, doneEvent.sessionId);
              } catch {}
            }

            setMessages((prev) => {
              const targetIdx = prev.findIndex((m) => m.id === aiMsgId);
              if (targetIdx === -1) return prev;

              const updated = [...prev];
              updated[targetIdx] = {
                ...updated[targetIdx],
                content: doneEvent.reply || accumulatedContent,
                cards: Array.isArray(doneEvent.cards) ? doneEvent.cards : [],
                suggestions: Array.isArray(doneEvent.suggestions) ? doneEvent.suggestions : [],
                intent: doneEvent.intent || "general",
                isStreaming: false,
              };
              return updated;
            });
          },
          onError: (errMsg) => {
            console.error("Stream error callback:", errMsg);
            setIsLoading(false);
            setIsStreaming(false);

            if (!accumulatedContent) {
              // Remove empty assistant placeholder if failed completely
              setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
              setError(errMsg || "Something went wrong while generating the response.");
            } else {
              // Keep partial content and finish streaming
              setMessages((prev) => {
                const targetIdx = prev.findIndex((m) => m.id === aiMsgId);
                if (targetIdx === -1) return prev;
                const updated = [...prev];
                updated[targetIdx] = {
                  ...updated[targetIdx],
                  isStreaming: false,
                };
                return updated;
              });
            }
          },
        });
      } catch (err) {
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }
        console.error("Chat streaming error:", err);
        setIsLoading(false);
        setIsStreaming(false);

        if (!accumulatedContent) {
          setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
          setError(err?.message || "Something went wrong while generating the response.");
        }
      }
    },
    [messages, sessionId, isStreaming, ensureSession]
  );

  const handleRetry = useCallback(() => {
    if (lastUserMessage) {
      setError(null);
      handleSendMessage(lastUserMessage);
    }
  }, [lastUserMessage, handleSendMessage]);

  return (
    <>
      {/* Floating Trigger Button */}
      <ChatbotTrigger isOpen={isOpen && !isMinimized} onClick={handleToggleOpen} />

      {/* Main Chatbot Panel */}
      <ChatbotPanel
        isOpen={isOpen}
        isMinimized={isMinimized}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onClear={handleClearChat}
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
        onStopGenerating={handleStopGenerating}
        error={error}
        onSendMessage={handleSendMessage}
        onActionClick={handleSendMessage}
        onSuggestionClick={handleSendMessage}
        onSelectPrompt={handleSendMessage}
        onRetry={handleRetry}
      />
    </>
  );
}
