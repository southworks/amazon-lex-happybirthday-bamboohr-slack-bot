const bamboo = require('./packages/bamboo');
const slack = require('./packages/slack');
const messages = require('./packages/messages');

const getBirthdays = () => {
    birthdaysEmails = bamboo.getBirthdaysEmails()

    birthdaysSlackIds = slack.getBirthdaysSlackIds(birthdaysEmails)

    return messages.getHappyBirthday(birthdaysSlackIds)
}

module.exports = { getBirthdays }