FROM oven/bun:latest

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

EXPOSE 2000

CMD [ "bun", "start" ]