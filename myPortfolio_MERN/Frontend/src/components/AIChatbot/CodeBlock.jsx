import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export default function CodeBlock({ language = "javascript", code = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-[#BE93FD]/25 bg-[#090510]/90 shadow-lg text-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#170E24] border-b border-[#BE93FD]/20">
        <div className="flex items-center gap-2 text-[#CBB5E2] font-mono-tech">
          <Terminal className="w-3.5 h-3.5 text-[#BE93FD]" />
          <span className="uppercase tracking-wider font-semibold text-[11px] text-[#DCB0FF]">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#25153A] hover:bg-[#341D52] text-[#FDF7FF] hover:text-[#FF6F91] border border-[#BE93FD]/30 transition-all duration-200 cursor-pointer"
          title="Copy Code"
          aria-label="Copy Code to Clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content Area */}
      <pre className="p-3.5 overflow-x-auto font-mono-tech text-[12px] leading-relaxed text-[#E9D8FD] selection:bg-[#D65DB1]/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}
