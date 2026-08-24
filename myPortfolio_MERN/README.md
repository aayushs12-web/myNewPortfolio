# ⚡ Executive MERN Stack Portfolio & Aayush AI Platform

> **A production-grade, executive-level full-stack portfolio and AI intelligence platform built with MongoDB Atlas, Express.js, React 19, Node.js, Google Gemini AI (with Function Calling and SSE Progressive Streaming), Tailwind CSS, Framer Motion, and a Private AI SaaS Admin Dashboard.**

---

## 🌟 Executive Summary

This repository hosts a state-of-the-art web application engineered with modern MERN Stack technologies, an intelligent portfolio assistant powered by Google Gemini, real-time Server-Sent Events (SSE) streaming, server-side intent classification, whitelisted backend tool execution, client project requirement intake, and a private AI Admin Dashboard for conversation monitoring, lead management, and aggregated analytics.

---

## 🏗️ System Architecture

### 1. Public Visitor AI Flow
```
User Query (React UI)
    │
    ▼
POST /api/chat/stream (SSE)
    │
    ├──▶ 1. Session Initialization & History Reconstruction
    ├──▶ 2. Deterministic Intent Classification (9 Intent Categories)
    ├──▶ 3. Selective Portfolio Context Assembly
    ├──▶ 4. Gemini SDK Interaction (@google/genai, gemini-3.6-flash)
    │        │
    │        ▼ (Optional Function Calling)
    │     Tool Request ──▶ Whitelist Registry & Executor Layer
    │                            │
    │                            ▼
    │                     Verified Portfolio Data / Draft Intake
    │                            │
    │                            ▼
    │                     Sanitized Tool Result passed back to Gemini
    │
    ├──▶ 5. Live Token Streaming over Server-Sent Events (SSE)
    ├──▶ 6. UI Card Derivation (ServiceCard, ProjectCard, LeadForm)
    └──▶ 7. Single Assistant Message Persistence in MongoDB Atlas
```

### 2. Private AI Admin Flow
```
Admin User
    │
    ▼
/admin/ai/dashboard (React SaaS Portal)
    │
    ├──▶ Auth Verification Gate (x-admin-key / Bearer Token)
    ├──▶ GET /api/admin/dashboard (Real-time KPIs & Recent Records)
    ├──▶ GET /api/admin/leads (Paginated, Searchable, Filterable Leads)
    ├──▶ GET /api/admin/conversations (Sessions & Multi-turn Message Inspector)
    └──▶ GET /api/admin/analytics (MongoDB Aggregations & Intent Distribution)
```

---

## 🛠️ Technology Stack

### 💻 Frontend (Client Side)
- **Framework**: React 19 (Vite build engine)
- **Styling**: Tailwind CSS v4 + Obsidian Amethyst Neon Design System
- **Animation**: Framer Motion 12, GSAP
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM v7
- **AI Streaming Client**: Native `ReadableStreamDefaultReader` with SSE Decoder

### ⚙️ Backend (Server Side)
- **Runtime**: Node.js v20+
- **Framework**: Express.js v4
- **Database**: MongoDB Atlas via Mongoose ODM (Non-blocking connection, reconnect listeners)
- **AI Engine**: Google Gen AI SDK (`@google/genai`, `gemini-3.6-flash`) with Function Calling
- **Security & Reliability**: Helmet, Express Rate Limit (Tiered), Express Validator, Morgan, CORS

---

## 📁 Repository Structure

