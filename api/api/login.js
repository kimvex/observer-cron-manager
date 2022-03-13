'use strict'

const LoginService = require('../../services/loginService');

module.exports = (sol, res) =>{
  const { username, password } = sol.body

  LoginService(username, password, (error, userData) => {
    if (error) {
      return res.status(401).send({ error})
    }

    res.json({
      user: userData
    })
  })
}