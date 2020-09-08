const getBirthdaysMessage = require('../services/birthdays')
const utils = require('../helpers/utils')

const list = (event, context, callback) => {
    getBirthdaysMessage()
    .then(message => callback(null, utils.messageToResponse(message, event.sessionAttributes)))
    .catch(err => callback(err))
}

module.exports = { list }
