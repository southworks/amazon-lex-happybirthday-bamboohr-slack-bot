const utils = require('./utils');

/* Returns an Array with Slack users IDs by email */
const getUserIds = (emails) => {
  const users = getUsers();
  let ids = [];

  emails.some(email => {
    users.some(user => {
      return user.mail == email ? ids.push(user.id) : false;
    });
    return emails.length == ids.length;
  })

  return ids;
}

/* It should perform Http request to Slack API. */
const getUsers = () => utils.readJSON('../mock/slackUsers.json');

module.exports = getUserIds