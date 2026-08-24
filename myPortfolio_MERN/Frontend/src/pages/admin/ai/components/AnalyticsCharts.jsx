import React from "react";
import { BarChart3, PieChart, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

export default function AnalyticsCharts({
  intentDistribution = [],
  projectTypeDistribution = [],
  statusDistribution = [],
  leadsOverTime = [],
  conversationsOverTime = [],
}) {
  const intentColors = {
    portfolio: "from-[#BE93FD] to-[#D65DB1]",
    project: "from-[#D65DB1] to-[#FF6F91]",
    service: "from-cyan-400 to-blue-500",
    technical: "from-emerald-400 to-teal-500",
    contact: "from-amber-400 to-orange-500",
    pricing: "from-violet-400 to-purple-600",
    lead: "from-pink-500 to-rose-500",
    general: "from-indigo-400 to-purple-400",
    unsupported: "from-gray-400 to-slate-600",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Intent Distribution Card */}
      <div className="rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#BE93FD]/10 border border-[#BE93FD]/30 flex items-center justify-center text-[#DCB0FF]">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#FDF7FF]">
                Query Intent Distribution
              </h4>
              <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70">
                Classified user intent across conversations
              </p>
            </div>
          </div>
        </div>

        {intentDistribution.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono-tech text-[#CBB5E2]/60">
            Not enough data yet.
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {intentDistribution.map((item, idx) => {
              const gradient = intentColors[item.intent] || "from-[#BE93FD] to-[#D65DB1]";
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-tech text-[#FDF7FF] capitalize flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#BE93FD] to-[#FF6F91]" />
                      <span>{item.intent}</span>
                    </span>
                    <span className="font-mono-tech text-[#DCB0FF] font-semibold">
                      {item.percentage}% ({item.count})
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-[#251540] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                      style={{ width: `${Math.max(item.percentage, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Type Distribution Card */}
      <div className="rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FF6F91]/10 border border-[#FF6F91]/30 flex items-center justify-center text-[#FF6F91]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#FDF7FF]">
                Requested Project Types
              </h4>
              <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70">
                Most requested project categories in client leads
              </p>
            </div>
          </div>
        </div>

        {projectTypeDistribution.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono-tech text-[#CBB5E2]/60">
            Not enough data yet.
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {projectTypeDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#FDF7FF]">
                    {item.projectType}
                  </span>
                  <span className="font-mono-tech text-[#FF6F91] font-semibold">
                    {item.percentage}% ({item.count} leads)
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#251540] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#D65DB1] to-[#FF6F91] transition-all duration-500"
                    style={{ width: `${Math.max(item.percentage, 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
