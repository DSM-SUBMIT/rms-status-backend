FROM node:lts AS builder

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i

COPY ./src ./src
COPY ./tsconfig.json ./

RUN pnpm build

FROM node:lts-alpine
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist
COPY package.json ./

EXPOSE 3000

CMD ["pnpm", "start:prod"]
