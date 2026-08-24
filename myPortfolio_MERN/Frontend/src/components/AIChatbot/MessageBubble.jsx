import React, { useState } from "react";
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import CodeBlock from "./CodeBlock";
import ProjectCard from "./ProjectCard";
import ServiceCard from "./ServiceCard";
import LeadForm from "./LeadForm";

/**
 * Robust formatting helper to render markdown text safely:
 * Handles code blocks, headers, bold, inline code, bullet/numbered lists, horizontal rules, and links.
 */
function renderFormattedText(text) {
  if (!text || typeof text !== "string") return null;

  const lines = text.split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeLanguage = "javascript";
  let codeBuffer = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const trimmed = line.trim();

    // Fenced Code Block delimiter
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        // Close code block
        elements.push(
          <CodeBlock
            key={`code-block-${idx}`}
            language={codeLanguage || "javascript"}
            code={codeBuffer.join("\n")}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLanguage = "javascript";
      } else {
        // Open code block
        inCodeBlock = true;
        codeLanguage = trimmed.replace(/^```/, "").trim() || "javascript";
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Horizontal Rule
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      elements.push(
        <hr key={`hr-${idx}`} className="my-2.5 border-t border-[#BE93FD]/20" />
      );
      continue;
    }

    // Headers
    if (trimmed.startsWith("#### ")) {
      elements.push(
        <h5 key={`h5-${idx}`} className="font-heading font-semibold text-xs text-[#DCB0FF] mt-2 mb-1">
          {parseInlineStyles(trimmed.replace(/^####\s+/, ""), `h5-${idx}`)}
        </h5>
      );
      continue;
    }
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h4 key={`h4-${idx}`} className="font-heading font-bold text-[13px] text-[#FDF7FF] mt-2.5 mb-1.5 border-b border-white/10 pb-0.5">
          {parseInlineStyles(trimmed.replace(/^###\s+/, ""), `h4-${idx}`)}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      elements.push(
        <h3 key={`h3-${idx}`} className="font-heading font-bold text-sm text-[#FDF7FF] mt-3 mb-1.5">
          {parseInlineStyles(trimmed.replace(/^#{1,2}\s+/, ""), `h3-${idx}`)}
        </h3>
      );
      continue;
    }

    // Unordered List Items (- , * , • )
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      const content = trimmed.replace(/^[-*•]\s*/, "");
      elements.push(
        <div key={`li-${idx}`} className="flex items-start gap-1.5 text-xs text-[#E9D8FD] my-0.5 pl-1">
          <span className="text-[#BE93FD] font-bold mt-[-1px]">•</span>
          <span className="leading-relaxed">{parseInlineStyles(content, `li-${idx}`)}</span>
        </div>
      );
      continue;
    }

    // Numbered list item
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s*(.*)/);
      elements.push(
        <div key={`num-${idx}`} className="flex items-start gap-1.5 text-xs text-[#E9D8FD] my-0.5 pl-1">
          <span className="text-[#DCB0FF] font-mono-tech text-[11px] font-semibold">
            {match?.[1]}
          </span>
          <span className="leading-relaxed">{parseInlineStyles(match?.[2] || "", `num-${idx}`)}</span>
        </div>
      );
      continue;
    }

    // Blank line
    if (!trimmed) {
      elements.push(<div key={`blank-${idx}`} className="h-1.5" />);
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${idx}`} className="text-xs text-[#E9D8FD] leading-relaxed my-1">
        {parseInlineStyles(line, `p-${idx}`)}
      </p>
    );
  }

  // Handle unclosed code block at end of message
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <CodeBlock
        key={`code-block-end`}
        language={codeLanguage || "javascript"}
        code={codeBuffer.join("\n")}
      />
    );
  }

  return elements;
}

