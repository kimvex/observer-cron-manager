'use strict'

const path = require('path')
const fs = require('fs')

const {readerCron, saveCron} = require('./internalLib')

const {NODE_BIN, CRON_STORE} = process.env

exports.constructorTime = async (dataTimer) => {
  const {
    minutes,
    hours,
    days,
    months,
    years,
  } = dataTimer;

  let cronTimer = `* * * * * root`

  if (years) return `0 0 1 1 * root`

  if (months) return `0 0 * */${months} * root`

  if (days && hours) return `0 ${hours} */${days} * * root`

  if (days) return `0 * */${days} * * root`

  if (hours) return `0 */${hours} * * * root`

  if (minutes) return `*/${minutes} * * * * root`

  return cronTimer

}

exports.executionUrl = async (url, method, headers, body, cron) => {
  return `${cron} METHOD=${method} HEADERS=${headers} BODY=${body} URL=${url} ${NODE_BIN} ${path.join(__dirname, '../lib/executorUrl.js')}`
}

exports.executionLocalFile = async (cron) => {
  return `${cron} ${NODE_BIN} ${path.join(__dirname, '../lib/executorLocalFile.js')}`
}

exports.generatorFileCron = async (fileName, cronData) => {
  try {
    let fileData = await readerCron(fileName)

    fileData ? fileData += `${cronData}\n` : fileData = `${cronData}\n`
  console.log(fileData)
    await fs.writeFileSync(fileName, fileData, 'utf8');
    await saveCron(`${CRON_STORE}`, `${path.join(__dirname, `../${fileName}`)}`) 

    return
  } catch (error) {
    console.log(`Can't save cronFile = ${fileName}, can be not exist`, error)
    return "CAN'T_BE_GENERATED_CRON"
  }
}