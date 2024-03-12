FROM node:20-alpine3.19

# COPY [host machine] [container] (first path is relative to Dockerfile, 2nd relative to root on container)
COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

# Expose the port on which your Vite server will run (default is 4173)
EXPOSE 5173

# Start the Vite development server
CMD ["yarn", "preview"]

