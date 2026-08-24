import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
} from "lucide-react";
import ConversationTable from "./components/ConversationTable";
import AdminLoading from "./components/AdminLoading";
import EmptyState from "./components/EmptyState";
import { getAdminConversations } from "../../../services/adminApi";

export default function Conversations() {
  const { refreshTrigger, onSelectConversation } = useOutletContext();
  const [conversations, setConversations] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [range, setRange] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConversationsData = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminConversations({
        page,
        limit: pagination.limit,
        search,
        range: range === "all" ? "" : range,
      });

      setConversations(res.items || []);
      setPagination({
        page: res.page || 1,
        limit: res.limit || 15,
        total: res.total || 0,
        totalPages: res.totalPages || 1,
      });
    } catch (err) {
      setError(err?.message || "Failed to load conversation sessions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversationsData(1);
  }, [range, refreshTrigger]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchConversationsData(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setIsLoading(true);
    getAdminConversations({
      page: 1,
      limit: pagination.limit,
      search: "",
      range: range === "all" ? "" : range,
    })
      .then((res) => {
        setConversations(res.items || []);
        setPagination({
          page: res.page || 1,
          limit: res.limit || 15,
          total: res.total || 0,
          totalPages: res.totalPages || 1,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-[#CBB5E2]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by session ID..."
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

      {/* Conversations Table or Empty State */}
      {isLoading ? (
        <AdminLoading message="Loading conversation sessions..." />
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-xs">{error}</span>
          </div>
          <button
            onClick={() => fetchConversationsData(pagination.page)}
            className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : conversations.length === 0 ? (
        <EmptyState
          title="No conversations found"
          description={
            search
              ? "No session matched your search query."
              : "User conversations with the portfolio chatbot will appear here."
          }
          icon={MessageSquare}
        />
      ) : (
        <>
          <ConversationTable
            conversations={conversations}
            onSelectConversation={onSelectConversation}
          />

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-2 text-xs text-[#CBB5E2]">
              <span className="font-mono-tech text-[11px]">
                Showing {conversations.length} of {pagination.total} sessions (Page{" "}
                {pagination.page} of {pagination.totalPages})
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchConversationsData(pagination.page - 1)}
                  className="p-1.5 rounded-lg bg-[#221538] border border-[#BE93FD]/20 text-[#DCB0FF] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchConversationsData(pagination.page + 1)}
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
