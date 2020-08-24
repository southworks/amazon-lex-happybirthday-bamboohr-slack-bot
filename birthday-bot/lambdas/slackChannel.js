const channels = require('../packages/channels')
const fetch = require('node-fetch')
const authToken = process.env.slackAuthToken

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

  checkchannel(channelName).then(channelNameCorrect => {

      if (channelNameCorrect == null) {
        console.error('Validation Failed');

        response = 'The channel name validation failed.';
      }
      else {
        if (channelNameCorrect) {
          channels.setChannel(channelName)
          response = `The channel #${channelName} was configured correctly`
        }
        else {
          response = `The channel is not available for me, add me to the channel #${channelName}`
        }
      }

      callback(close(sessionAttributes, 'Fulfilled',
      { 'contentType': 'PlainText', 'content': response }));
  });
}

const checkchannel = (name) => {
  const url = 'https://slack.com/api/users.conversations'

  const headers = {
    'Authorization': `Bearer ${authToken}`
  }

  if (typeof name !== 'string' || !name) {
    return;
  }

  return fetch(url, { method: 'get', headers: headers })
      .then(res => res.json())
      .then(json => {

        let channelsArray;

        if (json.channels) {
          if (Array.isArray(json.channels))
            channelsArray = json.channels;
        }
        
        if (!channelsArray)
          return;

        return channelsArray.length > 0 && channelsArray.filter(channel => channel.name === name).length > 0;
      });
}

const config = (event, context, callback) => {
  try {
    dispatch(event, (response) => { callback(null, response)})
  } catch (err) {
    callback(err)
  }
}

module.exports = { config }
