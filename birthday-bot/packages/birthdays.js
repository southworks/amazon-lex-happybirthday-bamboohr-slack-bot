const getBirthdaysEmails = require('./bamboo');
const getUserIds = require('./slack');
const getMsgWithEmojis = require('./birthdaymessage');

const getBirthdaysMessage = async () => {
  let emails = getBirthdaysEmails()

  return new Promise((resolve, reject) => {
    getUserIds(emails)
      .then(ids => resolve(getMsgWithEmojis(ids)) )
  })
}

module.exports = { getBirthdaysMessage }