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
