const getBirthdaysMessage = require('../services/birthdays')
const birthdaysMessageToResponse = require('../helpers/utils')

const getBirthdays = (event, context, callback) => {
    console.log(birthdaysMessageToResponse('dxdxx', event.sessionAttributes, 'Close'))
    // getBirthdaysMessage()
    // .then(message => callback(birthdaysMessageToResponse(message, event.sessionAttributes, 'Close')))
    // .catch(err => callback(err))
}

const slackChannel = (event, context, callback) => {}

module.exports = { getBirthdays,  slackChannel}