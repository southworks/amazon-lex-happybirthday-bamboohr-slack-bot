const utils = require('./utils');

const getBirthdaysEmails = () => {
    let bambooList = utils.getJSON('./json/bamboo.json')
    let date = utils.getDate();

    let birthdaysEmails = [];

    bambooList.forEach(bamboo => {
        if (bamboo.birthday == date) birthdaysEmails.push(bamboo.mail);
    });

    return birthdaysEmails;
}

module.exports = {getBirthdaysEmails}