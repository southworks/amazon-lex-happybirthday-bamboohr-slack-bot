const fetch = require('node-fetch')
const Amazon = require('./amazon')
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

class Slack {

  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'
  
  constructor() {
    amazon = new Amazon()
  }

  getUserObject(userEmail) {
    const params = new URLSearchParams({ email: userEmail })

    return this.amazon.getSSMParameter(AUTH_TOKEN_SSM, true)
      .then((token) => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
        return fetch(this.lookUpByEmailURL + params, { headers: headers })
          .then((res) => res.json())
      })
  }
}

module.exports = Slack
