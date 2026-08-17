import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThreeCanvasBackground from "./components/ThreeCanvasBackground";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Ourservices from "./sections/Ourservices";
import ContactUs23 from "./sections/ContactUs23";
import Footer from "./sections/Footer";
import SectionDivider from "./components/SectionDivider";
import { Code2, Layers, Terminal, Zap, Cpu } from "lucide-react";

const routeToSection = {
  "/": "home",
  "/home": "home",
  "/service": "ourservices",
  "/services": "ourservices",
  "/about": "about",
  "/skills": "skills",
  "/contact": "contact",
};

const sectionToRoute = {
  home: "/home",
  ourservices: "/services",
  about: "/about",
  skills: "/skills",
  contact: "/contact",
};

function MainContent({ introDone }) {
  const location = useLocation();

  // Scroll to target section when user lands on or types a browser URL like /home, /services, /service, /about, /skills, /contact
  useEffect(() => {
    const targetSectionId = routeToSection[location.pathname];
    if (targetSectionId) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [location.pathname]);

  // Keep browser address bar dynamically updated to /home, /services, /about, /skills, /contact as the user scrolls
  useEffect(() => {
    const sections = ["home", "ourservices", "about", "skills", "contact"];
    const handleScroll = () => {
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
        }
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
      {/* Ambient Canvas Background */}
      <ThreeCanvasBackground />

      {/* Floating Glass Pill Navbar */}
      <Navbar />

      <Routes>
        <Route path="*" element={<MainContent introDone={introDone} />} />
      </Routes>

      <SectionDivider icon={Cpu} />
      <Footer />
    </div>
  );
}


