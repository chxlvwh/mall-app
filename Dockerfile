FROM nginx
COPY ./dist /usr/share/nginx/html
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'"]
