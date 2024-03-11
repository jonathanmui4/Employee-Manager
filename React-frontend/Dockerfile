FROM node:20-alpine3.19

# COPY [host machine] [container] (first path is relative to Dockerfile, 2nd relative to root on container)
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

