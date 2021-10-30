FROM node:lts AS builder

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i

COPY ./src ./src
COPY ./tsconfig.json ./

RUN pnpm build

FROM node:lts-alpine

RUN npm i -g pnpm

WORKDIR /usr/app

COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist
COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig-paths-bootstrap.js ./

EXPOSE 3000

CMD ["pnpm", "start:prod"]
