const channels = require('../packages/channels')
const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

function close(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
    },
  }
}

function dispatch(intentRequest, callback) {
  const sessionAttributes = intentRequest.sessionAttributes
  const slots = intentRequest.currentIntent.slots
  const channelName = slots.channel

  let response

  checkChannel(channelName).then((channel) => {
    if (channel) {
      channels.setChannel(channel.name)
      response = `The channel <#${channel.id}> was configured correctly`
    } else {
      response =
        // eslint-disable-next-line max-len
        'That channel is not available for me, add me to the channel by clicking on me, then selecting "Add this app to a channel", and finally, choosing the channel\'s name'
    }

    callback(
      close(sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: response,
      })
    )
  })
}

const checkChannel = (name) => {
  const ssmParams = {
    Name: AUTH_TOKEN_SSM,
    WithDecryption: true,
  }

  return ssm
    .getParameter(ssmParams, (_, data) => {})
    .promise()
    .then((data) => {
      const url = 'https://slack.com/api/users.conversations?'
      const params = new URLSearchParams({
        token: data.Parameter.Value,
        types: 'public_channel,private_channel',
      })

      return fetch(url + params, { method: 'get' })
        .then((res) => res.json())
        .then((json) => {
          const channel = json.channels.find((channel) => channel.name === name)
          return channel ? { id: channel.id, name: channel.name } : ''
        })
    })
}

const config = (event, context, callback) => {
  try {
    dispatch(event, (response) => {
      callback(null, response)
    })
  } catch (err) {
    callback(err)
  }
}

module.exports = { config }
