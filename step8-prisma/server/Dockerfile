FROM node:22.16.0-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# 复制 Prisma schema 并生成 client
COPY prisma ./prisma
RUN npx prisma db push
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start"]