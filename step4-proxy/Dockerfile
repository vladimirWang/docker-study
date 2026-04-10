FROM node:22.16.0-alpine AS web

RUN corepack enable
WORKDIR /web

COPY html/package.json html/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY html ./
RUN pnpm build

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=web /web/dist /usr/share/nginx/html
