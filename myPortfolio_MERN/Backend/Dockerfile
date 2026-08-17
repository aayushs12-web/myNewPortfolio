# Production Dockerfile for Express Node.js Backend
FROM node:20-alpine

WORKDIR /app

# Copy package descriptors first to maximize layer caching
COPY package*.json ./

# Install only production dependencies for minimal footprint and maximum security
RUN npm ci --only=production

# Copy application source code
COPY . .

# Set Node environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Expose backend API port
EXPOSE 5000

# Healthcheck for Backend container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

# Run Node server
CMD ["node", "server.js"]
