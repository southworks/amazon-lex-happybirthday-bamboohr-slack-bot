const getBirthdaysEmails = require("./employees");
const getUserIds = require("./slack");
const getMsgWithEmojis = require("./birthdaymessage");

const getBirthdaysMessage = () => {
  let emails = getBirthdaysEmails();

  let ids = getUserIds(emails);

  return getMsgWithEmojis(ids);
};

module.exports = { getBirthdaysMessage };
