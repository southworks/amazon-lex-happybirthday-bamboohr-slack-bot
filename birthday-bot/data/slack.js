const fetch = require('node-fetch')
const Amazon = require('./amazon')
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

class Slack {

  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'

  getUserObject(userEmail, token) {
    const params = new URLSearchParams({ email: userEmail })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    return fetch(this.lookUpByEmailURL + params, { headers: headers })
      .then((res) => res.json())
  }
}

module.exports = Slack
