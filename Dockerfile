# ── Build stage ──
FROM node:22-alpine AS build

WORKDIR /app

COPY Backend/package.json Backend/package-lock.json* ./
RUN npm ci

COPY Backend/ .
RUN npm run build

# ── Production stage ──
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]
