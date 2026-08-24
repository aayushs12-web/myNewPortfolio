/**
 * Centralized Portfolio Knowledge Base (Backend)
 * Authoritative single source of truth for all verified developer facts, skills, services, projects, FAQs, and contact info.
 */

const PORTFOLIO_KNOWLEDGE = {
  developer: {
    name: "Aayush Sharma",
    title: "Full-Stack MERN Developer & Web Engineer",
    location: "Pali, Rajasthan, India (Open to Remote & Global Opportunities)",
    status: "Fresher / Actively Open for Full-time Roles & Freelance Projects",
    bio: "Passionate Full-Stack Developer specializing in modern MERN stack web applications, high-performance UI engineering with React 19 and Tailwind CSS, RESTful API architecture with Node.js/Express, Docker containerization, and automated CI/CD workflows.",
    experienceLevel: "Fresher with strong production-level full-stack project portfolio and modern web engineering depth.",
    stats: [
      { label: "Tech Arsenal", value: "18+ Technologies" },
      { label: "Core Focus", value: "MERN Stack" },
      { label: "Status", value: "Open to Work" },
      { label: "Location", value: "Pali, RJ & Remote" },
    ],
  },

  skills: {
    frontend: [
      "React 19",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS (v4)",
      "Bootstrap 5",
      "Next.js",
      "Framer Motion",
      "Responsive UI/UX Design",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose ODM",
      "RESTful API Design",
      "Redis",
      "JWT (JSON Web Tokens)",
      "OAuth 2.0",
      "Thunder Client / Postman",
    ],
    devopsAndCloud: [
      "Docker",
      "Kubernetes (K8s)",
      "AWS (EC2, S3)",
      "Git",
      "GitHub",
      "GitHub Actions (CI/CD Pipelines)",
      "Nginx",
      "Vercel Deployment",
    ],
  },

  services: [
    {
      id: "mern-web-app",
      title: "Full-Stack MERN Web App",
      badge: "Flagship",
      description:
        "High-performance, scalable full-stack web applications using MongoDB, Express, React 19, and Node.js with secure RESTful APIs and clean architecture.",
      deliverables: [
        "Custom RESTful API & Optimized Database Schema",
        "JWT & Role-Based Access Control (RBAC)",
        "Fast client rendering with React 19 & Tailwind CSS",
        "Clean modular codebase & cloud deployment",
      ],
      idealFor: "SaaS products, web portals, dashboards, and custom business platforms.",
    },
    {
      id: "ecommerce",
      title: "E-Commerce Websites",
      badge: "High-Converting",
      description:
        "Custom online storefronts featuring shopping carts, secure checkout gateways (Stripe/Razorpay), real-time order tracking, and dynamic admin management.",
      deliverables: [
        "Secure Payment Gateway Integration",
        "Custom Shopping Cart & Checkout Funnels",
        "Admin Product & Inventory Management",
        "Mobile-optimized conversion flows",
      ],
      idealFor: "D2C brands, online retailers, and digital storefronts.",
    },
    {
      id: "landing-page",
      title: "Landing Pages & UI/UX",
      badge: "Pixel-Perfect",
      description:
        "Visually stunning, high-converting landing pages built with fluid glassmorphism, responsive Tailwind CSS, interactive 3D micro-animations, and top Lighthouse scores.",
      deliverables: [
        "Modern Amethyst Glassmorphism Aesthetics",
        "Interactive 3D / Framer Motion Animations",
        "Lightning-fast load speed (100/100 Lighthouse)",
        "Fully responsive on all mobile and desktop screens",
      ],
      idealFor: "Product launches, agency portfolios, startups, and marketing campaigns.",
    },
    {
      id: "devops-cicd",
      title: "DevOps & Cloud Deployment",
      badge: "Infrastructure",
      description:
        "Automated deployment pipelines, multi-stage Docker containerization, cloud hosting setup on AWS/Vercel, and GitHub Actions CI/CD automation.",
      deliverables: [
        "Multi-stage Dockerfile & docker-compose configurations",
        "GitHub Actions CI/CD testing and build workflows",
        "Nginx reverse proxy & SSL certificate setup",
        "Environment variables & secret management",
      ],
      idealFor: "Reliable production infrastructure and seamless continuous delivery.",
    },
  ],

  projects: [
    {
      id: "mern-portfolio-ai",
      title: "AI-Powered MERN Developer Portfolio",
      description:
        "A futuristic developer portfolio featuring interactive 3D stage rendering, smooth route synchronization, technical SEO architecture, and embedded Aayush AI assistant.",
      tags: ["React 19", "Tailwind CSS v4", "Framer Motion", "Node.js", "MongoDB", "Three.js"],
      githubUrl: "https://github.com/aayushs12-web/myNewPortfolio",
      liveUrl: "https://aayush-sharma.dev",
      featured: true,
    },
    {
      id: "mern-ecommerce",
      title: "Full-Stack MERN E-Commerce Platform",
      description:
        "Feature-complete online shopping experience with product catalog, cart state management, user authentication with JWT, and administrative order dashboard.",
      tags: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "Tailwind CSS"],
      githubUrl: "https://github.com/aayushs12-web",
      liveUrl: null,
      featured: true,
    },
    {
      id: "devops-cicd-pipeline",
      title: "Dockerized Web App with CI/CD Automation",
      description:
        "Containerized full-stack deployment pipeline with automated multi-stage builds, linting, unit testing, and continuous deployment via GitHub Actions.",
      tags: ["Docker", "GitHub Actions", "CI/CD", "AWS", "Nginx"],
      githubUrl: "https://github.com/aayushs12-web",
      liveUrl: null,
      featured: false,
    },
  ],

  faqs: [
    {
      q: "Where is Aayush located?",
      a: "Aayush is based in Pali, Rajasthan, India, and is available for both on-site roles in India and remote opportunities worldwide.",
    },
    {
      q: "What is Aayush's primary tech stack?",
      a: "Aayush specializes in the MERN stack: MongoDB, Express.js, React 19, and Node.js, combined with Tailwind CSS v4, Docker, and CI/CD pipelines.",
    },
    {
      q: "How can I contact Aayush?",
      a: "You can reach out through the Contact page form on this website, connect via LinkedIn (linkedin.com/in/aayush-sharma-14b259409/), or email directly at contact@aayushsharma.dev.",
    },
  ],

  contact: {
    email: "contact@aayushsharma.dev",
    location: "Pali, Rajasthan, India",
    availability: "Available for full-time roles, freelance projects, and remote work worldwide",
    contactForm: "Available via the Contact Us page on this website",
  },

  links: {
    portfolio: "https://aayush-sharma.dev",
    github: "https://github.com/aayushs12-web",
    linkedin: "https://www.linkedin.com/in/aayush-sharma-14b259409/",
  },

  socials: {
    github: "https://github.com/aayushs12-web",
    linkedin: "https://www.linkedin.com/in/aayush-sharma-14b259409/",
    email: "contact@aayushsharma.dev",
    portfolioUrl: "https://aayush-sharma.dev",
  },
};

module.exports = { PORTFOLIO_KNOWLEDGE };
