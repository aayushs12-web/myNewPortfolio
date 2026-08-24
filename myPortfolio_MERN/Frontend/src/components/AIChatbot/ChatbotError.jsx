import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ChatbotError({ message, onRetry }) {
  return (
    <div className="my-3 p-3.5 rounded-xl border border-rose-500/40 bg-rose-950/20 text-[#FDF7FF] text-xs">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[12px] text-rose-200 font-medium leading-relaxed">
            {message || "I couldn't process that message right now. Please try again."}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
