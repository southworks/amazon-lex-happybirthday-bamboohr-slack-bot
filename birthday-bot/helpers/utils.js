/* Returns a string with current date with default date format MM-DD. */
const getCurrentDate = (dateFormat) => {
  // This environment variable is an int used to change the bot timezone. It can be anyone from https://momentjs.com/timezone/
  const moment = require('moment-timezone')
  const TIME_ZONE = process.env.TIME_ZONE

  if (dateFormat === undefined) dateFormat = 'MM-DD'

  return moment.tz(TIME_ZONE).format(dateFormat)
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

const messageToResponse = (message, sessionAttributes) => {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState: 'Fulfilled',
      message: {
        contentType: 'PlainText',
        content: message || "There aren't birthdays today",
      },
    }}
}

module.exports = { getCurrentDate, readJSON, getRandomInt, getRandom, messageToResponse }
