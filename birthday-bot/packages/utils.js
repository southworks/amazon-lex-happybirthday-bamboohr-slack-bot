const moment = require('moment-timezone')
// This environment variable is an int used to change the bot timezone. It can be anyone from https://momentjs.com/timezone/
const TIME_ZONE = process.env.TIME_ZONE

/* Returns a string with current date in DD/MM format. */
const getCurrentDate = () => {
  //returns the current date based on the configured time zone.
  return moment.tz(TIME_ZONE).format("DD/MM")
}

/* Read and parse Json file from path. */
const readJSON = (path) => {
  const { readFileSync } = require('fs')
  const data = readFileSync(path)
  const json = JSON.parse(data)

  return json
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

const getRandom = (array) => array[getRandomInt(array.length)]

module.exports = { getCurrentDate, readJSON, getRandomInt, getRandom }
