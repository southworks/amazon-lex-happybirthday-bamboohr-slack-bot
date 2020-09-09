const getUserIds = require('../data/slack')
const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')
const Azure = require('../data/Azure')
const Slack = require('../data/Slack')

class EmployeesBirthdays {
  constructor() {
    this.azureData = new Azure()
    this.slackData = new Slack()
  }
  // //////////////getBirthdaysMessage is going to be on another file.

  getBirthdaysMessage() {
    return this.getBirthdaysEmails()
      .then((emails) => this.getUserIds(emails))
      .then((ids) => getMsgWithEmojis(ids))
  }

  // //////////

  // This function use Azure class
  async getBirthdaysEmails() {
    const today = getCurrentDate()
    const users = await this.azureData.readStore()
    return users
      .filter((user) => user.Birthday.substring(5) === today)
      .map((user) => user.Email)
  }

  // This function use Slack class
  /* Returns an Array with Slack users IDs by email */
  async getUserIds() {
    const emails = await this.getBirthdaysEmails()
    console.log(emails)

    const promises = emails.map((email) => this.Slack.getUser(email))

    return Promise.all(promises).then(
      // (userObjects) => userObjects.filter((el) => el)
      (users) => users.filter((el) => el)
      // First:json.ok, map(json.user.id)
      // here I have to return json.user.id
    )
    // solve this filter function
  }
}
module.exports = EmployeesBirthdays
