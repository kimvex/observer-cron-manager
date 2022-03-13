
'use strict';

const knex = require('knex');
const path = require('path');

class Database {
  static async db() {
    return await knex({
      client: 'sqlite3', // or 'better-sqlite3'
      connection: {
        filename: path.join(__dirname, "./crons.sqlite")
      },
      useNullAsDefault: true
    })
  }

  async createUser(user) {
    const db = await Database.db()
    try {
      await db('users').insert({...user, create_at: db.fn.now()})

      return {
        error: null
      }
    } catch (error) {
      console.log(`Error when create user with user data=${JSON.stringify(user)}: ${error}`)

      return {
        error: 'CANT_CREATE_USER'
      }
    }
  }

  async getUser(username) {
    const db = await Database.db()
    try {
      const user = await db('users').select('username', 'password', 'user_id').where({ username }).first()

      return {
        error: null,
        user
      }
    } catch (error) {
      console.log(`Error when get user with username=${username}: ${error}`)

      return {
        error: 'CANT_GET_USER'
      }
    }
  }
}

module.exports = Database;