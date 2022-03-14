'use strict';

const cronGroupsService = require('../../services/cronGroupsService');

module.exports = (sol, res) => {
  const {page=0, limit=10} = sol.query;
  const {user_id} = sol.user;

  cronGroupsService(user_id, page, limit, (error, cronGroups) => {
    if (error) {
      return res.status(401).send({ error });
    }

    res.json({
      cron_group_list: cronGroups
    });
  });
}