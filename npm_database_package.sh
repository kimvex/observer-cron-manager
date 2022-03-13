#!/bin/bash

DES_SQLITE_NPM="./node_modules/better-sqlite3"
DES_MYSQL_NPM="./node_modules/mysql"
DES_MYSQL2_NPM="./node_modules/mysql2"
DES_POSTGRES_NPM="./node_modules/pg"
DES_MONGODB_NPM="./node_modules/mongodb"
DES_NODEMON_NPM="./node_modules/nodemon"
DATABASE_SQLITE_FILE="./db/$DATABASE_SQLITE"

if [ $ENV_DATABASE == "mysql" ]
then
    if ! command -v mysql ;
    then
        apt update
        apt install mysql-server -y
        service mysql start
    fi

    if [ ! -d "$DES_MYSQL_NPM" ]
    then
        npm install mysql
        npm install mysql2
    fi
elif [ $ENV_DATABASE == "sqlite" ]
then
    if ! command -v sqlite3 ;
    then
        apt install sqlite3 -y
    fi

    if [ ! -d "$DES_SQLITE_NPM" ]
    then
        npm install @vscode/sqlite3
        npm install better-sqlite3
    fi

    if [ ! -f "$DATABASE_SQLITE_FILE" ]
    then
        touch "$DATABASE_SQLITE_FILE"
    fi
elif  [ $ENV_DATABASE == "postgres" ]
then
    if ! command -v psql ;
    then
        apt install postgresql postgresql-contrib -y
    fi

    if [ ! -d "$DES_POSTGRES_NPM" ]
    then
        npm install pg
        npm install pg-native
    fi
elif [ $ENV_DATABASE == "mongo" ]
then
    if ! command -v mongo ;
    then
        curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
        apt update
        apt install mongodb-org
        systemctl start mongod.service
    fi

    if [ ! -d "$DES_MONGODB_NPM" ]
    then
        npm install mongodb
    fi
fi

knex migrate:latest

if [ $NODE_ENV == "development" ]
then
    npm install nodemon -g
    nodemon index.js
else
    node index.js
fi
