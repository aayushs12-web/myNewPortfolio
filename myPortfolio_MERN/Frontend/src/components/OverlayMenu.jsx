import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowUpRight, Mail, Sparkles, Code2 } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

const menuItems = [
  { num: "01", label: "HOME", path: "/", href: "home", desc: "Digital realm & hero stage" },
  { num: "02", label: "SERVICES", path: "/services", href: "ourservices", desc: "Full-stack & Modern Web Solutions" },
  { num: "03", label: "ABOUT ME", path: "/about", href: "about", desc: "Experience & capabilities" },
  { num: "04", label: "SKILLS", path: "/skills", href: "skills", desc: "Tech stack & tools" },
  { num: "05", label: "CONTACT US", path: "/contact", href: "contact", desc: "Start a project together" },
];

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aayush-sharma-14b259409/", icon: FaLinkedinIn },
  { name: "GitHub", href: "https://github.com/aayushs12-web", icon: FaGithub },
];

export default function OverlayMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    onClose();
    navigate(item.path);
    setTimeout(() => {
      if (item.path === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(item.href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0D0814]/95 backdrop-blur-3xl px-6 sm:px-12 py-8 overflow-y-auto"
          initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
          exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#BE93FD]/20 border border-[#BE93FD]/50 flex items-center justify-center text-[#BE93FD]">
                <Sparkles className="w-4 h-4 text-[#FF6F91]" />
              </div>
              <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-gray-200">
                NAVIGATION PORTAL
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full glass-card border border-[#BE93FD]/40 flex items-center justify-center text-white hover:text-[#FF6F91] hover:rotate-90 hover:border-[#D65DB1] hover:shadow-[0_0_25px_rgba(214,93,177,0.45)] transition-all duration-300 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto py-8 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ul className="lg:col-span-7 space-y-3 sm:space-y-4">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
                >
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="group flex items-center justify-between text-left w-full cursor-pointer bg-white/[0.02] hover:bg-[#845EC2]/25 border border-white/5 hover:border-[#BE93FD]/40 rounded-2xl p-3.5 sm:p-4 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono-tech text-xs sm:text-sm text-[#BE93FD] font-bold group-hover:scale-110 transition-transform">
                        {item.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-display font-black text-2xl sm:text-4xl text-white group-hover:text-[#FF6F91] transition-colors tracking-tight uppercase">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono-tech hidden sm:block">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gradient-to-r group-hover:from-[#BE93FD] group-hover:to-[#FF6F91] text-gray-400 group-hover:text-[#0D0814] flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-[#BE93FD]/30 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D65DB1]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-[#BE93FD] text-xs font-mono-tech font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-[#FF6F91]" />
                <span>FULL STACK SPECIALIST</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-white leading-tight">
                Engineering Modern Platforms & <span className="bg-gradient-to-r from-[#BE93FD] to-[#FF6F91] bg-clip-text text-transparent">Digital Solutions</span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Specialized in building full-stack MERN web applications, intuitive modern user interfaces, and cloud CI/CD pipelines.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => handleMenuClick({ path: "/contact", href: "contact" })}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(214,93,177,0.45)] transition-all duration-300 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>START A PROJECT</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono-tech">CONNECT:</span>
                <div className="flex gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#FF6F91] hover:border-[#BE93FD] hover:scale-110 transition-all duration-300"
                        title={s.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-3 font-mono-tech">
            <span>© {new Date().getFullYear()} AAYUSH SHARMA. ALL RIGHTS RESERVED.</span>
            <span className="text-[#BE93FD]">FULL-STACK MERN ARCHITECT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
