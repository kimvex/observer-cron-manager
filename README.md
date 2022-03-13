# Observer Cron Manager

##### - BETA

Observer cron manage work using system of cronjob by linux for create taks with time of execution. This project allow you schelude request to endpoints remote or locals, also execute local cronjobs for execute localfiles if install without docker. Also allow work with severals databases for save configurations and groups of crons.

## Installation

Can install cloning the project and up docker compose

```js
 docker-compose up -d
```

The default database for management of configuration is `sqlite`, you can change type database in the file `docker-compose.yml` before execute the command of `docker-compose up`

After of up docker container you can access the front and api by

|Host| Description|
|-------------------------|--------------------------|
|`http://localhost:3000` | Front of application web |
| `http://localhost:3000/api` | Backend api |


### Manual installation

If you do not want use docker for execute local files, only clone project and make changes of `.env` file

|Variable|Value|Description|
|--------|--------|--------|
| PORT     | 3000  | Number of port for server|
|CRON_STORE| /etc/cron.d/ | Location of cronstore |
| NODE_BIN | /usr/bin/node | Location of binary of node |
| ENV_DATABASE | sqlite | Type of data base for use: `sqlite`, `mysql`, `postgres`, `mongodb` |

Install package of npm

`npm install`

Also set variable to environment `ENV_DATABASE=databasetype` and execute file `npm_database_package.sh`, this script install database local and install package of npm for this type database selected.

- First step `export ENV_DATABASE=databasetype`
- Second step `chmod +x npm_database_package.sh`
- Last step `./npm_database_package.sh`

So far only ubuntu packages are supported
