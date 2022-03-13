'use strict';

const db = require('../db');

module.exports = (name, cron_groups_description, user_id, cb) => {
  (async function() {
    const database = db();

    const { error, cron_group_id } = await database.createCronGroup(name, cron_groups_description, user_id);

    if (error) {
      return cb("CANT_CREATE_CRON_GROUP", null);
    }

    return cb(null, cron_group_id[0]);
  })()
}