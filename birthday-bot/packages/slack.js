const fetch = require('node-fetch')
const authToken = process.env.slackAuthToken

/* Returns an Array with Slack users IDs by email */
const getUserIds = (emails) => {
  const promises = []
  emails.map((email) => promises.push(getSlackId(email)))

  return Promise.all(promises).then(userIds => userIds.filter((el) => el))
}

/* It should perform HTTP request to Slack API. */
const getSlackId = (userEmail) => {
  const url = 'https://slack.com/api/users.lookupByEmail?'
  const params = new URLSearchParams({ email: userEmail })

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  }

  return fetch(url + params, { headers: headers })
    .then(res => res.json())
    .then(json => {
      if (json.ok) { return json.user.id }
    })
}

module.exports = getUserIds
