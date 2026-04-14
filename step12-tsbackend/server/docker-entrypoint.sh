#!/bin/sh
set -e
echo "Running prisma migrate deploy..."
npx prisma migrate deploy
npx prisma db seed
exec "$@"
