FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

RUN mkdir ./storage
RUN mkdir ./storage/filesystem
RUN mkdir ./storage/media

EXPOSE 2000

CMD [ "bun", "start" ]