#!/usr/bin/env bash
docker compose -f docker-compose.test.yml --env-file ./server/.env.test up -d --build
