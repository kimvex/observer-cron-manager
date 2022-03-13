'use strict';

const {ENV_DATABASE} = process.env

module.exports = () => {
  if (ENV_DATABASE === 'mysql') {
    return new require('./mysql')();
  }

  if (ENV_DATABASE === 'sqlite') {
    const sqlite = require('./sqlite')
    return new sqlite();
  }

  if (ENV_DATABASE === 'postgres') {
    return new require('./postgres')();
  }

  if (ENV_DATABASE === 'mongo') {
    return new require('./mongodb')();
  }

  throw new Error('Database not found');
}