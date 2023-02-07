FROM node:18-alpine AS deps

# to add missing shared deps
RUN apk add --no-cache libc6-compat

WORKDIR /docker-server

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run prisma-gen

CMD [ "npm", "run", "dev" ]
