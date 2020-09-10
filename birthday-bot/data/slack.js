const fetch = require('node-fetch')

class Slack {
  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'
  usersConversationUrl = 'https://slack.com/api/users.conversations?'

  getUserByEmail(userEmail, token) {
    const params = {
      email: userEmail,
    }

    return this.getData(
      this.lookUpByEmailURL,
      token,
      'application/json',
      params
    )
  }

  getUsersConversations(token) {
    const params = {
      types: 'public_channel,private_channel',
    }

    return this.getData(
      this.usersConversationUrl,
      token,
      'application/json',
      params
    )
  }

  getData(endpoint, token, contentType, iparams) {
    const params = new URLSearchParams(iparams)

    const headers = {
      'Content-Type': contentType,
      Authorization: `Bearer ${token}`,
    }
    console.log(endpoint)
    return fetch(endpoint + params, {
      headers: headers,
    }).then((res) => {
      return res.json()
    })
  }
}

module.exports = Slack
