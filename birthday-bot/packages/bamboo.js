const utils = require('./utils');

const getBirthdaysEmails = () => {
  const today = utils.getCurrentDate();
  const users = getUsers();

  let emails = [];

  users.forEach(user => {
    if (user.birthday == today) emails.push(user.mail);
  });

  return emails;
}

/*
 * It should perform Http request to Bamboo API
 * It should give us at least emails and birthday dates.
 */
function getUsers() {
  return require('../mock/bambooUsers.json')
}

module.exports = getBirthdaysEmails