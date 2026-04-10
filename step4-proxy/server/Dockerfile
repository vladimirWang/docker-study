FROM node:22.16.0-alpine

RUN corepack enable

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

CMD ["npm", "run", "dev"]