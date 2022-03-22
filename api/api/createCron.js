'use strict';

const cronCreation = require('../../services/cronCreation');

module.exports = (sol, res) => {
  const dataCron = sol.body;
  
  cronCreation(dataCron, (error, message) => {
    if (error) {
      return res.status(400).send({ error });
    }

      return res.json({
        message
      });
    })
}