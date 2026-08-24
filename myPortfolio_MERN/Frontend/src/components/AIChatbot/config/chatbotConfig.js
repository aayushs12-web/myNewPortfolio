/**
 * Aayush AI Chatbot Configuration
 * Centralized branding, theming, and behavior settings.
 */

export const CHATBOT_CONFIG = {
  brand: {
    name: "Aayush AI",
    subtitle: "AI Portfolio & Technical Assistant",
    avatarBadge: "AI",
    developerName: "Aayush Sharma",
    role: "Full-Stack MERN Developer",
    statusText: "Online & Ready",
    statusActive: true,
  },
  theme: {
    colors: {
      primaryGradient: "from-[#BE93FD] via-[#D65DB1] to-[#FF6F91]",
      cardBg: "rgba(18, 12, 28, 0.88)",
      panelBorder: "rgba(190, 147, 253, 0.28)",
      glowAccent: "rgba(214, 93, 177, 0.35)",
      userBubbleBg: "linear-gradient(135deg, #845EC2 0%, #D65DB1 100%)",
      aiBubbleBg: "rgba(26, 17, 40, 0.85)",
    },
  },
  quickActions: [
    {
      id: "services",
      label: "Explore Services",
      icon: "Sparkles",
      prompt: "What web development and technical services do you offer?",
    },
    {
      id: "projects",
      label: "View Projects",
      icon: "FolderGit2",
      prompt: "Show me your featured MERN stack projects and work.",
    },
    {
      id: "technical",
      label: "Ask Technical Question",
      icon: "Code2",
      prompt: "Can you explain how JWT authentication works in a MERN application?",
    },
    {
      id: "lead",
      label: "Start a Project",
      icon: "Rocket",
      prompt: "I'd like to discuss building a new web application project with Aayush.",
    },
  ],
  defaultSuggestions: [
    "What services do you offer?",
    "Show me your MERN projects",
    "Explain JWT authentication",
    "How can I contact Aayush?",
    "I need an e-commerce website",
  ],
  behavior: {
    maxInputChars: 1000,
    mockResponseDelayMs: 650,
    autoScrollDelayMs: 80,
  },
};
