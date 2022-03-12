'use strict'
const {constructorTime, executionUrl, executionLocalFile, generatorFileCron} = require('../lib/creatorTime');

module.exports = (dataTimes, cb) => {
  (async function(){
    const {url, method, headers, body, file, nameCron} = dataTimes;
    const cronTime = await constructorTime(dataTimes);
    const executor = url && method ? await executionUrl(url, method, headers, body, cronTime) : await executionLocalFile(file, cronTime);

    const error = await generatorFileCron(nameCron, executor)

    cb(error);
  })()

}