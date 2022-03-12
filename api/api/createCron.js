'use strict';

const cronCreation = require('../../services/cronCreation');

module.exports = (sol, res) => {  
  cronCreation(sol.body, (error, message) => {
    if (error) {
      return res.status(400).send({ error });
    }

      return res.json({
        message
      });
    })
}