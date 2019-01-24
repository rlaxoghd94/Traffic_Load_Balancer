## example-multi_container

### Branch Goal
- Try to set up a ***multi-containered*** docker ecosystem
- Within this ecosystem there lies a single `Nginx` web server and three `Node.js` web applications

<br></br>
<br></br>

#### `docker-compose.yml`
```yml
version: '3'
services:
   node1:
      build: ./src/nodejs/node1/
      networks:
         - traffic_balancer
      ports:
         - "8080:8080"
   node2:
      build: ./src/nodejs/node2/
      networks: 
         - traffic_balancer
      ports:
         - "8081:8081"  
   node3:
      build: ./src/nodejs/node3/
      networks:
         - traffic_balancer
      ports:
         - "8082:8082"
   nginx:
      build: ./src/nginx/
      networks:
         - traffic_balancer
      ports:
         - "80:80"

networks:
   traffic_balancer:
```

#### `Dockerfile` for `Node.js`
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
CMD npm start
```
 - ***Note***: within the `package.json` file, I've included a `start` sub command in the `script` section
   - `"start": "node app.js"`

#### `Dockerfile` for `Nginx`

```Dockerfile
FROM nginx

WORKDIR /usr/src/nginx

# Define mountable directories
# VOLUME ["/etc/nginx/sites-available"]

RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/examplessl.conf

# Copy Nginx Configuration HERE
# COPY ./default /etc/nginx/sites-available/default
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Define default command
# CMD ["nginx"]
# CMD nginx
```

