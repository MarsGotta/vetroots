FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY apps/cms/package.json ./apps/cms/
RUN pnpm install --frozen-lockfile --filter=cms

# Build
FROM base AS builder
COPY --from=deps /app /app
COPY apps/cms ./apps/cms
RUN pnpm --filter=cms build

# Production
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/cms ./apps/cms

EXPOSE 1337
CMD ["pnpm", "--filter=cms", "start"]
