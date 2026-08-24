import React, { useEffect, useState } from "react";
import { X, MessageSquare, Bot, User, Calendar, Tag, AlertCircle, RefreshCw } from "lucide-react";
import { getAdminConversationBySessionId } from "../../../../services/adminApi";
import AdminLoading from "./AdminLoading";

export default function ConversationViewerModal({ sessionId, onClose, onOpenLead }) {
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    let isMounted = true;
    const fetchConv = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAdminConversationBySessionId(sessionId);
        if (isMounted) {
          setConversation(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load conversation messages.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchConv();
    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!sessionId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#160E26] border border-[#BE93FD]/30 rounded-2xl flex flex-col max-h-[85vh] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#BE93FD]/20 bg-[#1A102E]/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#160E26] rounded-[10px] flex items-center justify-center text-[#DCB0FF]">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#FDF7FF] flex items-center gap-2">
                <span>Conversation Inspector</span>
                {conversation?.messages && (
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#BE93FD]/20 text-[#DCB0FF] border border-[#BE93FD]/30">
                    {conversation.messages.length} messages
                  </span>
                )}
              </h3>
              <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70 truncate max-w-xs sm:max-w-md">
                Session: {sessionId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 text-[#CBB5E2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isLoading && <AdminLoading message="Loading session transcript..." />}

          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !error && conversation && (
            <>
              {/* Linked Lead Banner if exists */}
              {conversation.lead && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#BE93FD]/10 border border-[#BE93FD]/30 text-xs">
                  <div>
                    <span className="text-[#DCB0FF] font-semibold">Generated Lead: </span>
                    <span className="text-[#FDF7FF]">{conversation.lead.name} ({conversation.lead.projectType})</span>
                  </div>
                  {onOpenLead && (
                    <button
                      onClick={() => onOpenLead(conversation.lead._id)}
                      className="px-2.5 py-1 rounded-lg bg-[#BE93FD]/20 hover:bg-[#BE93FD]/30 text-[#DCB0FF] font-mono-tech text-[10px] border border-[#BE93FD]/40 transition-colors cursor-pointer"
                    >
                      View Lead Details
                    </button>
                  )}
                </div>
              )}

              {/* Message Feed */}
              {conversation.messages.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#CBB5E2]/70 font-mono-tech">
                  No recorded messages for this session.
                </div>
              ) : (
                conversation.messages.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id || idx}
                      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs shadow-md ${
                          isUser
                            ? "bg-gradient-to-tr from-[#BE93FD] to-[#D65DB1] text-[#0D0814]"
                            : "bg-[#2A1845] border border-[#BE93FD]/30 text-[#DCB0FF]"
                        }`}
                      >
                        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          isUser
                            ? "bg-gradient-to-tr from-[#BE93FD]/25 to-[#D65DB1]/25 border border-[#BE93FD]/40 text-[#FDF7FF]"
                            : "bg-[#1E1233] border border-[#BE93FD]/20 text-[#EBE0F7]"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1 text-[9px] font-mono-tech opacity-70">
                          <span>{isUser ? "User" : "Aayush AI"}</span>
                          {msg.intent && !isUser && (
                            <span className="px-1.5 py-0.2 rounded bg-[#BE93FD]/20 text-[#DCB0FF] border border-[#BE93FD]/30">
                              intent: {msg.intent}
                            </span>
                          )}
                          {msg.createdAt && (
                            <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          )}
                        </div>

                        <div className="whitespace-pre-wrap font-sans text-xs break-words">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#BE93FD]/20 bg-[#1A102E]/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
