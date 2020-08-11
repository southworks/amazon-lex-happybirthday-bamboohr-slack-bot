'use strict';

const channels = require('./channels');

function close(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
    },
  };
}

function dispatch(intentRequest, callback) {
  const sessionAttributes = intentRequest.sessionAttributes;
  const slots = intentRequest.currentIntent.slots;
  const newChannel = slots.channel;

  if (typeof newChannel !== 'string' || !newChannel) {
    console.error('Validation Failed');

    callback(close(sessionAttributes, 'Fulfilled', {
      'contentType': 'PlainText',
      'content': 'The channel validation failed.'
    }));
  }

  const newChannelObject = {
    id: 'channel',
    text: newChannel,
    updatedAt: new Date().getTime(),
  }

  channels.setChannel(newChannelObject);
}

exports.config = (event, context, callback) => {
  try {
    dispatch(event,
      (response) => {
        callback(null, response);
      });
  } catch (err) {
    callback(err);
  }
};
