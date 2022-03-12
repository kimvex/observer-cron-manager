#!/bin/bash

DES_SQLITE_NPM="./node_modules/sqlite3"
DES_MYSQL_NPM="./node_modules/mysql"
DES_MYSQL2_NPM="./node_modules/mysql2"
DES_POSTGRES_NPM="./node_modules/pg"
DES_MONGODB_NPM="./node_modules/mongodb"

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
        npm install mysql --save
        npm install mysql2 --save
    fi
elif [ $ENV_DATABASE == "sqlite" ]
then
    if ! command -v sqlite3 ;
    then
        apt install sqlite3 -y
    fi

    if [ ! -d "$DES_SQLITE_NPM" ]
    then
        npm install sqlite3 --save
    fi
elif  [ $ENV_DATABASE == "postgres" ]
then
    if ! command -v psql ;
    then
        apt install postgresql postgresql-contrib -y
    fi

    if [ ! -d "$DES_POSTGRES_NPM" ]
    then
        npm install pg --save
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
        npm install mongodb --save
    fi
fi

node index.js