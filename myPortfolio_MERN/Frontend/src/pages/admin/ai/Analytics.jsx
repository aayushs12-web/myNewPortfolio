import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import StatsCard from "./components/StatsCard";
import AnalyticsCharts from "./components/AnalyticsCharts";
import AdminLoading from "./components/AdminLoading";
import { getAdminAnalytics } from "../../../services/adminApi";

export default function Analytics() {
  const { refreshTrigger } = useOutletContext();
  const [range, setRange] = useState("30d");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = async (timeRange = range) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminAnalytics(timeRange);
      setData(res);
    } catch (err) {
      setError(err?.message || "Failed to calculate analytics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData(range);
  }, [range, refreshTrigger]);

  const ranges = [
    { label: "Today", value: "today" },
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
    { label: "All Time", value: "all" },
  ];

  const metrics = data?.metrics || {
    totalConversations: 0,
    totalLeads: 0,
    conversionRate: 0,
    averageMessagesPerConversation: 0,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Range Filter Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#DCB0FF]">
          <Calendar className="w-4 h-4 text-[#FF6F91]" />
          <span>Analytics Time Horizon:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                range === r.value
                  ? "bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-bold shadow-md shadow-[#D65DB1]/30"
                  : "bg-[#221538] text-[#CBB5E2] hover:text-white hover:bg-[#2F1B4C] border border-[#BE93FD]/20"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <AdminLoading message="Calculating AI analytics from MongoDB..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-xs">{error}</span>
          </div>
          <button
            onClick={() => fetchAnalyticsData(range)}
            className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsCard
              title="Recorded Sessions"
              value={metrics.totalConversations}
              subtitle="Filtered time range"
              icon={MessageSquare}
              color="purple"
            />
            <StatsCard
              title="Collected Leads"
              value={metrics.totalLeads}
              subtitle="Captured inquiries"
              icon={Users}
              color="pink"
            />
            <StatsCard
              title="Conversion Rate"
              value={`${metrics.conversionRate}%`}
              subtitle="Leads / Conversations"
              icon={TrendingUp}
              color="emerald"
            />
            <StatsCard
              title="Avg Turns / Chat"
              value={metrics.averageMessagesPerConversation}
              subtitle="Messages per session"
              icon={Clock}
              color="cyan"
            />
          </div>

          {/* Distribution & Performance Visualizations */}
          <AnalyticsCharts
            intentDistribution={data?.intentDistribution || []}
            projectTypeDistribution={data?.projectTypeDistribution || []}
            statusDistribution={data?.statusDistribution || []}
            leadsOverTime={data?.leadsOverTime || []}
            conversationsOverTime={data?.conversationsOverTime || []}
          />
        </>
      )}
    </div>
  );
}
