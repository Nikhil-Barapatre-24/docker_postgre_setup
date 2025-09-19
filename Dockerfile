# Build stage
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --only=production && npm cache clean --force
COPY . .

# Runtime stage
FROM node:24-alpine AS runtime
RUN apk add --no-cache libc6-compat && rm -rf /var/cache/apk/*
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/postcss.config.mjs ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

