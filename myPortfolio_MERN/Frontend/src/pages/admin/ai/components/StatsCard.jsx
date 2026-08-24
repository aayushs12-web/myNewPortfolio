import React from "react";

export default function StatsCard({ title, value, subtitle, icon: Icon, color = "purple" }) {
  const colorMap = {
    purple: {
      bg: "bg-[#BE93FD]/10 border-[#BE93FD]/30",
      iconText: "text-[#DCB0FF]",
      iconBg: "bg-[#BE93FD]/20 border-[#BE93FD]/40",
      accent: "text-[#DCB0FF]",
    },
    pink: {
      bg: "bg-[#FF6F91]/10 border-[#FF6F91]/30",
      iconText: "text-[#FF6F91]",
      iconBg: "bg-[#FF6F91]/20 border-[#FF6F91]/40",
      accent: "text-[#FF6F91]",
    },
    emerald: {
      bg: "bg-emerald-500/10 border-emerald-500/30",
      iconText: "text-emerald-400",
      iconBg: "bg-emerald-500/20 border-emerald-500/40",
      accent: "text-emerald-400",
    },
    cyan: {
      bg: "bg-cyan-500/10 border-cyan-500/30",
      iconText: "text-cyan-400",
      iconBg: "bg-cyan-500/20 border-cyan-500/40",
      accent: "text-cyan-400",
    },
  };

  const scheme = colorMap[color] || colorMap.purple;

  return (
    <div
      className={`rounded-2xl border ${scheme.bg} bg-[#160E26]/80 backdrop-blur-xl p-5 shadow-xl transition-all duration-200 hover:border-opacity-60 hover:shadow-2xl hover:scale-[1.01]`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-mono-tech text-[#CBB5E2] uppercase tracking-wider mb-1">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#FDF7FF] tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#CBB5E2]/80 mt-1 flex items-center gap-1">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`w-11 h-11 rounded-xl ${scheme.iconBg} border flex items-center justify-center ${scheme.iconText} shadow-md`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
