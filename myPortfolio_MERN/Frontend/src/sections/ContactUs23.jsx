import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Sparkles,
  CheckCircle2,
  Send,
  Globe,
  IndianRupee,
  User,
  Mail,
  MessageSquare,
  Clock,
  Zap,
  X,
  Layout,
  Code2,
  ShoppingCart,
  TrendingUp,
  Server,
  Layers,
  Check,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { submitContactToBackend } from "../api";

const SERVICES_LIST = [
  { id: "landing-page", name: "Landing page", icon: Layout, desc: "High-converting single page" },
  { id: "web-app", name: "Web application", icon: Code2, desc: "Full-stack web app" },
  { id: "e-commerce", name: "E-commerce website", icon: ShoppingCart, desc: "Online store & payments" },
  { id: "seo", name: "SEO optimization", icon: TrendingUp, desc: "Traffic & speed performance" },
  { id: "devops", name: "DevOps", icon: Server, desc: "CI/CD, Docker & Cloud" },
  { id: "other", name: "Other", icon: Layers, desc: "Custom digital solutions" },
];

const BUDGET_PRESETS = [
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,000,000",
  "₹1,000,000+",
  "Flexible / To Discuss"
];

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aayush-sharma-14b259409/", icon: FaLinkedinIn },
  { name: "GitHub", href: "https://github.com/aayushs12-web", icon: FaGithub },
];

