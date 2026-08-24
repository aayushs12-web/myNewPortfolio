import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  ArrowLeft,
  Bot,
  Sparkles,
  Shield,
} from "lucide-react";

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/ai/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Client Leads",
      path: "/admin/ai/leads",
      icon: Users,
    },
    {
      label: "Conversations",
      path: "/admin/ai/conversations",
      icon: MessageSquare,
    },
    {
      label: "Analytics",
      path: "/admin/ai/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#120921] border-r border-[#BE93FD]/20 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-6 border-b border-[#BE93FD]/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#160E26] rounded-[10px] flex items-center justify-center text-[#DCB0FF]">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#FDF7FF] flex items-center gap-1.5">
              <span>Aayush AI</span>
              <span className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded bg-[#BE93FD]/20 text-[#DCB0FF] border border-[#BE93FD]/30">
                ADMIN
              </span>
            </h1>
            <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70">
              Intelligence & Leads
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#BE93FD]/20 via-[#D65DB1]/20 to-transparent text-[#FDF7FF] border border-[#BE93FD]/40 shadow-sm"
                    : "text-[#CBB5E2] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#DCB0FF]" : "text-[#CBB5E2]/70"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-[#BE93FD]/20 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#CBB5E2] hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
