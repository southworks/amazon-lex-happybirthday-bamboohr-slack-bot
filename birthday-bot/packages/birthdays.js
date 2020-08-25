const getBirthdaysEmails = require('./bamboo')
const getUserIds = require('./slack')
const getMsgWithEmojis = require('./birthdaymessage')

const getBirthdaysMessage = () => {
  const emails = getBirthdaysEmails()

  return getUserIds(emails).then(ids => getMsgWithEmojis(ids))
}

module.exports = { getBirthdaysMessage }
