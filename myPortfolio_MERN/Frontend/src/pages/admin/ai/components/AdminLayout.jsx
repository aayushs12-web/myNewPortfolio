import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminAuthGate from "./AdminAuthGate";
import LeadDrawer from "./LeadDrawer";
import ConversationViewerModal from "./ConversationViewerModal";
import { getStoredAdminKey, clearStoredAdminKey } from "../../../../services/adminApi";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getStoredAdminKey());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const location = useLocation();

  const handleLogout = () => {
    clearStoredAdminKey();
    setIsAuthenticated(false);
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const getPageTitle = () => {
    if (location.pathname.includes("/leads")) return "Client Leads Management";
    if (location.pathname.includes("/conversations")) return "Chat Conversations";
    if (location.pathname.includes("/analytics")) return "Intelligence & Analytics";
    return "AI SaaS Dashboard";
  };

  const getPageSubtitle = () => {
    if (location.pathname.includes("/leads")) return "Monitor, filter, and track project inquiries";
    if (location.pathname.includes("/conversations")) return "Inspect live and historical multi-turn transcripts";
    if (location.pathname.includes("/analytics")) return "Real-time user intent breakdown and conversion metrics";
    return "Real-time overview of portfolio AI performance and client leads";
  };

  if (!isAuthenticated) {
    return <AdminAuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0512] text-[#FDF7FF] flex selection:bg-[#D65DB1]/30">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <AdminHeader
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          onRefresh={handleRefresh}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet
            context={{
              refreshTrigger,
              onSelectLead: (id) => setSelectedLeadId(id),
              onSelectConversation: (sessionId) => setSelectedSessionId(sessionId),
            }}
          />
        </main>
      </div>

      {/* Lead Detail Drawer */}
      {selectedLeadId && (
        <LeadDrawer
          leadId={selectedLeadId}
          onClose={() => setSelectedLeadId(null)}
          onViewConversation={(sessionId) => {
            setSelectedSessionId(sessionId);
          }}
        />
      )}

      {/* Conversation Inspector Modal */}
      {selectedSessionId && (
        <ConversationViewerModal
          sessionId={selectedSessionId}
          onClose={() => setSelectedSessionId(null)}
          onOpenLead={(leadId) => {
            setSelectedSessionId(null);
            setSelectedLeadId(leadId);
          }}
        />
      )}
    </div>
  );
}