```
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & DNS fallback
│   ├── controllers/
│   │   ├── adminController.js    # Dashboard KPIs, Leads CRUD, Analytics aggregations
│   │   ├── chatController.js     # Chat sessions, complete & SSE streaming endpoints
│   │   ├── leadController.js     # Client project intake & duplicate prevention
│   │   ├── contactController.js  # Public contact inquiries
│   │   ├── projectController.js  # Project showcases
│   │   └── serviceController.js  # Service offerings
│   ├── data/
│   │   └── portfolioKnowledge.js # Centralized portfolio facts & developer profile
│   ├── middleware/
│   │   ├── adminAuth.js          # Isolated admin authorization middleware
│   │   ├── errorHandler.js       # Sanitized production error handler
│   │   └── notFound.js           # 404 handler
│   ├── models/
│   │   ├── ChatMessage.js        # Individual chat turns with intent and session index
│   │   ├── ChatSession.js        # Conversation session lifecycle & counters
│   │   ├── Lead.js               # Client requirements with status workflow
│   │   ├── Contact.js            # Contact inquiries
│   │   ├── Project.js            # Project documents
│   │   └── Service.js            # Service documents
│   ├── prompts/
│   │   └── portfolioAssistant.js # System instructions & context prompt builders
│   ├── routes/
│   │   ├── adminRoutes.js        # Protected /api/admin endpoints
│   │   ├── chatRoutes.js         # /api/chat and /api/chat/stream endpoints
│   │   ├── leadRoutes.js         # /api/leads endpoint
│   │   ├── contactRoutes.js      # /api/contact endpoint
│   │   ├── projectRoutes.js      # /api/projects endpoint
│   │   └── serviceRoutes.js      # /api/services endpoint
│   ├── services/
│   │   ├── geminiService.js      # Gemini client, streaming, and tool execution loop
│   │   ├── intentClassificationService.js # 9-category deterministic intent classifier
│   │   └── portfolioContextService.js    # Dynamic context assembly
│   ├── tools/
│   │   ├── conversationTools.js  # getConversationSummary tool
│   │   ├── leadTools.js          # createLeadDraft tool
│   │   ├── portfolioTools.js     # getPortfolioProfile, getServices, getProjects, getProjectById, getContactInfo
│   │   ├── toolExecutor.js       # Tool authorization, execution boundary, and loop limiters
│   │   └── toolRegistry.js       # Approved tools whitelist & Google GenAI schemas
│   └── server.js                 # Express server with tiered rate limiting & graceful shutdown
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AIChatbot/        # React AI Chatbot UI (Panel, Trigger, MessageList, LeadForm, Cards)
    │   │   ├── Navbar.jsx        # Glassmorphic pill navbar
    │   │   └── SEO.jsx           # Dynamic route-aware SEO metadata
    │   ├── pages/
    │   │   └── admin/ai/         # Private AI Admin Portal (Dashboard, Leads, Conversations, Analytics)
    │   └── services/
    │       └── adminApi.js       # Admin client API service
    └── vite.config.js            # Vite build configuration with proxy & code splitting
```

---

## ⚙️ Environment Variables Specification

### 📁 Backend `.env` (Server-Side Secrets)

| Variable | Type | Visibility | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | Server-Only | Port on which the Express server listens (default: `5000`) |
| `NODE_ENV` | String | Server-Only | Environment mode (`development` or `production`) |
| `MONGO_URI` / `MONGODB_URI` | URI | Private | MongoDB Atlas connection string |
| `CLIENT_ORIGIN` | URL(s) | Server-Only | Allowed frontend origin(s), comma-separated for multiple |
| `JWT_SECRET` | Secret | Private | Secret key for JWT signing |
| `ADMIN_SECRET` | Secret | Private | Administrative secret for accessing `/api/admin/*` |
| `GEMINI_API_KEY` | Secret | Private | Google Gemini API key from AI Studio |
| `GEMINI_MODEL` | String | Server-Only | Model identifier (default: `gemini-3.6-flash`) |

> **IMPORTANT**: Never commit `Backend/.env` to Git. Keep `Backend/.env.example` as a template with placeholder values.

### 📁 Frontend `.env` (Public Client Configuration)

| Variable | Visibility | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | Public | Base URL for API requests (e.g. `/api` or `https://api.yourdomain.com/api`) |
| `VITE_SERVICE_ID` | Public | EmailJS Service ID |
| `VITE_TEMPLATE_ID` | Public | EmailJS Template ID |
| `VITE_PUBLIC_KEY` | Public | EmailJS Public Key |

---

## 📡 API Reference

