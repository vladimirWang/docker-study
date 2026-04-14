#!/bin/sh
set -e
echo "Running prisma migrate deploy..."
bunx prisma migrate deploy
bunx prisma db seed
exec "$@"
