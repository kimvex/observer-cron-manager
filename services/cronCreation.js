'use strict'
const db = require('../db');
const {
  constructorTime, 
  executionUrl, 
  executionLocalFile, 
  generatorFileCron, 
  generatorFileMultiCron
} = require('../lib/creatorTime');

module.exports = (dataTimes, cb) => {
  (async function(){
    const database = db();

    const {
      cron_group_id,
      cron_job_name, 
      cron_job_description, 
      cron_minute, 
      cron_hour,
      cron_day,
      cron_month,
      cron_year,
      type = 'URL',
      url,
      method,
      headers,
      body,
      file
    } = dataTimes;


    const cronTime = await constructorTime({cron_minute, cron_hour, cron_day, cron_month, cron_year})

    const {error: errorCronGroupName, cron_group_name: { name }} = await database.getCronGroupName(cron_group_id)

    if (errorCronGroupName) {
      return cb("CANT_GET_CRON_GROUPS", null);
    }

    const executor = url && method ? await executionUrl(url, method, headers, body, cronTime) : await executionLocalFile(file, cronTime);

    dataTimes.cron_job_expression = executor;

    const {error: errorCreateCron, cron_job_id} = await database.createCron(dataTimes)

    if (errorCreateCron) {
      return cb("CANT_CREATE_CRON", null);
    }

    if (type === 'URL') {

      const {error: errorList, cron_list} = await database.getAllCronByCronGroupId(cron_group_id)

      if (errorList) {
        return cb("CANT_GET_CRON_GROUPS", null);
      }

      const error = await generatorFileMultiCron(`${cron_group_id}${name.replace(/ /g,'').trim()}`, cron_list.map(item => item.cron_job_expression).filter(r => r))
  
      return cb(error);
    }

    const error = await generatorFileCron(`${cron_group_id}${name.replace(/ /g,'').trim()}`, executor)

    return cb(error);
  })()

}