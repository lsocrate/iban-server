# syntax=docker/dockerfile:1

FROM node:18

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV=production
ENV PORT=1337

CMD ["npm", "start"]
