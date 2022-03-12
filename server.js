'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const { front, api } = require('./api')
console.log(require('./api'))
const { PORT } = process.env

function InitializationServer() {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/', front)
  app.use('/api', api)

  app.listen(PORT, () => console.log(`Execute server is listening on port ${PORT}`))

  return app
}

module.exports = InitializationServer;