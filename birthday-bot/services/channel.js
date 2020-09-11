const Amazon = require('../data/amazon')
const Slack = require('../data/slack')
const utils = require('../helpers/utils')

class Channel {
  constructor() {
    this.configKey = 'config.json'
    this.amazon = new Amazon()
    this.slack = new Slack()
    this.BUCKET = process.env.S3_BUCKET
  }

  checkChannel(name) {
    return this.slack.getUsersConversations().then((slackJson) => {
      const channel = slackJson.channels.find(
        (channel) => channel.name === name
      )

      return channel ? { id: channel.id, name: channel.name } : ''
    })
  }

  getChannel() {
    return this.amazon
      .getFile(this.BUCKET, this.configKey)
      .then((channel) => channel)
  }

  setChannel(name) {
    return this.amazon.putFile(
      this.BUCKET,
      this.configKey,
      utils.newChannel(name)
    )
  }
}

module.exports = Channel
