const getBirthdaysEmails = require('./bamboo');
const getUserIds = require('./slack');
const getMsgWithEmojis = require('./birthdayMessage');

const getBirthdaysMessage = () => {
  let emails = getBirthdaysEmails()

  let ids = getUserIds(emails)

  return getMsgWithEmojis(ids)
}
console.log(getBirthdaysMessage())
module.exports = { getBirthdaysMessage }