FROM node:18-alpine

ARG ARG_VITE_URL_API
ENV VITE_URL_API=$ARG_VITE_URL_API

ARG ARG_BACK_PORT
ENV BACK_PORT=$ARG_BACK_PORT

ENV PATH="/pnpm:$PATH"
ENV PNPM_HOME="/pnpm"
RUN npm i -g pnpm

WORKDIR /app

RUN cd /app

COPY src/. .

RUN pnpm install

RUN pnpm build

RUN ls

RUN pnpm i -g serve

EXPOSE 3000

CMD [ "serve", "dist/", "-l", "3000"]