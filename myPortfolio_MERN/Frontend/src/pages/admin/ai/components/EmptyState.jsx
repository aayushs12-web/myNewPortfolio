import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There are no records to display at this time.",
  icon: Icon = Inbox,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-[#BE93FD]/20 bg-[#160E26]/40 backdrop-blur-sm">
      <div className="w-12 h-12 rounded-2xl bg-[#BE93FD]/10 border border-[#BE93FD]/20 flex items-center justify-center text-[#DCB0FF] mb-3 shadow-inner">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm sm:text-base font-semibold text-[#FDF7FF] mb-1">
        {title}
      </h4>
      <p className="text-xs text-[#CBB5E2]/80 max-w-sm mb-4">
        {description}
      </p>
      {action}
    </div>
  );
}
