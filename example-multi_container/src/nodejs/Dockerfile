FROM node:8

# App dir for node
WORKDIR /usr/src/nodejs

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# CMD["npm", "start"]
# CMD ["node", "app.js"]
# CMD npm start
CMD node test_server.js
