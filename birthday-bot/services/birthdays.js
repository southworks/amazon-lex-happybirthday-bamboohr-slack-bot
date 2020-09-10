const { getCurrentDate } = require('../helpers/utils')
const Azure = require('../data/Azure')
const Slack = require('../data/Slack')
const Amazon = require('../data/Amazon')
const { Templates, MultiLanguageLG } = require('botbuilder-lg')

class Birthdays {
  constructor() {
    this.azureData = new Azure()
    this.slackData = new Slack()
    this.amazonData = new Amazon()
    this.AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM
    this.templatesPerLocale = new Map()
    this.templatesPerLocale.set(
      '',
      Templates.parseFile(`${__dirname}/../resources/sentences.lg`)
    )
    this.multiLangLG = new MultiLanguageLG(this.templatesPerLocale)
  }

  /* Returns a generated random message */
  getMsgWithEmojis(ids) {
    if (typeof ids === 'undefined' || !ids.length) {
      return ''
    }
  }

  /* Returns a string with tagged users. */
  joinIds(ids) {
    const taggedUsers = ids.map(this.idTag)
    let joined = ''

    if (taggedUsers.length > 1) {
      const lastOne = taggedUsers.pop()
      joined = taggedUsers.join(', ')
      joined += ` and ${lastOne}`
    } else {
      joined = taggedUsers.join('')
    }

    return joined
  }

  /* Tags ID with mention */
  idTag(id) {
    return `<@${id}>`
  }

  getBirthdaysMessage() {
    return this.getBirthdaysEmails()
      .then((emails) => this.getUserIds(emails))
      .then((ids) => this.getMsgWithEmojis(ids))
  }

  // This function uses Azure class
  async getBirthdaysEmails() {
    const today = getCurrentDate()
    const users = await this.azureData.readStore()
    return users
      .filter((user) => user.Birthday.substring(5) === today)
      .map((user) => user.Email)
  }

  // This function uses Slack class
  /* Returns an Array with Slack users IDs by email */
  async getUserIds() {
    const emails = await this.getBirthdaysEmails()
    console.log(emails)
    const token = await this.amazonData.getSSMParameter(
      process.env.AUTH_TOKEN_SSM,
      true
    )
    const promises = emails.map((email) =>
      this.slackData.getUserByEmail(email, token)
    )

    return Promise.all(promises).then((json) => {
      console.log(json.filter((json) => json.ok).map((users) => users.user.id))
      return json.filter((json) => json.ok).map((users) => users.user.id)
    })
  }

  // TODO: The checkChannel method should be moved to birthdays class and remove this implementation from here
  checkChannel(name) {
    const slack = new Slack()
    const amazon = new Amazon()

    return amazon
      .getSSMParameter(process.env.AUTH_TOKEN_SSM, true)
      .then((token) =>
        slack.getUsersConversations(token).then((slackJson) => {
          const channel = slackJson.channels.find(
            (channel) => channel.name === name
          )

          return channel ? { id: channel.id, name: channel.name } : ''
        })
      )
  }
}
module.exports = Birthdays
