FROM node:8

# App dir for node1
WORKDIR /usr/src/nodejs/node1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# CMD["npm", "start"]
# CMD ["node", "app.js"]
CMD npm start
