import React, { useEffect, useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  DollarSign,
  Clock,
  Globe,
  FileText,
  MessageSquare,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { getAdminLeadById, updateAdminLeadStatus } from "../../../../services/adminApi";
import LeadStatusBadge from "./LeadStatusBadge";
import AdminLoading from "./AdminLoading";

export default function LeadDrawer({ leadId, onClose, onViewConversation }) {
  const [leadData, setLeadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!leadId) return;

    let isMounted = true;
    const fetchLead = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAdminLeadById(leadId);
        if (isMounted) {
          setLeadData(data.lead);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load lead details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLead();
    return () => {
      isMounted = false;
    };
  }, [leadId]);

  const handleStatusChange = async (newStatus) => {
    if (!leadId) return;
    try {
      const result = await updateAdminLeadStatus(leadId, newStatus);
      if (result.lead) {
        setLeadData(result.lead);
      }
    } catch (err) {
      alert(err?.message || "Could not update status.");
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!leadId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#160E26] border-l border-[#BE93FD]/30 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#BE93FD]/20 bg-[#1A102E]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#160E26] rounded-[10px] flex items-center justify-center text-[#DCB0FF]">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#FDF7FF]">
                Project Lead Details
              </h3>
              <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70">
                Lead ID: {leadId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 text-[#CBB5E2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading && <AdminLoading message="Loading lead parameters..." />}

          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !error && leadData && (
            <>
              {/* Top Summary Card */}
              <div className="p-4 rounded-2xl bg-[#1E1233] border border-[#BE93FD]/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#FDF7FF] flex items-center gap-2">
                      <User className="w-4 h-4 text-[#DCB0FF]" />
                      <span>{leadData.name}</span>
                    </h4>
                    {leadData.businessType && (
                      <p className="text-xs text-[#CBB5E2] mt-0.5">
                        {leadData.businessType}
                      </p>
                    )}
                  </div>

                  <LeadStatusBadge
                    status={leadData.status}
                    editable={true}
                    onStatusChange={handleStatusChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#BE93FD]/20 text-xs">
                  <div className="flex items-center gap-2 text-[#CBB5E2]">
                    <Mail className="w-3.5 h-3.5 text-[#FF6F91]" />
                    <a
                      href={`mailto:${leadData.email}`}
                      className="hover:text-white transition-colors underline underline-offset-2"
                    >
                      {leadData.email}
                    </a>
                  </div>

                  {leadData.phone && (
                    <div className="flex items-center gap-2 text-[#CBB5E2]">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{leadData.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[#CBB5E2]/80 font-mono-tech text-[10px]">
                    <Calendar className="w-3 h-3 text-[#BE93FD]" />
                    <span>
                      Received: {new Date(leadData.createdAt).toLocaleDateString()} at{" "}
                      {new Date(leadData.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Scope & Parameters */}
              <div className="p-4 rounded-2xl bg-[#1E1233] border border-[#BE93FD]/20 space-y-3">
                <h5 className="text-xs font-mono-tech text-[#DCB0FF] uppercase tracking-wider">
                  Project Scope & Parameters
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#281745] border border-[#BE93FD]/20">
                    <span className="text-[10px] font-mono-tech text-[#CBB5E2]/70 block mb-1">
                      Project Type
                    </span>
                    <span className="font-semibold text-[#FDF7FF]">
                      {leadData.projectType}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#281745] border border-[#BE93FD]/20">
                    <span className="text-[10px] font-mono-tech text-[#CBB5E2]/70 block mb-1">
                      Budget
                    </span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{leadData.budget || "Not Specified"}</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#281745] border border-[#BE93FD]/20">
                    <span className="text-[10px] font-mono-tech text-[#CBB5E2]/70 block mb-1">
                      Timeline
                    </span>
                    <span className="font-semibold text-[#FF6F91] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{leadData.timeline || "Flexible"}</span>
                    </span>
                  </div>
                </div>

                {leadData.features && leadData.features.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono-tech text-[#CBB5E2]/70 block mb-1.5">
                      Requested Features
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {leadData.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#BE93FD]/15 border border-[#BE93FD]/30 text-[#DCB0FF] text-[11px]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Requirements Narrative */}
              {leadData.requirements && (
                <div className="p-4 rounded-2xl bg-[#1E1233] border border-[#BE93FD]/20 space-y-2">
                  <h5 className="text-xs font-mono-tech text-[#DCB0FF] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#FF6F91]" />
                    <span>Client Requirements</span>
                  </h5>
                  <p className="text-xs text-[#EBE0F7] leading-relaxed whitespace-pre-wrap bg-[#160E26]/60 p-3.5 rounded-xl border border-white/5">
                    {leadData.requirements}
                  </p>
                </div>
              )}

              {/* Additional Requirements */}
              {leadData.additionalRequirements && (
                <div className="p-4 rounded-2xl bg-[#1E1233] border border-[#BE93FD]/20 space-y-2">
                  <h5 className="text-xs font-mono-tech text-[#DCB0FF] uppercase tracking-wider">
                    Additional Notes
                  </h5>
                  <p className="text-xs text-[#EBE0F7] leading-relaxed whitespace-pre-wrap bg-[#160E26]/60 p-3.5 rounded-xl border border-white/5">
                    {leadData.additionalRequirements}
                  </p>
                </div>
              )}

              {/* Website & References */}
              {leadData.existingWebsite && (
                <div className="p-4 rounded-2xl bg-[#1E1233] border border-[#BE93FD]/20 text-xs">
                  <span className="text-[10px] font-mono-tech text-[#CBB5E2]/70 block mb-1">
                    Existing Website
                  </span>
                  <a
                    href={
                      leadData.existingWebsite.startsWith("http")
                        ? leadData.existingWebsite
                        : `https://${leadData.existingWebsite}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#DCB0FF] hover:underline flex items-center gap-1"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{leadData.existingWebsite}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              )}

              {/* Conversation Link & Action */}
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#BE93FD]/10 via-[#D65DB1]/10 to-transparent border border-[#BE93FD]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-[#FDF7FF]">
                      Originating Conversation
                    </h5>
                    <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70 truncate max-w-xs">
                      Session: {leadData.sessionId || "Direct Intake"}
                    </p>
                  </div>

                  {leadData.sessionId && (
                    <button
                      onClick={() => onViewConversation(leadData.sessionId)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-bold text-xs shadow-md hover:shadow-[0_0_20px_rgba(214,93,177,0.4)] transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>View Conversation</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-4 border-t border-[#BE93FD]/20 bg-[#1A102E]/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
