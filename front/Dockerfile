FROM node:12 AS build-env

RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y inotify-tools

RUN npm -g config set user root

RUN npm i -g grunt-cli
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/bash", "./build_watch.sh"]
