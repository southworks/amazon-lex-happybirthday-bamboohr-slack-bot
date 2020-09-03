const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

/* Returns an Array with Slack users IDs by email */
const getUserIds = (emails) => {
  const promises = emails.map((email) => getSlackId(email))
  return Promise.all(promises).then((userIds) => userIds.filter((el) => el))
}

/* It should perform HTTP request to Slack API. */
const getSlackId = (userEmail) => {
  const url = 'https://slack.com/api/users.lookupByEmail?'
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
      return fetch(url + params, { headers: headers })
        .then((res) => res.json())
        .then((json) => {
          if (json.ok) {
            return json.user.id
          }
        })
    })
}

module.exports = getUserIds
