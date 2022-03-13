'use strict'

const CreateCronGroup = require('../../services/createCronGroup');

module.exports = (sol, res) => {
  const {name, cron_groups_description} = sol.body
  const {user_id} = sol.user

  CreateCronGroup(name, cron_groups_description, user_id, (error, cronGroupId) => {
    if (error) {
      return res.status(401).send({ error })
    }

    res.json({
      cron_group_id: cronGroupId
    })
  })
}