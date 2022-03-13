'use strict';

const {
  HOST_DB,
  PORT_DB,
  USER_DB,
  PASSWORD_DB,
  NAME_DB,
  ENV_DATABASE
} = process.env;

let connection_migration = {
  client: 'sqlite3',
  connection: {
    filename: "./db/crons.sqlite"
  },
  useNullAsDefault: true
}

if (ENV_DATABASE === 'mysql') {
  connection_migration = {
    client: 'mysql',
		connection: {
			host: HOST_DB,
			port: PORT_DB,
			database: NAME_DB,
			user: USER_DB,
			password: PASSWORD_DB,
			ssl: true,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
  }
}

module.exports = connection_migration