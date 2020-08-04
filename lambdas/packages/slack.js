const utils = require('./utils');

const getBirthdaysSlackIds = (birthdaysEmails) => {
    let slackList = utils.getJSON('./json/slack.json')
    
    let birthdaysSlackIds = [];
    
    birthdaysEmails.some(birthdayEmail => {
        slackList.some(slack => {
            return (slack.mail == birthdayEmail ? birthdaysSlackIds.push("<@" + slack.id + ">") : false)
        });
        return (birthdaysEmails.length == birthdaysSlackIds.length ? true : false);
    })
    
    return birthdaysSlackIds
}

module.exports = {getBirthdaysSlackIds}