## `Develop` branch

### Branch Goal
 - Try to set up a *single-containered* docker ecosystem
   - Within this ecosystem there lies, `Nginx`, `Node.js`, and etc
   - After multi-staged setup is complete, `node_init_.sh`, a shell script file, will start via a `CMD` command
   - `node_init_.sh` simply consists of 3 node command lines running `app1.js`, `app2.js`, `app3.js`


### Problem
 - Docker build and run command works fine, ***but*** when `nodejs app1.js &` is executed, the process instantly dies.
   - Causes `Nginx` to return `Error: 502`
      - Meaning, a reverse proxy/web server cannot reach the web app running at the moment

### Solution
 - This could be somewhat of a *bypass*, but use `docker-compose.yml` instead of `Dockerfile`
   - *Meaning*, setting a *multi-containered* ecosystem, which Docker developers encourages users to, will allow a much more stable environment and isolation among different modules

<br></br>
<br></br>

### Files I've composed to attempt to achieve this goal

#### `Dockerfile`
```Dockerfile
FROM ubuntu:18.04

MAINTAINER Nicholas Taehong Kim <ktae.nic@gmail.com>

RUN apt-get update && apt-get install -y gnupg2 nginx curl
# Use the following line of code, since docker's ubuntu image does not contain 'sudo'
# RUN apt-get install -y sudo && rm -rf /var/lib/apt/lists/*
# RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y python build-essential nodejs

COPY . /my-files

WORKDIR /my-files/

RUN rm /etc/nginx/sites-available/default && cp ./default /etc/nginx/sites-available/default
# RUN nginx -s reload

RUN npm install

EXPOSE 80

CMD ["sh", "node_init_.sh"]
```

#### `node_init_.sh`
- What I've tried to achieve with this was to follow [this](https://docs.docker.com/config/containers/multi-service_container/) implementation via a script file.

```sh
echo "-------------node_init_.sh-------------"
nodejs app1.js &
nodejs app2.js &
nodejs app3.js &
echo "---------------------------------------"

/bin/sh

while sleep 60; do
   echo "---loop---"

done
```
