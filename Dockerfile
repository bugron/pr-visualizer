FROM node:20-bullseye-slim AS base

ARG GITHUB_PAT
ARG ALLOWED_ORGS
ARG ALLOWED_REPOS
ENV GITHUB_PAT=${GITHUB_PAT}
ENV ALLOWED_ORGS=${ALLOWED_ORGS}
ENV ALLOWED_REPOS=${ALLOWED_REPOS}
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED 1
ENV CI true

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY .npmrc package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./.next/standalone/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/standalone/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

WORKDIR /app

CMD ["node", ".next/standalone/server.js"]
