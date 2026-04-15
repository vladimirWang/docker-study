#!/bin/sh
set -e
echo "Running prisma migrate deploy..."
# 生产环境依赖 docker-compose 的 env_file（../.env.prod）。
# 这里显式加载一次，保证 prisma migrate/seed 一定能读到 DATABASE_URL。
bunx dotenv -e .env.prod -- prisma migrate deploy
bunx dotenv -e .env.prod -- prisma db seed
exec "$@"
