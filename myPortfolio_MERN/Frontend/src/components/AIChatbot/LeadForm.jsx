import React, { useState } from "react";
import { Sparkles, CheckCircle2, Rocket, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { submitLead } from "./services/chatbotApi";

export default function LeadForm({ data = {}, onSubmitRequirement }) {
  const servicesList =
    Array.isArray(data?.services) && data.services.length > 0
      ? data.services
      : [
          "Full-Stack MERN Web App",
          "E-Commerce Storefront",
          "Landing Page & UI/UX",
          "DevOps / CI/CD",
        ];
  const timelineList =
    Array.isArray(data?.timelineOptions) && data.timelineOptions.length > 0
      ? data.timelineOptions
      : ["1-2 Weeks", "3-4 Weeks", "1-2 Months", "Flexible"];
  const budgetList =
    Array.isArray(data?.budgetOptions) && data.budgetOptions.length > 0
      ? data.budgetOptions
      : ["₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "₹50,000+", "Flexible"];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(servicesList[0]);
  const [timeline, setTimeline] = useState(timelineList[1] || timelineList[0]);
  const [budget, setBudget] = useState(budgetList[1] || budgetList[0]);
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentSessionId = sessionStorage.getItem("aayush_ai_session_id") || "";

      await submitLead({
        sessionId: currentSessionId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType,
        timeline,
        budget,
        requirements: notes.trim(),
      });

      setIsSuccess(true);

      // Notify parent chat state with summary message if callback exists
      if (onSubmitRequirement) {
        const summaryText = `PROJECT REQUIREMENT SUBMITTED:
• Client Name: ${name.trim()}
• Email: ${email.trim()}
• Project Type: ${projectType}
• Timeline: ${timeline}
• Estimated Budget: ${budget}
${notes.trim() ? `• Features/Notes: ${notes.trim()}` : ""}`;
        onSubmitRequirement(summaryText);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setErrorMessage(
        err?.message || "I couldn't submit your project requirements right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="my-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-center space-y-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <h4 className="font-heading font-semibold text-xs text-emerald-300">
          Project Requirements Submitted!
        </h4>
        <p className="text-[11px] text-emerald-200/80 leading-relaxed">
          Your project requirements have been submitted successfully. Aayush can review the details and get back to you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="my-2.5 rounded-xl border border-[#BE93FD]/30 bg-[#160E26]/90 backdrop-blur-md p-3.5 shadow-xl space-y-2.5"
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <Rocket className="w-4 h-4 text-[#FF6F91]" />
        <div>
          <h4 className="font-heading font-semibold text-xs text-[#FDF7FF]">
            {data.title || "Project Requirement Intake"}
          </h4>
          <p className="text-[10px] text-[#CBB5E2]">
            {data.subtitle || "Fill in your details for a tailored project estimate"}
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name & Email Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aayush..."
            disabled={isSubmitting}
            className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg px-2 py-1.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D65DB1]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            disabled={isSubmitting}
            className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg px-2 py-1.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D65DB1]"
          />
        </div>
      </div>

      {/* Phone & Project Type Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
            Phone (Optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91..."
            disabled={isSubmitting}
            className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg px-2 py-1.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D65DB1]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            disabled={isSubmitting}
            className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-[#D65DB1]"
          >
            {servicesList.map((s, idx) => (
              <option key={idx} value={s} className="bg-[#160E26] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline & Budget Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
            Timeline
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            disabled={isSubmitting}
            className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-[#D65DB1]"
          >
            {timelineList.map((t, idx) => (
              <option key={idx} value={t} className="bg-[#160E26] text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
            Budget Range
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            disabled={isSubmitting}
            className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-[#D65DB1]"
          >
            {budgetList.map((b, idx) => (
              <option key={idx} value={b} className="bg-[#160E26] text-white">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Features / Requirements */}
      <div>
        <label className="block text-[10px] font-mono-tech text-[#DCB0FF] uppercase mb-0.5">
          Key Features & Requirements
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g., Auth, payment gateway, admin dashboard, custom design..."
          disabled={isSubmitting}
          className="w-full text-[11px] bg-[#221538] border border-[#BE93FD]/30 rounded-lg p-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D65DB1] resize-none"
        />
      </div>

      {/* Submit Action */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-bold text-xs shadow-md hover:shadow-[0_0_20px_rgba(214,93,177,0.5)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Submitting Requirements...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submit Project Requirements</span>
          </>
        )}
      </button>
    </form>
  );
}
