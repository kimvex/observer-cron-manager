'use strict'

const fs = require('fs')
const {execSync} = require('child_process')
const path = require('path')

exports.readerCron = async (fileName) => {
  try {
    const file = await fs.readFileSync(`/etc/cron.d/${fileName}`, 'utf8');
    return file; 
  } catch (error) {
    console.log(`Can't read cronFile = ${fileName}, can be not exist`, error)
    return null
  }
}

exports.saveCron = async (pathCron, fileName) => {
  try {
    await execSync(`mv ${fileName} ${pathCron}`);
  } catch (error) {
    console.log(`Can't save cronFile = [${pathCron}, ${fileName}] , can be not exist`, error)
  }
}