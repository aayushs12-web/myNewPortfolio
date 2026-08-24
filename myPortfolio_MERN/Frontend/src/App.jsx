import { useEffect, useState, lazy, Suspense } from "react";
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

// Route-level code splitting with React.lazy
const ArticlesIndex = lazy(() => import("./pages/ArticlesIndex"));
const ArticleView = lazy(() => import("./pages/ArticleView"));
const AhmedabadDeveloper = lazy(() => import("./pages/AhmedabadDeveloper"));
const GandhinagarDeveloper = lazy(() => import("./pages/GandhinagarDeveloper"));
const AIChatbot = lazy(() => import("./components/AIChatbot/AIChatbot"));

// Admin console code splitting
const AdminLayout = lazy(() => import("./pages/admin/ai/components/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/ai/Dashboard"));
const AdminLeads = lazy(() => import("./pages/admin/ai/Leads"));
const AdminConversations = lazy(() => import("./pages/admin/ai/Conversations"));
const AdminAnalytics = lazy(() => import("./pages/admin/ai/Analytics"));

// Lightweight Suspense Fallback matching design
function PageLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-[#BE93FD]/30 border-t-[#FF6F91] animate-spin shadow-[0_0_20px_rgba(214,93,177,0.4)]" />
        <span className="font-mono-tech text-xs text-[#BE93FD] font-semibold tracking-wider uppercase">Loading...</span>
      </div>
    </div>
  );
}

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

  // Scroll to target section when user lands on or navigates to /, /services, /service, /about, /skills, /contact
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

  // Performant IntersectionObserver to track visible sections without scroll layout thrashing
  useEffect(() => {
    const sections = ["home", "ourservices", "about", "skills", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && sectionToRoute[sectionId]) {
            const targetPath = sectionToRoute[sectionId];

            // Notify Navbar smoothly
            window.dispatchEvent(
              new CustomEvent("portfolio:section-change", { detail: { sectionId, pathname: targetPath } })
            );

            // Sync URL history state on single-page scroll without triggering full page reloads or /home redirects
            if (
              window.location.pathname !== targetPath &&
              !window.location.pathname.startsWith("/admin") &&
              !window.location.pathname.startsWith("/articles") &&
              !window.location.pathname.endsWith("-developer")
            ) {
              window.history.replaceState(null, "", targetPath);
            }
          }
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (
      location.pathname === "/ahmedabad-web-developer" ||
      location.pathname === "/gandhinagar-web-developer" ||
      location.pathname === "/articles" ||
      location.pathname.startsWith("/articles/")
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className="relative bg-[#081014] text-[#F4FBFB] selection:bg-[#45A9A9]/40 selection:text-[#98E8DE] min-h-screen">
      {/* Route-Aware Dynamic SEO Management */}
      <SEO />

      {!isAdminRoute && (
        <>
          {/* Ambient Canvas Background */}
          <ThreeCanvasBackground />

          {/* Floating Glass Pill Navbar */}
          <Navbar />

          {/* Aayush AI Portfolio & Technical Assistant (Deferred) */}
          <Suspense fallback={null}>
            <AIChatbot />
          </Suspense>
        </>
      )}

      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<MainContent introDone={introDone} />} />
          <Route path="/services" element={<MainContent introDone={introDone} />} />
          <Route path="/about" element={<MainContent introDone={introDone} />} />
          <Route path="/contact" element={<MainContent introDone={introDone} />} />
          <Route path="/ahmedabad-web-developer" element={<AhmedabadDeveloper />} />
          <Route path="/gandhinagar-web-developer" element={<GandhinagarDeveloper />} />
          <Route path="/articles" element={<ArticlesIndex />} />
          <Route path="/articles/:slug" element={<ArticleView />} />

          {/* Private Admin Area */}
          <Route path="/admin/ai" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="conversations" element={<AdminConversations />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          <Route path="*" element={<MainContent introDone={introDone} />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && (
        <>
          <SectionDivider icon={Cpu} />
          <Footer />
        </>
      )}
    </div>
  );
}
