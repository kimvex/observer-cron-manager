
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

  async createCronGroup(name, cron_groups_description, user_id) {
    const db = await Database.db()
    try {
      const cron_group_id = await db('cron_groups').insert({name, cron_groups_description, user_id, cron_group_create_at: db.fn.now(), cron_groups_status: 'active'})

      return {
        error: null,
        cron_group_id
      }
    } catch (error) {
      console.log(`Error when create cron group with cron group data=${JSON.stringify({name, cron_groups_description, user_id})}: ${error}`)

      return {
        error: 'CANT_CREATE_CRON_GROUP'
      }
    }
  }

  async getCronGroups(user_id, page, limit) {
    const db = await Database.db()
    try {
      const cron_group_list = await db('cron_groups')
        .select('cron_group_id', 'name', 'cron_groups_description', 'cron_group_create_at')
        .where({
          user_id,
          cron_groups_status: 'active'
        })
        .orderBy('cron_group_create_at')
        .limit(limit)
        .offset(page * limit)

      return {
        error: null,
        cron_group_list
      }
    } catch (error) {
      console.log(`Error when get cron groups: ${error}`)

      return {
        error: 'CANT_GET_CRON_GROUPS'
      }
    }
  }
}

module.exports = Database;