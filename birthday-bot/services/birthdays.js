const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')
const Azure = require('../data/azure')
const Slack = require('../data/slack')
const Amazon = require('../data/amazon')

const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}

// WARN: This function should be refactored to use Azure class
const getBirthdaysEmails = async () => {
  const today = getCurrentDate()
  const az = new Azure()
  const users = await az.readStore()
  console.log('users', users)
  return users
    .filter((user) => user.Birthday.substring(5) === today)
    .map((user) => user.Email)
}

// WARN: This function should be refactored to use Slack class
/* Returns an Array with Slack users IDs by email */
const getUserIds = async (emails) => {
  const slack = new Slack()
  const amazon = new Amazon()
  const token = await amazon.getSSMParameter(process.env.AUTH_TOKEN_SSM, true)
  const promises = emails.map((email) => slack.getUserByEmail(email, token))
  return Promise.all(promises).then((users) => 
    users.map(user => {
      return user.user.id
    })
  )
}

module.exports = getBirthdaysMessage
