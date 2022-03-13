'use strict';

const db = require('../db')
const { hash } = require('./validations-hash');

const { USERNAME, PASSWORD } = process.env;

module.exports = () => {
  (async function() {
    const database = db()
    const { user, error } = await database.getUser(USERNAME);

    if (error) {
      throw new Error(`Cant get user with username=${USERNAME}`);
    }

    if (user) {
      console.log('User already exists');
      return
    }

    await database.createUser({username: USERNAME, password: await hash(PASSWORD)});
    
  })()
}