import React from "react";
import { Menu, RefreshCw, LogOut, Database } from "lucide-react";

export default function AdminHeader({ title, subtitle, onRefresh, onLogout, onToggleSidebar }) {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-[#BE93FD]/20 bg-[#120921]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#CBB5E2] md:hidden cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-heading font-bold text-[#FDF7FF] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[10px] font-mono-tech text-[#CBB5E2]/70 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Atlas DB Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono-tech">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Atlas DB Live</span>
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-[#22133B] hover:bg-[#341D57] border border-[#BE93FD]/20 text-[#DCB0FF] hover:text-white transition-colors cursor-pointer"
            title="Refresh Data"
            aria-label="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {/* Logout button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium transition-colors cursor-pointer"
            title="Logout from Admin Portal"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
