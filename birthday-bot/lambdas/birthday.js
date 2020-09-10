const Birthdays = require('../services/Birthdays')
const utils = require('../helpers/utils')

const services = new Birthdays()
const list = (event, context, callback) => {
  services
    .getBirthdaysMessage()
    .then((message) =>
      callback(
        null,
        utils.messageToResponse(
          message || "There aren't birthdays today",
          'Fulfilled',
          event.sessionAttributes
        )
      )
    )
    .catch((err) => callback(err))
}

module.exports = { list }
