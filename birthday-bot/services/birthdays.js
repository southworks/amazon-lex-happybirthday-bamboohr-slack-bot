const getBirthdaysEmails = require('../data/azure')
const getUserIds = require('../data/slack')
const getMsgWithEmojis = require('../packages/birthdaymessage')

const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}

module.exports = getBirthdaysMessage
