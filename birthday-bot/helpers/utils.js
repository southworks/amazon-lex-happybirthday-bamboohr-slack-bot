/* Returns a string with current date with default date format MM-DD. */
const getCurrentDate = (dateFormat) => {
  // This environment variable is an int used to change the bot timezone. It can be anyone from https://momentjs.com/timezone/
  const moment = require('moment-timezone')
  const TIME_ZONE = process.env.TIME_ZONE

  if (dateFormat === undefined) dateFormat = 'MM-DD'

  return moment.tz(TIME_ZONE).format(dateFormat)
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

const getRandom = (array) => array[getRandomInt(array.length)]

const idTag = (id) => `<@${id}>`

const newChannel = (name) => {
  return {
    channel: name,
    updatedAt: new Date().toISOString(),
  }
}

const messageToResponse = (content, fulfillmentState, sessionAttributes) => {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message: {
        contentType: 'PlainText',
        content,
      },
    },
  }
}

module.exports = {
  getCurrentDate,
  getRandom,
  getRandomInt,
  idTag,
  messageToResponse,
  newChannel,
}
