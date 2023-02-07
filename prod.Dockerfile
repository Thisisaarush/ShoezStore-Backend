FROM node:18-alpine AS deps

# to add missing shared deps
RUN apk add --no-cache libc6-compat

WORKDIR /docker-server

COPY package.json package-lock.json ./
RUN npm install --production

# rebuilding only when needed
FROM node:18-alpine AS builder
WORKDIR /docker-server
COPY --from=deps /docker-server/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# production image
FROM node:18-alpine AS runner
WORKDIR /docker-server

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /docker-server/.next ./.next
COPY --from=builder /docker-server/node_modules ./node_modules
COPY --from=builder /docker-server/package.json ./package.json

USER nextjs

EXPOSE 4000

ENV PORT 4000

RUN npm run prisma-gen

CMD [ "npm", "start" ]
