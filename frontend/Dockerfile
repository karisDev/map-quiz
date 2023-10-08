FROM node

RUN apt-get update    && apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install \
    && npm run build \
    && mkdir /var/www/html/map-quiz \
    && cp -r dist/* /var/www/html/map-quiz \
    && rm -rf /app
CMD ["nginx","-g","daemon off;"]
