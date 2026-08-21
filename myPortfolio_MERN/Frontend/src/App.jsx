import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThreeCanvasBackground from "./components/ThreeCanvasBackground";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Ourservices from "./sections/Ourservices";
import ContactUs23 from "./sections/ContactUs23";
import Footer from "./sections/Footer";
import SectionDivider from "./components/SectionDivider";
import SEO from "./components/SEO";
import { Code2, Layers, Terminal, Zap, Cpu } from "lucide-react";

const routeToSection = {
  "/": "home",
  "/services": "ourservices",
  "/service": "ourservices",
  "/about": "about",
  "/skills": "skills",
  "/contact": "contact",
};

const sectionToRoute = {
  home: "/",
  ourservices: "/services",
  about: "/about",
  skills: "/skills",
  contact: "/contact",
};

function MainContent({ introDone }) {
  const location = useLocation();

  // Scroll to target section when user lands on or types a browser URL like /, /services, /service, /about, /skills, /contact
  useEffect(() => {
    const targetSectionId = routeToSection[location.pathname];
    if (targetSectionId) {
      if (targetSectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(targetSectionId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    }
  }, [location.pathname]);

  // Keep browser address bar dynamically updated to /, /services, /about, /skills, /contact as the user scrolls
  useEffect(() => {
    const sections = ["home", "ourservices", "about", "skills", "contact"];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let currentSection = "";
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 300 && rect.bottom >= 300) {
                currentSection = sectionId;
                break;
              }
            }
          }
          if (currentSection && sectionToRoute[currentSection]) {
            const targetPath = sectionToRoute[currentSection];
            if (window.location.pathname !== targetPath) {
              window.history.replaceState(null, "", targetPath);
              window.dispatchEvent(
                new CustomEvent("portfolio:route-change", { detail: { pathname: targetPath } })
              );
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative z-10">
      <Home introDone={introDone} />
      <SectionDivider icon={Code2} />
      <Ourservices />
      <SectionDivider icon={Layers} />
      <About />
      <SectionDivider icon={Terminal} />
      <Skills />
      <SectionDivider icon={Zap} />
      <ContactUs23 />
    </main>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative bg-[#081014] text-[#F4FBFB] selection:bg-[#45A9A9]/40 selection:text-[#98E8DE] min-h-screen">
      {/* Route-Aware Dynamic SEO Management */}
      <SEO />

      {/* Ambient Canvas Background */}
      <ThreeCanvasBackground />

      {/* Floating Glass Pill Navbar */}
      <Navbar />

      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<MainContent introDone={introDone} />} />
        <Route path="/services" element={<MainContent introDone={introDone} />} />
        <Route path="/about" element={<MainContent introDone={introDone} />} />
        <Route path="/contact" element={<MainContent introDone={introDone} />} />
        <Route path="*" element={<MainContent introDone={introDone} />} />
      </Routes>

      <SectionDivider icon={Cpu} />
      <Footer />
    </div>
  );
}


