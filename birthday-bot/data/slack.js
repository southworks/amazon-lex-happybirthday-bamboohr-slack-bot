const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

class Slack {

  lookUpByEmailURL = 'https://slack.com/api/users.lookupByEmail?'
  
  constructor() {}
  
  getSlackId(userEmail) {
    const params = new URLSearchParams({ email: userEmail })
    const ssmParams = {
      Name: AUTH_TOKEN_SSM /* required */,
      WithDecryption: true,
    }

    return ssm
      .getParameter(ssmParams, (_, data) => {})
      .promise()
      .then((data) => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.Parameter.Value}`,
        }
        return fetch(this.lookUpByEmailURL + params, { headers: headers })
          .then((res) => res.json())
          .then((json) => {
            if (json.ok) {
              return json.user.id
            }
          })
      })
  }
}

module.exports = Slack