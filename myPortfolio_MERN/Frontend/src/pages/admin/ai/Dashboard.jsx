import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Sparkles,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  Clock,
  Layers,
} from "lucide-react";
import StatsCard from "./components/StatsCard";
import LeadTable from "./components/LeadTable";
import ConversationTable from "./components/ConversationTable";
import AdminLoading from "./components/AdminLoading";
import EmptyState from "./components/EmptyState";
import { getDashboardSummary, updateAdminLeadStatus } from "../../../services/adminApi";

export default function Dashboard() {
  const { refreshTrigger, onSelectLead, onSelectConversation } = useOutletContext();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getDashboardSummary();
      setData(res);
    } catch (err) {
      setError(err?.message || "Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [refreshTrigger]);

  const handleStatusChange = async (leadId, nextStatus) => {
    try {
      await updateAdminLeadStatus(leadId, nextStatus);
      fetchSummary();
    } catch (err) {
      alert(err?.message || "Failed to update status.");
    }
  };

  if (isLoading) {
    return <AdminLoading message="Loading dashboard metrics..." />;
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span className="text-xs">{error}</span>
        </div>
        <button
          onClick={fetchSummary}
          className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  const summary = data?.summary || {
    totalConversations: 0,
    totalLeads: 0,
    newLeads: 0,
    conversionRate: 0,
  };

  const recentLeads = data?.recentLeads || [];
  const recentConversations = data?.recentConversations || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Conversations"
          value={summary.totalConversations}
          subtitle="Multi-turn sessions recorded"
          icon={MessageSquare}
          color="purple"
        />
        <StatsCard
          title="Total Leads"
          value={summary.totalLeads}
          subtitle="Project inquiries collected"
          icon={Users}
          color="pink"
        />
        <StatsCard
          title="New Inquiries"
          value={summary.newLeads}
          subtitle="Awaiting initial response"
          icon={Sparkles}
          color="cyan"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${summary.conversionRate}%`}
          subtitle="Chat-to-lead conversion"
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      {/* Recent Leads Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#FDF7FF] tracking-tight">
              Recent Client Leads
            </h3>
            <p className="text-[11px] font-mono-tech text-[#CBB5E2]/70">
              Latest client requirements submitted via AI Intake
            </p>
          </div>

          <Link
            to="/admin/ai/leads"
            className="flex items-center gap-1.5 text-xs text-[#DCB0FF] hover:text-white font-medium transition-colors"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <EmptyState
            title="No client leads yet"
            description="Client project submissions captured through the chatbot will appear here."
          />
        ) : (
          <LeadTable
            leads={recentLeads}
            onSelectLead={onSelectLead}
            onSelectConversation={onSelectConversation}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Recent Conversations Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#FDF7FF] tracking-tight">
              Recent Conversations
            </h3>
            <p className="text-[11px] font-mono-tech text-[#CBB5E2]/70">
              Recent active user dialogs with Aayush AI
            </p>
          </div>

          <Link
            to="/admin/ai/conversations"
            className="flex items-center gap-1.5 text-xs text-[#DCB0FF] hover:text-white font-medium transition-colors"
          >
            <span>View All Conversations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentConversations.length === 0 ? (
          <EmptyState
            title="No conversations yet"
            description="User conversations with the portfolio chatbot will appear here."
            icon={MessageSquare}
          />
        ) : (
          <ConversationTable
            conversations={recentConversations}
            onSelectConversation={onSelectConversation}
          />
        )}
      </div>
    </div>
  );
}
