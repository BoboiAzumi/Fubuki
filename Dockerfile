FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN mkdir /app/storage
RUN mkdir /app/storage/filesystem
RUN mkdir /app/storage/media

EXPOSE 2000

CMD [ "bun", "start" ]