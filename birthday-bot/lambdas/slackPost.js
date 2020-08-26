const authToken = process.env.slackAuthToken
const birthdays = require('../packages/birthdays')
const channels = require('../packages/channels')
const fetch = require('node-fetch')

const postToSlack = (channel, callback) => {
  const url = 'https://slack.com/api/chat.postMessage'

  birthdays.getBirthdaysMessage().then((message) => {
    let response

    if (message) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }
      const body = JSON.stringify({ text: message, channel: channel })

      fetch(url, { method: 'post', body: body, headers: headers })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)

          if (json.ok) {
            response = { statusCode: 200, body: 'Message sent!' }
          } else {
            response = { statusCode: 501, body: JSON.stringify(json) }
          }

          callback(response)
        })
    } else {
      response = { statusCode: 200, body: "There aren't any birthday today." }

      callback(response)
    }
  })
}

const proactive = (event, context, callback) => {
  channels
    .getChannel()
    .then((channelName) => {
      postToSlack(channelName, (response) => {
        callback(null, response)
      })
    })
    .catch((err) => callback(null, err))
}

module.exports = { proactive }
