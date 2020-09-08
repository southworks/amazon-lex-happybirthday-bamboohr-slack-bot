const channels = require('../data/amazon')
const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM
const utils = require('../helpers/utils')

const config = (event, _, callback) => {
    const sessionAttributes = event.sessionAttributes
    const slots = event.currentIntent.slots
    const channelName = slots.channel

    checkChannel(channelName).then(channel => {
        if (channel) {
            channels.setChannel(channel.name)
            return `The channel <#${channel.id}> was configured correctly`
        }
        // eslint-disable-next-line max-len
        return 'That channel is not available for me, add me to the channel by clicking on me, then selecting "Add this app to a channel", and finally, choosing the channel\'s name'
    }).then(message =>
        callback(null, utils.messageToResponse(message, sessionAttributes))
    )
    .catch(err => callback(err))
}

// TODO: For checkChannel method should be moved to service layer and remove this implementation from here
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

module.exports = { config }
