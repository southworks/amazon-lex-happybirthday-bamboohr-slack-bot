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
    .catch((err) => {
      console.log('Error listing birthdays.', err)
      callback(err)
    })
}

const proactive = (event, context, callback) => {
  new Birthdays().sendBirthdayMessage().then((res) => {
    if (res.ok) {
      callback(null, { statusCode: 200, body: `OK! ${res.message.text}` })
    } else {
      console.log('Error sending proactive message.', res)
      callback(null, {
        statusCode: 200,
        body: `Message not sent! ${res.error}`,
      })
    }
  })
}

module.exports = { list, proactive }
