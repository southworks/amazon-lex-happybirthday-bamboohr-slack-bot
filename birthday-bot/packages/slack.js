const utils = require('./utils');

const icon1 = ':birthday:';
const icon2 = ':birthday_party_parrot:';
const icon3 = ':pepecryhands:';
const icon4 = ':pepecrydrink:';

const getBirthdayGreeting = (emails) => {
  const ids = getUserIds(emails)
  const users = joinUsers(ids)

  if (ids.length > 0) {
    return `${icon1} ${icon2} Happy birthday ${users}! ${icon2} ${icon1}`;
  }

  return `We don't have any birthday today ${icon3} ${icon4}`
}

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
const getUsers = () => utils.readJSON('./mock/slackUsers.json');

/* Returns a string with tagged users. */
const joinUsers = (ids) => {
  const taggedUsers = ids.map(userTag);
  let joined = '';

  if (taggedUsers.length > 1) {
    const lastOne = taggedUsers.pop();
    joined = taggedUsers.join(', ');
    joined += ` and ${lastOne}`;
  } else {
    joined = taggedUsers.join('');
  }

  return joined;
}

/* Tags ID with mention */
const userTag = (id) => `<@${id}>`;

module.exports = { getBirthdayGreeting }