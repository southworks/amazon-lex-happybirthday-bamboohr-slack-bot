const getUserIds = require('../data/slack')
const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')

const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}

// WARN: This function should be refactored to use Azure class
const getBirthdaysEmails = async () => {
  const today = getCurrentDate()
  const users = await readStore()

  return users
    .filter((user) => user.Birthday.substring(5) === today)
    .map((user) => user.Email)
}

module.exports = getBirthdaysMessage
