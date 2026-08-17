# Build Stage: Compile Vite React App
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package management files first for efficient caching
COPY package*.json ./

# Install dependencies deterministically
RUN npm ci

# Copy full frontend application source code
COPY . .

# Pass build-time environment variables for Vite static replacement
ARG VITE_API_URL=/api
ARG VITE_SERVICE_ID
ARG VITE_TEMPLATE_ID
ARG VITE_PUBLIC_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SERVICE_ID=$VITE_SERVICE_ID
ENV VITE_TEMPLATE_ID=$VITE_TEMPLATE_ID
ENV VITE_PUBLIC_KEY=$VITE_PUBLIC_KEY

# Build the production bundle
RUN npm run build

# Production Stage: Lightweight Nginx Web Server
FROM nginx:stable-alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom high-performance Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Healthcheck to monitor container availability
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx server in foreground
CMD ["nginx", "-g", "daemon off;"]
