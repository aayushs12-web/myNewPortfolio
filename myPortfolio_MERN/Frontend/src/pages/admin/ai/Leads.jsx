import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";
import LeadTable from "./components/LeadTable";
import AdminLoading from "./components/AdminLoading";
import EmptyState from "./components/EmptyState";
import { getAdminLeads, updateAdminLeadStatus } from "../../../services/adminApi";

export default function Leads() {
  const { refreshTrigger, onSelectLead, onSelectConversation } = useOutletContext();
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [projectType, setProjectType] = useState("all");
  const [range, setRange] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeadsData = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminLeads({
        page,
        limit: pagination.limit,
        search,
        status,
        projectType,
        range: range === "all" ? "" : range,
      });

      setLeads(res.items || []);
      setPagination({
        page: res.page || 1,
        limit: res.limit || 15,
        total: res.total || 0,
        totalPages: res.totalPages || 1,
      });
    } catch (err) {
      setError(err?.message || "Failed to load leads.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData(1);
  }, [status, projectType, range, refreshTrigger]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchLeadsData(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setIsLoading(true);
    getAdminLeads({
      page: 1,
      limit: pagination.limit,
      search: "",
      status,
      projectType,
      range: range === "all" ? "" : range,
    })
      .then((res) => {
        setLeads(res.items || []);
        setPagination({
          page: res.page || 1,
          limit: res.limit || 15,
          total: res.total || 0,
          totalPages: res.totalPages || 1,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleStatusChange = async (leadId, nextStatus) => {
    try {
      await updateAdminLeadStatus(leadId, nextStatus);
      fetchLeadsData(pagination.page);
    } catch (err) {
      alert(err?.message || "Failed to update lead status.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-[#CBB5E2]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, email, or project type..."
              className="w-full text-xs bg-[#221538] border border-[#BE93FD]/30 rounded-xl pl-9 pr-8 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D65DB1]"
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-xs bg-[#221538] border border-[#BE93FD]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D65DB1] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>

            {/* Project Type Filter */}
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="text-xs bg-[#221538] border border-[#BE93FD]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D65DB1] cursor-pointer"
            >
              <option value="all">All Projects</option>
              <option value="Full-Stack MERN Web App">Full-Stack MERN</option>
              <option value="E-Commerce Storefront">E-Commerce</option>
              <option value="Landing Page & UI/UX">Landing Page</option>
              <option value="DevOps / CI/CD">DevOps / CI/CD</option>
            </select>

            {/* Time Filter */}
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="text-xs bg-[#221538] border border-[#BE93FD]/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D65DB1] cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table or Empty State */}
      {isLoading ? (
        <AdminLoading message="Loading client leads..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-xs">{error}</span>
          </div>
          <button
            onClick={() => fetchLeadsData(pagination.page)}
            className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : leads.length === 0 ? (
        <EmptyState
          title="No client leads found"
          description={
            search || status !== "all" || projectType !== "all"
              ? "No leads matched your search or filter criteria."
              : "Captured client project leads will appear here."
          }
          icon={Users}
        />
      ) : (
        <>
          <LeadTable
            leads={leads}
            onSelectLead={onSelectLead}
            onSelectConversation={onSelectConversation}
            onStatusChange={handleStatusChange}
          />

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-2 text-xs text-[#CBB5E2]">
              <span className="font-mono-tech text-[11px]">
                Showing {leads.length} of {pagination.total} leads (Page {pagination.page} of{" "}
                {pagination.totalPages})
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchLeadsData(pagination.page - 1)}
                  className="p-1.5 rounded-lg bg-[#221538] border border-[#BE93FD]/20 text-[#DCB0FF] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchLeadsData(pagination.page + 1)}
                  className="p-1.5 rounded-lg bg-[#221538] border border-[#BE93FD]/20 text-[#DCB0FF] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
