const fetch = require('node-fetch')
const Amazon = require('../data/amazon')

class Slack {
  constructor() {
    this.AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM
  }

  getUserByEmail(userEmail) {
    const lookUpByEmailUrl = 'https://slack.com/api/users.lookupByEmail?'

    return this.sendRequest(lookUpByEmailUrl, 'GET', '', {
      email: userEmail,
    })
  }

  getUsersConversations() {
    const usersConversationUrl = 'https://slack.com/api/users.conversations?'

    return this.sendRequest(usersConversationUrl, 'GET', '', {
      types: 'public_channel,private_channel',
    })
  }

  postToSlack(channel, message) {
    if (!message)
      return {
        ok: true,
        message: { text: 'No birthdays today. No message to sent.' },
      }

    const postMessageUrl = 'https://slack.com/api/chat.postMessage'
    const body = JSON.stringify({ text: message, channel: channel })

    return this.sendRequest(postMessageUrl, 'POST', body, {})
  }

  async sendRequest(endpoint, method, body, uriParams) {
    this.slackToken = this.slackToken
      ? this.slackToken
      : await new Amazon().getSSMParameter(this.AUTH_TOKEN_SSM, true)

    const myInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.slackToken}`,
      },
    }

    if (body) {
      myInit.body = body
    }

    const params = new URLSearchParams(uriParams)

    return fetch(endpoint + params, myInit).then((res) => res.json())
  }
}

module.exports = Slack
