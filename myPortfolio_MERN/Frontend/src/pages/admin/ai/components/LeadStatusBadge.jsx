import React, { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

const STATUS_CONFIG = {
  new: {
    label: "New",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    dotClass: "bg-amber-400",
  },
  contacted: {
    label: "Contacted",
    badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/40",
    dotClass: "bg-blue-400",
  },
  "in-progress": {
    label: "In Progress",
    badgeClass: "bg-purple-500/15 text-purple-300 border-purple-500/40",
    dotClass: "bg-purple-400",
  },
  completed: {
    label: "Completed",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    dotClass: "bg-emerald-400",
  },
  closed: {
    label: "Closed",
    badgeClass: "bg-gray-500/15 text-gray-400 border-gray-500/40",
    dotClass: "bg-gray-400",
  },
};

export default function LeadStatusBadge({ status = "new", editable = false, onStatusChange }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const normalizedStatus = (status || "new").toLowerCase();
  const current = STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG.new;

  const handleChange = async (e) => {
    const nextStatus = e.target.value;
    if (nextStatus === normalizedStatus || !onStatusChange) return;

    setIsUpdating(true);
    try {
      await onStatusChange(nextStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!editable) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${current.badgeClass}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${current.dotClass}`} />
        <span>{current.label}</span>
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={normalizedStatus}
        onChange={handleChange}
        disabled={isUpdating}
        className={`appearance-none text-[11px] font-medium pl-2.5 pr-6 py-1 rounded-full border cursor-pointer focus:outline-none transition-all ${current.badgeClass} disabled:opacity-50`}
      >
        <option value="new" className="bg-[#160E26] text-amber-300">
          New
        </option>
        <option value="contacted" className="bg-[#160E26] text-blue-300">
          Contacted
        </option>
        <option value="in-progress" className="bg-[#160E26] text-purple-300">
          In Progress
        </option>
        <option value="completed" className="bg-[#160E26] text-emerald-300">
          Completed
        </option>
        <option value="closed" className="bg-[#160E26] text-gray-400">
          Closed
        </option>
      </select>

      <div className="absolute right-2 pointer-events-none text-current">
        {isUpdating ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <ChevronDown className="w-3 h-3 opacity-70" />
        )}
      </div>
    </div>
  );
}
