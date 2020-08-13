const channels = require('../packages/channels')

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
  const name = slots.channel

  let response
  if (typeof name !== 'string' || !name) {
    console.error('Validation Failed')

    response = 'The channel name validation failed.'
  } else {
    channels.setChannel(name)

    response = `The channel #${name} was configured correctly`
  }

  callback(close(sessionAttributes, 'Fulfilled',
    { 'contentType': 'PlainText', 'content': response }))
}

const config = (event, context, callback) => {
  try {
    dispatch(event, (response) => { callback(null, response)})
  } catch (err) {
    callback(err)
  }
}

module.exports = { config }