function parseInlineStyles(text, lineKey = "inline") {
  if (typeof text !== "string") return text;

  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code: `code`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Link: [label](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/);

    // Find first occurrence among patterns
    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index, match: boldMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index, match: codeMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index, match: linkMatch } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a.index - b.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0];
    if (first.index > 0) {
      parts.push(remaining.substring(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(
        <strong key={`${lineKey}-b-${key++}`} className="font-semibold text-[#FDF7FF]">
          {first.match[1]}
        </strong>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    } else if (first.type === "code") {
      parts.push(
        <code
          key={`${lineKey}-c-${key++}`}
          className="px-1.5 py-0.5 rounded bg-[#2D1B48] border border-[#BE93FD]/30 font-mono-tech text-[11px] text-[#FF6F91]"
        >
          {first.match[1]}
        </code>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    } else if (first.type === "link") {
      parts.push(
        <a
          key={`${lineKey}-a-${key++}`}
          href={first.match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#BE93FD] hover:text-[#FF6F91] underline decoration-[#BE93FD]/40 underline-offset-2 transition-colors"
        >
          {first.match[1]}
        </a>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    }
  }

  return parts;
}

export default function MessageBubble({ message, onActionClick, onSuggestionClick }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(message.content || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      className={`flex items-start gap-2.5 my-3 animate-fadeIn ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center shadow-md ${
          isUser
            ? "bg-[#341D52] border border-[#D65DB1]/50 text-white"
            : "bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-[1.5px]"
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-[#DCB0FF]" />
        ) : (
          <div className="w-full h-full rounded-full bg-[#12081E] flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-[#DCB0FF]" />
          </div>
        )}
      </div>

      {/* Bubble Body */}
      <div className={`max-w-[85%] sm:max-w-[80%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 shadow-lg border text-xs leading-relaxed ${
            isUser
              ? "bg-gradient-to-r from-[#845EC2] via-[#A178DF] to-[#D65DB1] text-white rounded-tr-sm border-[#BE93FD]/40"
              : "bg-[#1A1128]/90 text-[#FDF7FF] rounded-tl-sm border-[#BE93FD]/25 backdrop-blur-md"
          }`}
        >
          {/* Main text content */}
          {isUser ? (
            <p className="whitespace-pre-wrap font-medium">{message.content}</p>
          ) : (
            <div>{renderFormattedText(message.content)}</div>
          )}

          {/* Attached Code Block */}
          {!isUser && message.code && (
            <CodeBlock language={message.code.language} code={message.code.code} />
          )}

          {/* Attached Cards */}
          {!isUser && message.cards && Array.isArray(message.cards) && message.cards.length > 0 && (
            <div className="mt-2 space-y-2 w-full">
              {message.cards.map((card, idx) => {
                if (!card) return null;
                const cardType = (card.type || "").toLowerCase();
                const cardData = card.data || card.project || card.service || card.lead || card;

                if (cardType === "project" || cardData.githubUrl || cardData.liveUrl || cardData.tags) {
                  return (
                    <ProjectCard
                      key={`card-proj-${cardData.id || idx}`}
                      project={cardData}
                      onActionClick={onActionClick}
                    />
                  );
                }
                if (cardType === "service" || cardData.deliverables || cardData.badge) {
                  return (
                    <ServiceCard
                      key={`card-serv-${cardData.id || idx}`}
                      service={cardData}
                      onActionClick={onActionClick}
                    />
                  );
                }
                if (cardType === "lead" || cardData.timelineOptions || cardData.budgetOptions) {
                  return (
                    <LeadForm
                      key={`card-lead-${idx}`}
                      data={cardData}
                      onSubmitRequirement={onActionClick}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* Footer info: timestamp, copy, feedback for AI */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#CBB5E2]/70 font-mono-tech">
            <span>{message.timestamp || "Just now"}</span>
            <span>•</span>
            <button
              onClick={handleCopyText}
              className="hover:text-[#FF6F91] transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy message"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <span>•</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                className={`p-0.5 rounded hover:text-emerald-400 transition-colors cursor-pointer ${
                  feedback === "up" ? "text-emerald-400" : ""
                }`}
                title="Helpful"
                aria-label="Mark helpful"
              >
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                className={`p-0.5 rounded hover:text-rose-400 transition-colors cursor-pointer ${
                  feedback === "down" ? "text-rose-400" : ""
                }`}
                title="Not helpful"
                aria-label="Mark not helpful"
              >
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Contextual Suggested Questions Chips */}
        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.suggestions.map((sugg, sIdx) => (
              <button
                key={sIdx}
                onClick={() => onSuggestionClick(sugg)}
                className="flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#201333]/90 hover:bg-[#341B55] border border-[#BE93FD]/30 hover:border-[#D65DB1] text-[#DCB0FF] hover:text-[#FDF7FF] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#FF6F91]" />
                <span>{sugg}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
