const bamboo = require('./bamboo');
const slack = require('./slack');

const getBirthdaysMessage = () => {
  let emails = bamboo.getBirthdaysEmails()

  return slack.getBirthdayGreeting(emails)
}

module.exports = { getBirthdaysMessage }