const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')
const Azure = require('../data/azure')

const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}

// WARN: This function should be refactored to use Azure class
const getBirthdaysEmails = async () => {
  const today = getCurrentDate()
  const users = await azure.readStore()

  return users
    .filter((user) => user.Birthday.substring(5) === today)
    .map((user) => user.Email)
}

// WARN: This function should be refactored to use Slack class
/* Returns an Array with Slack users IDs by email */
const getUserIds = (emails) => {
  const promises = emails.map((email) => getSlackId(email))
  return Promise.all(promises).then((userIds) => userIds.filter((el) => el))
}


const newChannel = (name) => {
  return {
    channel: name,
    updatedAt: new Date().toISOString(),
  }
}

module.exports = getBirthdaysMessage
