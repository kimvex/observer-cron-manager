'use strict';

const db = require('../db');

module.exports = (user_id, page, limit, cb) => {
  (async function() {
    const database = db();

    const { error, cron_group_list } = await database.getCronGroups(user_id, page, limit);

    if (error) {
      return cb("CANT_GET_CRON_GROUPS", null);
    }

    return cb(null, cron_group_list);
  })()
}