import React from "react";
import { Sparkles, FolderGit2, Code2, Rocket } from "lucide-react";
import { CHATBOT_CONFIG } from "./config/chatbotConfig";

const iconMap = {
  Sparkles: Sparkles,
  FolderGit2: FolderGit2,
  Code2: Code2,
  Rocket: Rocket,
};

export default function QuickActions({ onActionClick, disabled = false }) {
  const actions = CHATBOT_CONFIG.quickActions;

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const IconComponent = iconMap[action.icon] || Sparkles;
          return (
            <button
              key={action.id}
              disabled={disabled}
              onClick={() => onActionClick(action.prompt)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left bg-[#1A102A]/80 hover:bg-[#281840] border border-[#BE93FD]/20 hover:border-[#BE93FD]/50 text-[#FDF7FF] hover:shadow-[0_0_15px_rgba(190,147,253,0.2)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="w-6 h-6 rounded-lg bg-[#BE93FD]/15 border border-[#BE93FD]/30 flex items-center justify-center text-[#DCB0FF] group-hover:text-[#FF6F91] group-hover:scale-105 transition-all">
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium leading-tight group-hover:text-[#DCB0FF]">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
