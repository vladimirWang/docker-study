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

# 勿用 -p"密码"（会触发 CLI 不安全警告）；用 MYSQL_PWD 供客户端读密码
docker exec -i -e MYSQL_PWD="${DATABASE_PASSWORD}" step6-env-mysql \
  mysql -u root "${DATABASE_NAME}" < createUser.sql
