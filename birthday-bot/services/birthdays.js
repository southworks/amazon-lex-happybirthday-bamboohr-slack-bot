const { getCurrentDate } = require('../helpers/utils')
const { getMsgWithEmojis } = require('../helpers/message')
const Azure = require('../data/azure')
const Slack = require('../data/slack')
const Amazon = require('../data/amazon')
const Channel = require('../services/channel')

class Birthdays {
  constructor() {
    let id
    this.azure = new Azure()
    this.slack = new Slack()
    this.amazon = new Amazon()
  }

  async sendBirthdayMessage() {
    const channel = await new Channel().getChannel()

    return this.getBirthdays()
      .then((usersIds) => getMsgWithEmojis(usersIds))
      .then((message) => this.slack.postToSlack(channel, message))
  }

  getBirthdays() {
    return this.getBirthdaysEmails().then((emails) => this.getUserIds(emails))
  }

  async getBirthdaysEmails() {
    const today = getCurrentDate()
    const users = await this.azure.readStore()

    return users
      .filter((user) => user.Birthday.substring(5) === today)
      .map((user) => user.Email)
  }

  getUserIds(emails) {
    const promises = emails.map((email) => this.slack.getUserByEmail(email))

    return Promise.all(promises).then((users) =>
      users
        .filter((userJson) => userJson.ok)
        .map((userJson) => userJson.user.id)
    )
  }
}

module.exports = Birthdays
