FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

EXPOSE 2000

CMD [ "bun", "start" ]