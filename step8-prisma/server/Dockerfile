FROM node:22.16.0-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# 复制 Prisma 相关文件并生成 client（迁库在容器启动时由 entrypoint 执行）
COPY prisma ./prisma
COPY prisma.config.js ./
RUN npx prisma generate

COPY . .

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start"]