### 🌐 Public AI & Portfolio Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status, uptime, and database connection |
| `POST` | `/api/chat/start` | Initializes a new chat session ID |
| `GET` | `/api/chat/session/:sessionId` | Retrieves historical messages for a session |
| `DELETE` | `/api/chat/session/:sessionId` | Clears conversation history for a session |
| `POST` | `/api/chat/stream` | Progressive live response streaming via Server-Sent Events (SSE) |
| `POST` | `/api/chat` | Standard complete chat response (backward compatible) |
| `POST` | `/api/leads` | Submits client project intake form with server-side validation |
| `POST` | `/api/contact` | Submits general contact inquiry |
| `GET` | `/api/projects` | Lists verified showcase projects |
| `GET` | `/api/services` | Lists verified development services |

### 🔒 Protected Admin Endpoints (`x-admin-key` or `Bearer` required)

| Method | Endpoint | Query Parameters / Body | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/auth/verify` | Header: `x-admin-key` | Validates admin secret passcode |
| `GET` | `/api/admin/dashboard` | — | Retrieves high-level KPI summary and recent records |
| `GET` | `/api/admin/leads` | `page`, `limit`, `search`, `status`, `projectType`, `range` | Paginated, filtered, and searchable leads list |
| `GET` | `/api/admin/leads/:id` | — | Retrieves single lead details with originating conversation |
| `PATCH` | `/api/admin/leads/:id/status` | Body: `{ status }` | Updates lead workflow status (`new`, `contacted`, `in-progress`, `completed`, `closed`) |
| `GET` | `/api/admin/conversations` | `page`, `limit`, `search`, `range` | Paginated conversation sessions list |
| `GET` | `/api/admin/conversations/:sessionId` | — | Retrieves full chronological message transcript |
| `GET` | `/api/admin/analytics` | `range` (`today`, `7d`, `30d`, `90d`, `all`) | Computes intent distribution, project types, and conversion metrics |

---

## 🛡️ Security & Reliability Features

1. **Zero Secret Exposure**: No database credentials, admin secrets, or Gemini API keys are accessible in frontend client bundles.
2. **Server-Side Authorization**: Private `/api/admin/*` routes reject unauthenticated requests with `HTTP 401 Unauthorized`.
3. **Whitelisted Function Calling**: Gemini cannot execute arbitrary scripts, database queries, or URLs. Only 7 explicitly approved tools in `toolRegistry.js` can execute.
4. **Tool Execution Boundaries**: Maximum 3 tool calls per conversational turn to prevent runaway loops.
5. **Tiered Rate Limiting**:
   - General API: 120 req / 15 min
   - AI Chat & Streaming: 40 req / 5 min per IP
   - Admin Login Verification: 15 attempts / 15 min
6. **Graceful Server Shutdown**: Handles `SIGTERM` and `SIGINT` by finishing active streams, closing HTTP connections, and closing MongoDB connections cleanly.
7. **Client Abort Signal Handling**: Disconnecting or closing the chatbot window aborts upstream Gemini generation, avoiding orphaned server processes.

---

## 💻 Local Development Setup

### 1. Run Backend Server
```bash
cd Backend
npm install
npm start
```

### 2. Run Frontend Client
```bash
cd Frontend
npm install
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Private Admin Dashboard**: `http://localhost:5173/admin/ai`
- **Backend API**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`

---

## 🧪 Running Automated Test Suites

```bash
# Phase 3: Intent Classification Suite (28 tests)
node Backend/scratch/test_phase3_unit.js

# Phase 4: Lead Validation Suite (7 tests)
node Backend/scratch/test_phase4_unit.js

# Phase 4: API Integration Suite (6 tests)
node Backend/scratch/test_phase4_api.js

# Phase 5: SSE Stream Protocol Suite
node Backend/scratch/test_sse_protocol.js

# Phase 6: Admin Dashboard & Security Suite (11 tests)
node Backend/scratch/test_phase6_admin.js

# Phase 7: Function Calling & Tools Suite (9 tests)
node Backend/scratch/test_phase7_tools.js

# Phase 8: Production Hardening & Health Suite (5 tests)
node Backend/scratch/test_phase8_production.js
```

---

## 📄 License & Credits

Designed & Developed by **Aayush Sharma**. All rights reserved.
