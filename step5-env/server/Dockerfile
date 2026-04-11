FROM node:22.16.0-alpine

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD ["npm", "run", "dev"]