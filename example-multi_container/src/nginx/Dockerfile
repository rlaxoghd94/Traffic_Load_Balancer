FROM nginx

WORKDIR /usr/src/nginx

# Define mountable directories
VOLUME ["/etc/nginx/sites-available"]

COPY ./default /etc/nginx/sites-available/default

EXPOSE 80

# Define default command
# CMD ["nginx"]
CMD nginx
