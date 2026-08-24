import React from "react";
import { Eye, MessageSquare, User, Mail, DollarSign, Clock, Calendar } from "lucide-react";
import LeadStatusBadge from "./LeadStatusBadge";

export default function LeadTable({ leads = [], onSelectLead, onSelectConversation, onStatusChange }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#BE93FD]/20 bg-[#160E26]/80 backdrop-blur-xl shadow-xl">
      <table className="w-full text-left text-xs text-[#EBE0F7]">
        <thead className="bg-[#1F1336] text-[10px] font-mono-tech text-[#DCB0FF] uppercase tracking-wider border-b border-[#BE93FD]/20">
          <tr>
            <th className="py-3.5 px-4 font-semibold">Client</th>
            <th className="py-3.5 px-4 font-semibold">Project Type</th>
            <th className="py-3.5 px-4 font-semibold">Budget</th>
            <th className="py-3.5 px-4 font-semibold">Timeline</th>
            <th className="py-3.5 px-4 font-semibold">Status</th>
            <th className="py-3.5 px-4 font-semibold">Received</th>
            <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#BE93FD]/10">
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="hover:bg-[#BE93FD]/5 transition-colors duration-150 group"
            >
              {/* Client Info */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#2A1845] border border-[#BE93FD]/30 flex items-center justify-center text-[#DCB0FF] shrink-0 font-bold text-xs">
                    {lead.name ? lead.name.charAt(0).toUpperCase() : "C"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#FDF7FF] block group-hover:text-[#DCB0FF] transition-colors">
                      {lead.name}
                    </span>
                    <span className="text-[10px] text-[#CBB5E2]/70 font-mono-tech block">
                      {lead.email}
                    </span>
                  </div>
                </div>
              </td>

              {/* Project Type */}
              <td className="py-3.5 px-4 font-medium text-[#FDF7FF]">
                <span className="px-2.5 py-1 rounded-lg bg-[#BE93FD]/10 border border-[#BE93FD]/20 text-[#DCB0FF] text-[11px] inline-block">
                  {lead.projectType}
                </span>
              </td>

              {/* Budget */}
              <td className="py-3.5 px-4 text-emerald-400 font-mono-tech">
                {lead.budget || "Flexible"}
              </td>

              {/* Timeline */}
              <td className="py-3.5 px-4 text-[#FF6F91] font-mono-tech">
                {lead.timeline || "Flexible"}
              </td>

              {/* Status */}
              <td className="py-3.5 px-4">
                <LeadStatusBadge
                  status={lead.status}
                  editable={true}
                  onStatusChange={(nextStatus) => onStatusChange(lead._id, nextStatus)}
                />
              </td>

              {/* Created Date */}
              <td className="py-3.5 px-4 text-[#CBB5E2]/80 font-mono-tech text-[10px]">
                {new Date(lead.createdAt).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  {lead.sessionId && onSelectConversation && (
                    <button
                      onClick={() => onSelectConversation(lead.sessionId)}
                      className="p-1.5 rounded-lg bg-[#BE93FD]/10 hover:bg-[#BE93FD]/25 text-[#DCB0FF] transition-colors cursor-pointer"
                      title="View originating conversation"
                      aria-label="View conversation"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => onSelectLead(lead._id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2A1845] hover:bg-[#3D2364] border border-[#BE93FD]/30 text-[#FDF7FF] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#DCB0FF]" />
                    <span>View</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
