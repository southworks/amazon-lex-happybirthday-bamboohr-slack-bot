const fetch = require('node-fetch')
const authToken = process.env.slackAuthToken

/* Returns an Array with Slack users IDs by email */
const getUserIds = (emails) => {
  return new Promise((resolve, reject) => {
    let promises = []
    emails.map((email) => promises.push(getSlackId(email)) )

    Promise.all(promises)
      .then(userIds => {
        userIds = userIds.filter(function (el) {
          return el; // Remove undefined values
        });
        resolve(userIds)
      })
  })
}

/* It should perform HTTP request to Slack API. */
const getSlackId = (userEmail) => {
  let url = 'https://slack.com/api/users.lookupByEmail?'
  const params = new URLSearchParams({ email: userEmail })

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  }

  return new Promise((resolve, reject) => {
    fetch(url + params, { headers: headers })
      .then(res => res.json())
      .then(json => {
        if (json.ok)
          resolve(json.user.id)
        else
          resolve()
      })
  })
}

module.exports = getUserIds