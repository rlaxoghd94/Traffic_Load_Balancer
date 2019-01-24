FROM node:8

# App dir for node1
WORKDIR /usr/src/nodejs/node2

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

# CMD["npm", "start"]
# CMD ["node", "app.js"]
CMD npm start
