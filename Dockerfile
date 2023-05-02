FROM node:18.14.2
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 4100
CMD [ "node", "dist/index.js" ]
