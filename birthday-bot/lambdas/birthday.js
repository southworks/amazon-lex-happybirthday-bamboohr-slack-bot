const Birthdays = require('../services/birthdays')
const utils = require('../helpers/utils')
const { joinUsers } = require('../helpers/message')

const list = (event, context, callback) => {
  new Birthdays()
    .getBirthdays()
    .then((users) => {
      const message = joinUsers(users)

      callback(
        null,
        utils.messageToResponse(
          message || "There aren't birthdays today",
          'Fulfilled',
          event.sessionAttributes
        )
      )
    })
    .catch((err) => callback(err))
}

const proactive = (event, context, callback) => {
  new Birthdays().sendBirthdayMessage().then((res) => {
    if (res.ok) {
      callback(null, { statusCode: 200, body: 'Message sent!' })
    } else {
      callback(null, {
        statusCode: 200,
        body: `There was an error., ${res.error}`,
      })
    }
  })
}

module.exports = { list, proactive }
