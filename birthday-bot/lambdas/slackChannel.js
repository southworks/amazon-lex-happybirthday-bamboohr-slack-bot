const channels = require('../data/amazon')
const AWS = require('aws-sdk')
const Slack = require('../data/slack')
const ssm = new AWS.SSM()
const slackObject = new Slack
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

const checkChannel = async (name) => {
  let channelResult = '';
  const ssmParams = {
    Name: AUTH_TOKEN_SSM,
    WithDecryption: true,
  }

  return await ssm.getParameter(ssmParams, (_, data) => {
      return slackObject.getChannels(data.Parameter.Value).then(channels => {
        const channel = channels.find((channel) => channel.name === name)
        channelResult = channel ? { id: channel.id, name: channel.name } : ''
      });
  })
  .promise()
  .then(() => channelResult)
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