export default function ContactUs23() {
  const formRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [idea, setIdea] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const toggleService = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Form Validation
    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMsg("Please select at least one service!");
      return;
    }
    if (!idea.trim()) {
      setErrorMsg("Please describe your project vision or requirements.");
      return;
    }
    
    setLoading(true);

    const finalBudget = customBudget.trim() ? `₹ ${customBudget.trim()}` : (budget || "Flexible");
    const payload = {
      name: name.trim(),
      email: email.trim(),
      service: selectedServices.join(", "),
      budget: finalBudget,
      idea: idea.trim(),
    };

    // Environment variables (.env) for EmailJS
    const serviceID = (import.meta.env.VITE_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_ugmin38").trim();
    const templateID = (import.meta.env.VITE_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_rrvhwln").trim();
    const publicKey = (import.meta.env.VITE_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "1Y5QmzyMQqD78x-qz").trim();

    // Comprehensive Template Params covering all possible EmailJS variable names
    const templateParams = {
      from_name: name.trim(),
      name: name.trim(),
      user_name: name.trim(),
      full_name: name.trim(),

      from_email: email.trim(),
      email: email.trim(),
      user_email: email.trim(),
      reply_to: email.trim(),

      to_name: "Aayush Sharma",

      service: selectedServices.join(", "),
      services: selectedServices.join(", "),
      user_service: selectedServices.join(", "),

      budget: finalBudget,
      user_budget: finalBudget,

      // Project idea / message aliases to match any template key in EmailJS dashboard
      message: idea.trim(),
      idea: idea.trim(),
      project_idea: idea.trim(),
      details: idea.trim(),
      user_message: idea.trim(),
      description: idea.trim(),
      notes: idea.trim(),
      inquiry_details: idea.trim(),
      body: idea.trim(),
      text: idea.trim(),

      summary: `Inquiry from ${name.trim()} (${email.trim()})\nServices: ${selectedServices.join(", ")}\nBudget: ${finalBudget}\nIdea: ${idea.trim()}`,
      content: `Inquiry from ${name.trim()} (${email.trim()})\nServices: ${selectedServices.join(", ")}\nBudget: ${finalBudget}\nIdea: ${idea.trim()}`,
    };

    let emailSentSuccessfully = false;

    try {
      // Initialize EmailJS Public Key
      emailjs.init({ publicKey });

      // Primary send method using templateParams
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      emailSentSuccessfully = true;
    } catch (err) {
      const detailErr = err?.text || err?.message || (typeof err === "string" ? err : JSON.stringify(err));

      // Attempt sendForm fallback if formRef is available
      if (formRef.current) {
        try {
          await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
          emailSentSuccessfully = true;
        } catch (formErr) {
          const formErrDetail = formErr?.text || formErr?.message || (typeof formErr === "string" ? formErr : JSON.stringify(formErr));
          setErrorMsg(`EmailJS Transmission Failed: ${formErrDetail || detailErr || "Unknown EmailJS Error"}`);
        }
      } else {
        setErrorMsg(`EmailJS Error: ${detailErr || "Failed to transmit inquiry email."}`);
      }
    }

    // Save to backend database asynchronously
    try {
      await submitContactToBackend(payload);
    } catch (err) {
      // Handled silently for production
    }

    setLoading(false);

    if (emailSentSuccessfully) {
      setSubmittedData(payload);
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setErrorMsg("");
    setName("");
    setEmail("");
    setSelectedServices([]);
    setBudget("");
    setCustomBudget("");
    setIdea("");
  };

  return (
    <section id="contact" className="relative w-full py-10 sm:py-16 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#BE93FD]/30 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase mb-4 shadow-[0_0_15px_rgba(190,147,253,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-[#FF6F91] animate-spin-slow" />
            <span>LET'S BUILD SOMETHING GREAT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase"
          >
            GET IN <span className="bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] bg-clip-text text-transparent">TOUCH</span>
          </motion.h2>

          <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Ready to bring your next idea to life? Select your required services, outline your budget, and send over your vision!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Details & Availability */}
          <motion.div
            className="lg:col-span-5 glass-card p-6 sm:p-9 rounded-3xl border border-[#BE93FD]/30 flex flex-col justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Ambient Top Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#BE93FD]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-mono-tech font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
                </span>
                <span>AVAILABLE FOR FREELANCE & CONTRACT</span>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-3xl text-white tracking-wide">
                  Let's Collaborate
                </h3>
                <p className="mt-2 text-gray-400 text-xs sm:text-sm leading-relaxed">
                  I specialize in crafting high-performance Web Applications, Landing Pages, E-commerce Platforms, and Cloud Solutions.
                </p>
              </div>

              {/* Main Location Info Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#BE93FD]/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#BE93FD]/30 to-[#FF6F91]/30 text-[#BE93FD] flex items-center justify-center shrink-0 border border-[#BE93FD]/50 shadow-[0_0_20px_rgba(190,147,253,0.3)]">
                    <Globe className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono-tech text-[#BE93FD] uppercase tracking-wider font-bold">LOCATION & WORK MODE</span>
                    <span className="text-sm sm:text-base font-bold text-white mt-0.5">
                      India — Available Worldwide Remote
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights & Guarantees */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#FF6F91]">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-mono-tech font-bold">FAST RESPONSE</span>
                  </div>
                  <span className="text-sm font-bold text-white mt-1">&lt; 2 Hours</span>
                  <span className="text-[11px] text-gray-400">Guaranteed feedback</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#BE93FD]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-mono-tech font-bold">QUALITY</span>
                  </div>
                  <span className="text-sm font-bold text-white mt-1">Production-Ready</span>
                  <span className="text-[11px] text-gray-400">Clean & tested code</span>
                </div>
              </div>
            </div>

            {/* Socials & Connect */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
              <div className="flex flex-col">
                <span className="text-xs font-mono-tech text-gray-300 font-bold uppercase">CONNECT WITH ME</span>
                <span className="text-[11px] text-gray-400">Check my active code repositories</span>
              </div>
              <div className="flex gap-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#FF6F91] hover:border-[#BE93FD] hover:bg-[#BE93FD]/10 hover:scale-110 transition-all duration-300 shadow-md"
                      title={s.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Amazing Contact Card Form */}
          <motion.div
            className="lg:col-span-7 glass-card p-6 sm:p-9 rounded-3xl border border-[#BE93FD]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Form Glow Effect */}
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#D65DB1]/15 rounded-full blur-3xl pointer-events-none" />

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Hidden EmailJS Fallback Input Fields */}
              <input type="hidden" name="from_name" value={name} />
              <input type="hidden" name="name" value={name} />
              <input type="hidden" name="user_name" value={name} />
              <input type="hidden" name="full_name" value={name} />
              <input type="hidden" name="from_email" value={email} />
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="user_email" value={email} />
              <input type="hidden" name="reply_to" value={email} />
              <input type="hidden" name="service" value={selectedServices.join(", ")} />
              <input type="hidden" name="services" value={selectedServices.join(", ")} />
              <input type="hidden" name="user_service" value={selectedServices.join(", ")} />
              <input type="hidden" name="budget" value={customBudget.trim() ? `₹ ${customBudget.trim()}` : (budget || "Flexible")} />
              <input type="hidden" name="user_budget" value={customBudget.trim() ? `₹ ${customBudget.trim()}` : (budget || "Flexible")} />
              <input type="hidden" name="message" value={idea} />
              <input type="hidden" name="idea" value={idea} />
              <input type="hidden" name="project_idea" value={idea} />
              <input type="hidden" name="details" value={idea} />
              <input type="hidden" name="description" value={idea} />
              <input type="hidden" name="notes" value={idea} />
              <input type="hidden" name="inquiry_details" value={idea} />
              <input type="hidden" name="user_message" value={idea} />
              <input type="hidden" name="body" value={idea} />
              <input type="hidden" name="text" value={idea} />
              <input type="hidden" name="summary" value={`Inquiry from ${name.trim()} (${email.trim()})\nServices: ${selectedServices.join(", ")}\nBudget: ${customBudget.trim() ? `₹ ${customBudget.trim()}` : (budget || "Flexible")}\nIdea: ${idea.trim()}`} />
              <input type="hidden" name="content" value={`Inquiry from ${name.trim()} (${email.trim()})\nServices: ${selectedServices.join(", ")}\nBudget: ${customBudget.trim() ? `₹ ${customBudget.trim()}` : (budget || "Flexible")}\nIdea: ${idea.trim()}`} />
              
              {/* Form Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-display font-bold text-lg sm:text-xl">
                  <Zap className="w-5 h-5 text-[#FF6F91]" />
                  <span>START A PROJECT INQUIRY</span>
                </div>
                <span className="text-xs font-mono-tech text-[#BE93FD] bg-[#BE93FD]/10 px-3 py-1 rounded-full border border-[#BE93FD]/20">
                  STEP-BY-STEP
                </span>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono-tech text-gray-300 font-bold uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#BE93FD]" />
                    <span>YOUR NAME *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#0D0814]/90 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#BE93FD] focus:ring-2 focus:ring-[#BE93FD]/30 transition-all text-sm font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono-tech text-gray-300 font-bold uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF6F91]" />
                    <span>YOUR EMAIL *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#0D0814]/90 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#BE93FD] focus:ring-2 focus:ring-[#BE93FD]/30 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Services Selection Grid */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono-tech text-gray-300 font-bold uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D65DB1]" />
                    <span>SERVICE WE NEED *</span>
                  </label>
                  <span className="text-[11px] font-mono-tech text-gray-400">
                    {selectedServices.length > 0 ? `${selectedServices.length} Selected` : "Select one or more"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICES_LIST.map((srv) => {
                    const Icon = srv.icon;
                    const isSelected = selectedServices.includes(srv.name);
                    return (
                      <motion.button
                        key={srv.id}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleService(srv.name)}
                        className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2.5 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? "bg-gradient-to-br from-[#BE93FD]/25 via-[#D65DB1]/20 to-[#FF6F91]/20 border-[#BE93FD] text-white shadow-[0_0_20px_rgba(190,147,253,0.3)]"
                            : "bg-[#0D0814]/70 border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={`p-2 rounded-xl ${isSelected ? "bg-[#BE93FD] text-[#0D0814]" : "bg-white/5 text-[#BE93FD]"}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#BE93FD] text-[#0D0814] flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold font-display block leading-tight">{srv.name}</span>
                          <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5 font-light">{srv.desc}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Budget Input with Rupees Icon (Revealed ONLY after selecting at least one service) */}
              <AnimatePresence>
                {selectedServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 15 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col gap-3 overflow-hidden pt-2"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono-tech text-gray-300 font-bold uppercase flex items-center gap-1.5">
                        <IndianRupee className="w-4 h-4 text-[#BE93FD]" />
                        <span>YOUR ESTIMATED BUDGET (RUPEES ₹) *</span>
                      </label>
                      <span className="text-[10px] font-mono-tech text-[#BE93FD] bg-[#BE93FD]/10 px-2 py-0.5 rounded border border-[#BE93FD]/20">
                        RUPEES CURRENCY
                      </span>
                    </div>

                    {/* Preset Budget Chips */}
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_PRESETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            setBudget(b);
                            setCustomBudget("");
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-mono-tech font-semibold transition-all cursor-pointer border ${
                            budget === b && !customBudget
                              ? "bg-gradient-to-r from-[#BE93FD] to-[#D65DB1] text-[#0D0814] border-transparent shadow-[0_0_15px_rgba(214,93,177,0.4)] scale-105"
                              : "bg-[#0D0814]/80 text-gray-300 border-white/10 hover:border-[#BE93FD]/50 hover:text-white"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {/* Custom Budget Input with Rupees Symbol Icon */}
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#BE93FD]">
                        <IndianRupee className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={customBudget}
                        onChange={(e) => {
                          setCustomBudget(e.target.value);
                          setBudget("");
                        }}
                        placeholder="Or enter custom budget (e.g. 45,000)"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0D0814]/90 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#BE93FD] focus:ring-2 focus:ring-[#BE93FD]/30 transition-all text-sm font-mono-tech"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Box */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono-tech text-gray-300 font-bold uppercase flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF6F91]" />
                  <span>PROJECT IDEA & DETAILS *</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your project vision, features, goals, or key timelines..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#0D0814]/90 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#BE93FD] focus:ring-2 focus:ring-[#BE93FD]/30 transition-all text-sm font-medium resize-none"
                />
              </div>

              {/* Error Message Box */}
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono-tech flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                  <button type="button" onClick={() => setErrorMsg("")} className="text-red-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Send Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(214,93,177,0.45)] hover:shadow-[0_0_45px_rgba(255,111,145,0.75)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                {loading ? (
                  <div className="flex items-center gap-2 font-mono-tech">
                    <span className="w-5 h-5 border-2 border-[#0D0814] border-t-transparent rounded-full animate-spin" />
                    <span>SENDING INQUIRY...</span>
                  </div>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* SUCCESS MODAL POPUP (Appears ONLY after successful email send) */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl border border-[#BE93FD]/50 shadow-[0_25px_70px_rgba(190,147,253,0.35)] text-center overflow-hidden"
            >
              {/* Background celebration glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#BE93FD]/30 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Animated Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] flex items-center justify-center shadow-[0_0_40px_rgba(214,93,177,0.6)] mb-6"
              >
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </motion.div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
                Email Sent Successfully! 🚀
              </h3>

              <p className="mt-3 text-gray-300 text-xs sm:text-sm leading-relaxed">
                Thank you <span className="text-[#BE93FD] font-bold">{submittedData?.name}</span>! Your message regarding{" "}
                <span className="text-[#FF6F91] font-bold">{submittedData?.service}</span> with an estimated budget of{" "}
                <span className="text-[#BE93FD] font-bold">{submittedData?.budget}</span> has been transmitted.
              </p>

              <div className="my-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs text-gray-300 space-y-2 font-mono-tech">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">EMAIL CONFIRMATION:</span>
                  <span className="text-white font-semibold">{submittedData?.email}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-400">EXPECTED RESPONSE:</span>
                  <span className="text-[#10B981] font-semibold">Within 24 Hours</span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#BE93FD] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(214,93,177,0.4)] hover:shadow-[0_0_35px_rgba(255,111,145,0.7)] transition-all cursor-pointer"
              >
                GOT IT, THANKS!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
