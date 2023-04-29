FROM node:18.14.2
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4100
CMD [ "node", "src/index.ts" ]
