# Backend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app/server

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm ci

# Backend builder
FROM base AS builder
WORKDIR /app/server
COPY --from=deps /app/server/node_modules ./node_modules
COPY server/ ./

# Production image
FROM base AS runner
WORKDIR /app/server

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy necessary files
COPY --from=builder --chown=nodejs:nodejs /app/server ./

USER nodejs

EXPOSE 5005

CMD ["node", "server.js"]
