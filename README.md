# Traffic Load Balancer

### Team Members
 - 김태홍
 - 송종원

### Project Purpose
Build a docker-based web service that can endure 100,000,000 traffic at once.

### Summary
Using `Nginx` as a reverse proxy with multiple `Node.js` applications, we can achieve a well-oriented load balanced web application. In addition to this, we'll be using `Kafka` clients per `Node.js` applications to communicate and execute actions on `Spring` applications while rendering `.html` files on `Node.js` applications.

### Handling Criteria
1. Git
2. Docker
3. Nginx
4. Node.js (Express)
5. Kafka
6. Spring
 - **Hold on to `Kafka` and `Spring` for later implementation**

<br></br>
### Dockerfile Approach
1. Import base-os image
```
FROM ubuntu:18.04
```
2. Update `aptitude` and install necessary libraries such as: `Nginx`, `Node`, `npm`
```
# Install Nginx
RUN apt-get update && apt-get install -y \
	nginx \
	curl

# Download Node.js
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

# Install Node.js and npm
RUN sudo apt-get install nodejs
```

3. Copy necessary config files or node application codes:
```
# Copy all files from current directory to the base image(ubuntu:18.04 at the moment)
COPY . /my-files

# Since you've moved your files, set '/my-files/' as a default working directory
# This allows you from now on to use '/my-files/{ filename }' as '{ filename }
WORKDIR /my-files/

# Move Nginx config files (basically, configuring Nginx settings)
RUN cp ./default /etc/nginx/sites-available/default && cp ./load-balancer.conf /etc/nginx/conf.d/load-balancer.conf

# For your own taste, run as much node files as you wish for load-distribution
RUN nodejs ./{ Node App Code File }.js &
```

4. Run `bash` when this image is ran by `docker`:
```
# Doing so can allow you to dynamically manipulate the container on-the-fly
CMD ["bash"]
```

5. Explicitly state the End-Of-File
```
EOF
```


<br></br>
<br></br>
### Reference Docs
 - [Git](https://github.com/rlaxoghd94/Kafka_Test/blob/master/Docs/git.md)
 - [Docker](https://github.com/rlaxoghd94/Docker_Tutorial)
 - [Nginx](https://github.com/rlaxoghd94/Nginx_NodeJs_Manual/blob/master/README.md)
 - [Node.js](https://github.com/rlaxoghd94/Nginx_NodeJs_Manual/blob/master/Nodejs/README.md)
 - [Kafka](https://github.com/rlaxoghd94/Kafka_Test/blob/master/README.md)

### Reference Page
 - [Docker, Node.js, Nginx](http://labs.brandi.co.kr/2018/05/25/kangww.html)
