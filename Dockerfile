FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

RUN apt-get update && apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh && bash nodesource_setup.sh
RUN apt install nodejs -y && apt install cron -y && apt-get install python-is-python3 -y && apt-get install -y build-essential
RUN service cron start


WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "npm_database_package.sh", "./"]

RUN npm install --production --silent
RUN npm install knex -g

COPY . .
RUN chmod +x npm_database_package.sh
ENV USER root

EXPOSE 3000

ENTRYPOINT ["bash", "./npm_database_package.sh"]
