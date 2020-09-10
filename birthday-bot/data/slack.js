const fetch = require('node-fetch')

class Slack {
  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'

  constructor() {
    this.amazon = new Amazon()
  }
=======
>>>>>>> 892b5299306fdc3aced50117e9303f401cd8d53a

  getUserByEmail(userEmail, token) {
    const params = new URLSearchParams({ email: userEmail })
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

<<<<<<< HEAD
    return this.amazon.getSSMParameter(AUTH_TOKEN_SSM, true).then((token) => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      return fetch(this.lookUpByEmailURL + params, {
        headers: headers,
      }).then((res) => res.json())
    })
  }
=======
    return fetch(this.lookUpByEmailURL + params, { headers: headers })
      .then((res) => res.json())
    }
>>>>>>> 892b5299306fdc3aced50117e9303f401cd8d53a
}

module.exports = Slack
