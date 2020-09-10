const fetch = require('node-fetch')

class Slack {
  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'
  usersConversationUrl = 'https://slack.com/api/users.conversations?'

  getUserByEmail(userEmail, token) {
    const params = new URLSearchParams({ email: userEmail })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    return fetch(this.lookUpByEmailURL + params, {
      headers: headers,
    }).then((res) => res.json())
  }

  getUsersConversations(token) {
    const url = this.usersConversationUrl

    const params = new URLSearchParams({
      token,
      types: 'public_channel,private_channel',
    })

    return fetch(url + params, { method: 'get' })
      .then((res) => res.json())
      .then((json) => json)
  }
}

module.exports = Slack
