import React from "react";
import { MessageSquare, Calendar, Clock, Eye, Layers } from "lucide-react";

export default function ConversationTable({ conversations = [], onSelectConversation }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl shadow-xl">
      <table className="w-full text-left text-xs text-[#EBE0F7]">
        <thead className="bg-[#1F1336] text-[10px] font-mono-tech text-[#DCB0FF] uppercase tracking-wider border-b border-[#BE93FD]/20">
          <tr>
            <th className="py-3.5 px-4 font-semibold">Session ID</th>
            <th className="py-3.5 px-4 font-semibold">Messages</th>
            <th className="py-3.5 px-4 font-semibold">Source</th>
            <th className="py-3.5 px-4 font-semibold">Started At</th>
            <th className="py-3.5 px-4 font-semibold">Last Active</th>
            <th className="py-3.5 px-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#BE93FD]/10">
          {conversations.map((conv) => (
            <tr
              key={conv._id || conv.sessionId}
              className="hover:bg-[#BE93FD]/5 transition-colors duration-150 group"
            >
              {/* Session ID */}
              <td className="py-3.5 px-4 font-mono-tech text-[11px] text-[#DCB0FF]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#2A1845] border border-[#BE93FD]/30 flex items-center justify-center text-[#DCB0FF] shrink-0">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <span className="truncate max-w-[180px] sm:max-w-[240px]">
                    {conv.sessionId}
                  </span>
                </div>
              </td>

              {/* Messages Count */}
              <td className="py-3.5 px-4">
                <span className="px-2.5 py-0.5 rounded-full bg-[#BE93FD]/15 border border-[#BE93FD]/30 text-[#DCB0FF] font-mono-tech text-[11px]">
                  {conv.messageCount || 0} turns
                </span>
              </td>

              {/* Source */}
              <td className="py-3.5 px-4 text-[#CBB5E2] font-mono-tech text-[11px]">
                {conv.source || "portfolio"}
              </td>

              {/* Started At */}
              <td className="py-3.5 px-4 text-[#CBB5E2]/80 font-mono-tech text-[10px]">
                {conv.startedAt
                  ? new Date(conv.startedAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </td>

              {/* Last Active */}
              <td className="py-3.5 px-4 text-[#CBB5E2]/80 font-mono-tech text-[10px]">
                {conv.lastActiveAt
                  ? new Date(conv.lastActiveAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </td>

              {/* Action */}
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => onSelectConversation(conv.sessionId)}
                  className="flex items-center gap-1 ml-auto px-2.5 py-1 rounded-lg bg-[#2A1845] hover:bg-[#3D2364] border border-[#BE93FD]/30 text-[#FDF7FF] text-[11px] font-medium transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#DCB0FF]" />
                  <span>Inspect</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
