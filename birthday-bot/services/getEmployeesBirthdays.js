const getUserIds = require('../data/slack')
const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')
const Azure = require('.data/azure')

class EmployeesBirthdays {
  constructor() {
    this.azureData = new Azure()
    this.slackData = new Slack()
  }
  // //////////////getBirthdaysMessage is going to be on another file.

  getBirthdaysMessage() {
    return this.getBirthdaysEmails()
      .then((emails) => getUserIds(emails))
      .then((ids) => getMsgWithEmojis(ids))
  }

  // //////////

  // This function use Azure class
  async getBirthdaysEmails() {
    const today = getCurrentDate()
    const users = await this.azureConnector.readStore()
    return users
      .filter((user) => user.Birthday.substring(5) === today)
      .map((user) => user.Email)
  }

  // This function use Slack class
  /* Returns an Array with Slack users IDs by email */
  async getUserIds() {
    const emails = await this.getBirthdaysEmails()
    const promises = emails.map((email) => this.Slack.getUserObject(email))

    return Promise.all(promises).then(
      // (userObjects) => userObjects.filter((el) => el)
      (userObjects) => userObjects.filter((el) => el)
      // here I have to return json.user.id
    )
    // solve this filter function
  }
}
module.exports = EmployeesBirthdays
