const { getCurrentDate } = require('../helpers/utils')
const { getMsgWithEmojis } = require('../helpers/message')
const Azure = require('../data/azure')
const Slack = require('../data/slack')
const Amazon = require('../data/amazon')
const Channel = require('../services/channel')

class Birthdays {
  constructor() {
    this.azure = new Azure()
    this.slack = new Slack()
    this.amazon = new Amazon()
  }

  async sendBirthdayMessage() {
    const channelJson = await new Channel().getChannel()
    // console.log(channel)
    return this.getBirthdays()
      .then((usersIds) => {
        console.log(usersIds)
        return getMsgWithEmojis(usersIds)
      })
      .then((message) => {
        console.log(message)
        if (message) return this.slack.postToSlack(channelJson.channel, message)
        else return { ok: false, error: 'No message to sent.' }
      })
  }

  async getBirthdays() {
    return this.getBirthdaysEmails().then((emails) => this.getUserIds(emails))
  }

  async getBirthdaysEmails() {
    const today = getCurrentDate()
    const users = await this.azure.readStore()

    return users
      .filter((user) => user.Birthday.substring(5) === today)
      .map((user) => user.Email)
  }

  async getUserIds(emails) {
    const promises = emails.map((email) => this.slack.getUserByEmail(email))

    return Promise.all(promises).then((users) =>
      users
        .filter((userJson) => userJson.ok)
        .map((userJson) => userJson.user.id)
    )
  }
}

module.exports = Birthdays
