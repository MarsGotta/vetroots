FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/cms/package.json ./apps/cms/
RUN pnpm install --frozen-lockfile --filter=cms

# Build
FROM base AS builder
COPY --from=deps /app /app
COPY apps/cms ./apps/cms
ENV NODE_ENV=production
RUN pnpm --filter=cms build

# Production
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9 --activate
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=builder /app/apps/cms/dist ./apps/cms/dist
COPY --from=builder /app/apps/cms/config ./apps/cms/config
COPY --from=builder /app/apps/cms/src ./apps/cms/src
COPY --from=builder /app/apps/cms/package.json ./apps/cms/package.json
COPY --from=builder /app/apps/cms/tsconfig.json ./apps/cms/tsconfig.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi
RUN chown -R strapi:strapi /app
USER strapi

EXPOSE 1337
CMD ["pnpm", "--filter=cms", "start"]
