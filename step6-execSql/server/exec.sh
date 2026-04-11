#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f .env.prod ]]; then
  echo "未找到 .env.prod（请放在与本脚本同一目录）" >&2
  exit 1
fi

# 读取 .env.prod：set -a 使 source 里赋值的变量自动 export，供后续命令使用
set -a
# shellcheck disable=SC1091
source .env.prod
set +a

docker exec -i step6-env-mysql mysql -u root -p"${DATABASE_PASSWORD}" "${DATABASE_NAME}" < createUser.sql
