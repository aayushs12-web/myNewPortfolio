import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OverlayMenu from "./OverlayMenu";
import { ArrowUpRight, Command } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/home", sectionId: "home" },
  { name: "Services", href: "/services", sectionId: "ourservices" },
  { name: "About Me", href: "/about", sectionId: "about" },
  { name: "Contact Us", href: "/contact", sectionId: "contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 120 && currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;

      const sections = ["home", "ourservices", "about", "skills", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    navigate(link.href);
    const el = document.getElementById(link.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-0 w-full z-50 px-4 sm:px-8 transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2.5 px-4 sm:px-6 rounded-full glass-card border border-[#BE93FD]/35 shadow-[0_15px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          {/* Logo Brand Section */}
          <a
            href="/home"
            onClick={(e) => handleNavClick(e, { href: "/home", sectionId: "home" })}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#845EC2] via-[#D65DB1] to-[#FF6F91] p-[1.5px] shadow-[0_0_20px_rgba(190,147,253,0.4)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-full bg-[#0D0814] flex items-center justify-center">
                <span className="font-display font-extrabold text-base bg-gradient-to-r from-[#BE93FD] to-[#FF6F91] bg-clip-text text-transparent tracking-tighter">
                  AS
                </span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-base sm:text-lg text-white leading-tight">
                Aayush <span className="bg-gradient-to-r from-[#BE93FD] to-[#FF6F91] bg-clip-text text-transparent">Sharma</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 px-6 py-2 rounded-full bg-[#160E22]/80 border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId || location.pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative flex flex-col items-center text-xs font-heading font-semibold tracking-wide transition-all duration-300 ${
                    isActive ? "text-[#BE93FD] font-bold" : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F91] mt-1 shadow-[0_0_8px_#FF6F91]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, { href: "/contact", sectionId: "contact" })}
              className="hidden sm:flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#BE93FD] via-[#D65DB1] to-[#FF6F91] text-[#0D0814] font-display font-extrabold text-xs tracking-wide shadow-[0_0_25px_rgba(214,93,177,0.45)] hover:shadow-[0_0_35px_rgba(255,111,145,0.7)] hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <span>Let's Connect</span>
              <div className="w-6 h-6 rounded-full bg-[#0D0814] text-[#BE93FD] flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Mobile Hamburger Trigger (Hidden on Desktop) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-11 h-11 rounded-full glass-card border border-[#BE93FD]/40 flex items-center justify-center group cursor-pointer focus:outline-none hover:border-[#D65DB1] hover:shadow-[0_0_25px_rgba(214,93,177,0.45)] transition-all duration-300"
              aria-label="Toggle Navigation Menu"
            >
              <Command className={`w-5 h-5 text-[#BE93FD] transition-transform duration-300 ${menuOpen ? "rotate-90 text-[#FF6F91]" : "group-hover:rotate-45"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
