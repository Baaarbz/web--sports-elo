FROM node:18-alpine AS builder
LABEL authors="barbz"

WORKDIR /app

COPY package*.json ./
COPY next.config.mjs ./
COPY tsconfig.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.js ./

RUN npm ci

# Copy font code
COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copy from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install production dependencies
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]