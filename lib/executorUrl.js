'use strict'

const axios = require('axios')
const {
  URL,
  METHOD,
  HEADERS = {},
  BODY,
} = process.env

module.exports = (function () {
  if (URL !== "undefined" && METHOD !== "undefined") {
    const data = {
      url: URL,
      method: METHOD,
    }

    if (HEADERS !== "undefined") {
      data.headers = HEADERS
    }

    if (BODY !== "undefined") {
      data.body = BODY
    }

   return axios(data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return
})()



