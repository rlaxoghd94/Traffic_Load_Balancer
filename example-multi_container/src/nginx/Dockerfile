FROM nginx

WORKDIR /usr/src/nginx

# Define mountable directories
# VOLUME ["/etc/nginx/sites-available"]

# RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/examplessl.conf

# Copy Nginx Configuration HERE
# COPY ./default /etc/nginx/sites-available/default
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Define default command
# CMD ["nginx"]
# CMD nginx
CMD /bin/sh
