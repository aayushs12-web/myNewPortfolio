import React from "react";
import { Loader2 } from "lucide-react";

export default function AdminLoading({ message = "Loading admin data..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] p-0.5 mb-3 shadow-lg shadow-[#D65DB1]/20 animate-pulse">
        <div className="w-full h-full bg-[#160E26] rounded-[10px] flex items-center justify-center text-[#DCB0FF]">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      </div>
      <p className="text-xs font-mono-tech text-[#CBB5E2] animate-pulse">
        {message}
      </p>
    </div>
  );
}
