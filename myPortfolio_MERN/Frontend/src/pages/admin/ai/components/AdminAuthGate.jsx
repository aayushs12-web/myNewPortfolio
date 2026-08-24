import React, { useState } from "react";
import { ShieldCheck, Key, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { verifyAdminKey } from "../../../../services/adminApi";

export default function AdminAuthGate({ onAuthenticated }) {
  const [keyInput, setKeyInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const isValid = await verifyAdminKey(keyInput.trim());
      if (isValid) {
        onAuthenticated();
      } else {
        setError("Invalid admin secret key. Please check your configuration.");
      }
    } catch (err) {
      setError(err?.message || "Authentication request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0512] flex items-center justify-center p-4 selection:bg-[#D65DB1]/30">
      <div className="w-full max-w-md bg-[#160E26]/90 border border-[#BE93FD]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D65DB1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#BE93FD]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-0.5 mx-auto mb-3 shadow-lg shadow-[#D65DB1]/30">
            <div className="w-full h-full bg-[#160E26] rounded-[14px] flex items-center justify-center text-[#DCB0FF]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-bold text-[#FDF7FF] tracking-tight">
            Aayush AI Admin Portal
          </h2>
          <p className="text-xs text-[#CBB5E2] mt-1">
            Private Dashboard & Lead Management
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono-tech text-[#DCB0FF] uppercase mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#FF6F91]" />
              <span>Admin Secret Key</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter secret key..."
                disabled={isLoading}
                className="w-full text-xs bg-[#221538] border border-[#BE93FD]/30 rounded-xl px-3.5 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D65DB1] focus:shadow-[0_0_15px_rgba(214,93,177,0.3)] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!keyInput.trim() || isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-bold text-xs shadow-md hover:shadow-[0_0_25px_rgba(214,93,177,0.5)] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] font-mono-tech text-[#CBB5E2]/60 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-[#BE93FD]" />
            <span>Protected by server-side authorization middleware</span>
          </p>
        </div>
      </div>
    </div>
  );
}
