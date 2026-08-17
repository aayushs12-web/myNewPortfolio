# 🚀 MERN Stack Portfolio — Production Docker & CI/CD Setup

This repository contains full containerization and automated GitHub Actions CI/CD pipeline configurations for the portfolio.

---

## 🛠️ Architecture & Deployment Overview

```
GitHub Actions (CI/CD)
   │
   ├── 1. npm ci (Frontend & Backend)
   ├── 2. npm run build (Frontend bundle)
   └── 3. Docker build (Multi-stage Node + Nginx)
           │
           ▼
      Docker Images (Frontend & Backend)
           │
           ▼
      Production VPS / Server
           │
           ▼
   High-Performance Nginx Web Server
           │
           ▼
      Smooth 60 FPS Portfolio
```

---

## 🐳 1. Local Production Testing with Docker Compose

You can build and test the entire production setup locally with a single command:

```bash
cd myPortfolio_MERN
docker compose up --build -d
```

- **Frontend (Nginx)**: Runs at `http://localhost:80`
- **Backend (Express)**: Runs at `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

To stop containers:
```bash
docker compose down
```

---

## 🔑 2. GitHub Actions Secrets Configuration

To enable automated Docker image building and production deployment on push to `main`, configure the following Secrets under **Repository Settings ➔ Secrets and variables ➔ Actions**:

### 🎯 Required Environment Variables (Frontend Build)
| Secret Name | Description | Example |
|---|---|---|
| `VITE_SERVICE_ID` | EmailJS Service ID | `service_ugmin38` |
| `VITE_TEMPLATE_ID` | EmailJS Template ID | `template_rrvhwln` |
| `VITE_PUBLIC_KEY` | EmailJS Public Key | `1Y5QmzyMQqD78x-qz` |
| `VITE_API_URL` | Production Backend API URL | `/api` or `https://api.yourdomain.com/api` |

### 🐳 Docker Registry Secrets (Optional)
| Secret Name | Description |
|---|---|
| `DOCKER_USERNAME` | Docker Hub Username |
| `DOCKER_PASSWORD` | Docker Hub Access Token / Password |

### 🌐 Production Server SSH Deployment Secrets (Optional)
| Secret Name | Description |
|---|---|
| `SERVER_HOST` | Production VPS IP / Domain |
| `SERVER_USER` | SSH User (e.g. `root` or `ubuntu`) |
| `SSH_PRIVATE_KEY` | SSH Private Key for VPS access |

---

## ⚡ Performance Optimizations Included
1. **Multi-Stage Nginx Container**: Static Vite React assets compiled into lightweight Nginx container (~25MB total image size).
2. **Gzip & Caching**: Pre-configured `nginx.conf` with Gzip compression and 1-year immutable caching for static assets (`/assets/`).
3. **SPA Client-Side Routing**: All sub-routes (`/home`, `/service`, `/about`, `/contact`) fall back to `index.html` preventing 404 errors.
4. **Deterministic Dependencies**: Pipeline uses `npm ci` for fast, clean, reproducible builds.
