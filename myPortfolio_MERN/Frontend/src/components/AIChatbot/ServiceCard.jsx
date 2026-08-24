import React from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function ServiceCard({ service, onActionClick }) {
  if (!service || typeof service !== "object") return null;

  const title = service.title || "Service Details";
  const badge = service.badge;
  const description = service.description || "";
  const deliverables = Array.isArray(service.deliverables) ? service.deliverables : [];

  return (
    <div className="my-2.5 rounded-xl border border-[#BE93FD]/30 bg-[#160E26]/85 backdrop-blur-md p-3.5 hover:border-[#D65DB1]/50 hover:shadow-[0_0_20px_rgba(214,93,177,0.2)] transition-all duration-300">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-heading font-semibold text-[13px] text-[#FDF7FF]">
          {title}
        </h4>
        {badge && (
          <span className="text-[9px] uppercase tracking-wider font-bold text-[#BE93FD] bg-[#845EC2]/25 px-2 py-0.5 rounded-full border border-[#BE93FD]/40">
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-[#CBB5E2] leading-relaxed mb-3">
          {description}
        </p>
      )}

      {/* Deliverables list */}
      {deliverables.length > 0 && (
        <div className="space-y-1 mb-3">
          {deliverables.slice(0, 3).map((item, idx) => (
            <div key={`deliv-${idx}`} className="flex items-start gap-1.5 text-[11px] text-[#E9D8FD]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#BE93FD] shrink-0 mt-0.5" />
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      )}

      {onActionClick && (
        <button
          type="button"
          onClick={() =>
            onActionClick(
              `I'm interested in the ${title} service. Can you explain timeline, tech stack, and how to get started?`
            )
          }
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#BE93FD]/20 via-[#D65DB1]/20 to-[#FF6F91]/20 hover:from-[#BE93FD]/40 hover:to-[#FF6F91]/40 border border-[#BE93FD]/40 text-[#FDF7FF] text-[11px] font-medium transition-all duration-200 cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-[#FF6F91]" />
          <span>Inquire about {title}</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      )}
    </div>
  );
}
