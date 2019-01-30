## example-multi_container

### Branch Goal
- Try to set up a ***multi-containered*** docker ecosystem
- Within this ecosystem there lies a single `Nginx` web server and three `Node.js` web applications

### TODO
- Give each `Node` services a hostname for `Nginx` reverse proxy


### Note
- Run the whole system using the following command:
   - `docker-compose -d up --build`
- To debug a situtation where a container fails to run, use the following command to check the log:
   - `docker-compose -f docker-compose.yml up`
- To enter container in a `/bin/bash` mode, use the following code:
   - `docker exec -it <container name> /bin/bash`
<br></br>
<br></br>

#### `docker-compose.yml`
```yml


version: '3'
services:
   node1:
      build: ./src/nodejs/
      networks:
         - traffic_balancer
      ports:
         - 8080:8080
   node2:
      build: ./src/nodejs/
      networks: 
         - traffic_balancer
      ports:
         - 8081:8080
   node3:
      build: ./src/nodejs/
      networks:
         - traffic_balancer
      ports:
         - 8082:8080
   nginx:
      image: nginx:latest
      container_name: fucking_nginx
      volumes:
         - ./src/nginx/nginx.conf:/etc/nginx/nginx.conf:rw
      networks:
         - traffic_balancer
      links:
         - node1:nodejs-node1
         - node2:nodejs-node2
         - node3:nodejs-node3
      ports:
         - "8900:80"
      command: /bin/sh -c "exec nginx -g 'daemon off;'"

networks:
   traffic_balancer:
```

#### `nginx.conf` important block
```nginx
...

   upstream node_stream {
      least_conn;
      server nodejs-node1:8080;
      server nodejs-node2:8081;
      server nodejs-node3:8082;
   }   
   
   server {
      listen 80 default_server;
      listen [::]:80 default_server;

      server_name _;

      location / { 
         # proxy_pass http://127.0.0.1:8080/;
         # proxy_pass http://nodejs.node1:8080/;
         proxy_pass "http://node_stream";
      }   
   }

...
```

#### Node `Dockerfile`
```Dockerfile
FROM node:8

# App dir for node1
WORKDIR /usr/src/nodejs/node1

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# CMD["npm", "start"]
# CMD ["node", "app.js"]
# CMD npm start
CMD node app.js
```

#### Node `app.js`
```js
var express = require('express');
var app = express();

app.get('/', (req, res) => {
   res.send('<h1>Working on Node: ' + process.pid + '</h1><br></br>');
});

app.get('/testtest', (req, res) => {
   res.send("You've entered the test page");
});

app.listen(8080, '0.0.0.0');

console.log('Server running at 127.0.0.1:8080');
```

