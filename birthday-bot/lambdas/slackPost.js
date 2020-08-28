const getBirthdaysMessage = require('../packages/birthdays')
const channels = require('../packages/channels')
const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

const postToSlack = (channel, callback) => {
  const url = 'https://slack.com/api/chat.postMessage'

  getBirthdaysMessage().then((message) => {
    let response

    if (message) {
      const params = {
        Name: AUTH_TOKEN_SSM,
        WithDecryption: true,
      }
      ssm.getParameter(params, (_, data) => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.Parameter.Value}`,
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
      })
    } else {
      response = { statusCode: 200, body: "There aren't any birthdays today." }

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
