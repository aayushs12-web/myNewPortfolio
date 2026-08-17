# ⚡ Executive MERN Stack Portfolio — Aayush Sharma

> **A high-performance, executive-level full-stack portfolio built with MongoDB, Express.js, React 19, Node.js, Tailwind CSS, Framer Motion, Nginx, and Docker.**

---

## 🌟 Executive Summary

This portfolio represents a state-of-the-art web application engineered with modern MERN Stack technologies, ultra-responsive glassmorphic design, and production-grade DevOps automation. Designed around an **Amethyst Neon & Obsidian Executive** aesthetic, it features smooth 60 FPS animations, full client-side routing, an interactive contact system with EmailJS integration and MongoDB fallback, and a complete Dockerized Nginx deployment setup.

---

## 🎨 Design System & Visual Palette

### 🎨 Color Palette & HEX Codes

| Color Token | HEX / CSS Code | Visual Preview & Description |
| :--- | :--- | :--- |
| `--bg-dark` | `#0D0814` | ⬛ **Obsidian Amethyst**: Main deep cosmic background |
| `--bg-card` | `rgba(22, 14, 34, 0.75)` | 🟣 **Deep Glassmorphic Card**: Card & section background |
| `--accent-violet` | `#845EC2` | 💜 **Deep Violet**: Primary accent color |
| `--accent-lavender` | `#A178DF` | 🔮 **Vibrant Lavender**: Secondary brand highlight |
| `--accent-lilac` | `#BE93FD` | 🪻 **Electric Lilac**: Interactive glows & badge borders |
| `--accent-orchid` | `#DCB0FF` | 🌸 **Bright Orchid**: Subtle glow & text highlight |
| `--accent-pink` | `#FACCFF` | 💖 **Soft Neon Pink**: Secondary gradient highlight |
| `--accent-magenta` | `#D65DB1` | 🔮 **Cyber Magenta**: CTA buttons & active indicators |
| `--accent-coral` | `#FF6F91` | 🌺 **Vivid Electric Coral**: Hot hover states & focal points |
| `--text-primary` | `#FDF7FF` | 🤍 **Crisp Amethyst White**: Primary typography text |
| `--text-secondary` | `#CBB5E2` | 🩶 **Muted Lavender-Grey**: Subtitles & body text |

### 🌈 Hero & Action Gradients
- **Hero Text & Button Gradient**: `linear-gradient(135deg, #BE93FD 0%, #D65DB1 50%, #FF6F91 100%)`
- **Purple Accent Gradient**: `linear-gradient(135deg, #DCB0FF 0%, #BE93FD 50%, #845EC2 100%)`
- **Glassmorphic Hover Glow**: `box-shadow: 0 25px 60px 0 rgba(190, 147, 253, 0.35)`

---

## 🔤 Typography & Font Families

The typography system combines high-contrast display fonts with modern corporate sans-serif typefaces imported from Google Fonts:

| Font Role | Font Family | Applied Elements | CSS Utility Class |
| :--- | :--- | :--- | :--- |
| **Display Headings** | `'Sora', sans-serif` | Hero titles, `<h1>`, `<h2>` section headings | `.font-display` |
| **Body & Subtitles** | `'Plus Jakarta Sans', sans-serif` | Body text, paragraph, `<h3>`-`<h6>`, inputs | Default Body / `.font-heading` |
| **Technical Code** | `'JetBrains Mono', monospace` | Badges, code snippets, technical metrics | `.font-mono-tech` |

---

## 🛠️ Technology Stack

### 💻 Frontend (Client Side)
- **Framework**: React 19 (Vite build engine)
- **Styling**: Tailwind CSS v4 + Custom Vanilla CSS Design System
- **Animation Libraries**: Framer Motion 12, GSAP, Locomotive Scroll
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM v7 (Browser client routing: `/home`, `/services`, `/about`, `/contact`)
- **Email Service**: `@emailjs/browser` (Direct inquiry routing to inbox)

### ⚙️ Backend (Server Side)
- **Runtime**: Node.js v20+
- **Framework**: Express.js v4
- **Database**: MongoDB & Mongoose ORM
- **Security & Utilities**: Helmet, Express Rate Limit, Express Validator, Morgan, CORS

### 🐳 DevOps & Infrastructure
- **Web Server**: Nginx (Production static asset host + Reverse Proxy)
- **Containerization**: Docker Multi-Stage Build + Docker Compose
- **CI/CD Pipeline**: GitHub Actions (`.github/workflows/ci-cd.yml`)

---

## 🚀 Application Features & Core Sections

1. **⚡ Modern Cyber Hero Dashboard**:
   - Executive profile introduction with animated role carousel.
   - Interactive glassmorphic stat counters & status badges ("Available for hire").
   - Direct CTA triggers ("Explore Projects", "Contact Me").

2. **🛠️ Technical Arsenal (Skills Dashboard)**:
   - Dynamic tab filtering: `All`, `Frontend`, `Backend & APIs`, `Database & Cloud`, `Tools & Security`.
   - Continuous marquee animation showcasing full stack capabilities.

3. **👨‍💻 About & Specialty Showcase**:
   - Bio breakdown highlighting modern full-stack development expertise.
   - Core Specialty Cards:
     - **APIs & Backend & Integrations**: RESTful API Engineering, FastAPI Integration, JWT & OAuth Security, Thunder Client API Testing.
     - **Full-Stack Architecture**: Modern MERN solutions, scalable databases, microservices.

4. **💼 Interactive Services Marketplace**:
   - Service cards (E-Commerce Web Apps, Full Stack Solutions, API & Microservices, UI/UX Modernization).
   - Dynamic interactive details modal for detailed scope exploration.

5. **✉️ Contact & Email System**:
   - Dual-action submission system:
     1. Dispatches message directly to inbox via **EmailJS** (`service_ugmin38`).
     2. Persists submission securely to **MongoDB database**.
   - Input validation, loading indicators, and toast feedback.

6. **🌊 Futuristic Glassmorphic Footer**:
   - Custom SVG wave divider.
   - Quick navigation links, social handle badges, and copyright details.

---

## ⚙️ Environment Variables Configuration

### 📁 Frontend `.env`
```env
# EmailJS Credentials
VITE_SERVICE_ID=
VITE_TEMPLATE_ID=
VITE_PUBLIC_KEY=

# Backend API URL
VITE_API_URL=http:
```

### 📁 Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb:
CLIENT_ORIGIN=http://localhost:5173
```

---

## 💻 Local Development Setup

### 1. Run Backend Server
```bash
cd myPortfolio_MERN/Backend
npm install
npm run dev
```

### 2. Run Frontend Client
```bash
cd myPortfolio_MERN/Frontend
npm install
npm run dev
```

---

## 🐳 Docker & Production Deployment

To launch the full production containerized stack locally with Nginx:

```bash
cd myPortfolio_MERN
docker compose up --build -d
```

- **Frontend App**: `http://localhost:80`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

---

## 📄 License & Credits

Designed & Developed by **Aayush Sharma**. All rights reserved.
