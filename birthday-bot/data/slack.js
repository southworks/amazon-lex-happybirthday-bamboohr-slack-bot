const fetch = require('node-fetch')

class Slack {
  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'

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
}

module.exports = Slack
