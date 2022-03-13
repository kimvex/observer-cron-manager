'use strict'

const db = require('../db')
const { verify } = require('../helpers/validations-hash')
const {generateToken} = require('../helpers/jwt')


module.exports = (username, password, cb)=> {
  (async function() {
    const database = db()

    const {user, error} = await database.getUser(username)

    if (error) {
      return cb("ERROR_TO_GET_USER", null)
    }

    if (!user) {
      console.log('User not found')
      return cb("USER_NOT_EXIST", null)
    }

    const isValid = await verify(password, user.password)

    if (isValid) {
      const token = generateToken(user.user_id)
      delete user.password
      return cb(null, {...user, token})
    }

    return cb("USER_OR_PASSWORD_INCORRECT", null)
  })()
}