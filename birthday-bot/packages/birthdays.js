const getBirthdaysEmails = require('./employees');
const getUserIds = require('./slack');
const getMsgWithEmojis = require('./birthdaymessage');

const getBirthdaysMessage = async () => {
  return getBirthdaysEmails()
    .then(emails => getUserIds(emails))
    .then(ids => getMsgWithEmojis(ids))
};

module.exports = getBirthdaysMessage;
