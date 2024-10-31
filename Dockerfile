FROM node:22-slim AS build

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  build-essential \
  make \
  && rm -rf /var/lib/apt/lists/*

RUN npm i -g pnpm && \
  pnpm install && \
  pnpm build && \
  pnpm prune --prod

CMD ["node", "dist/src/main.js"]
