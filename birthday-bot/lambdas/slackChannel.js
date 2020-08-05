'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDbTable = process.env.DYNAMODB_TABLE;

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
    callback( close(sessionAttributes, 'Fulfilled', {
      'contentType': 'PlainText',
      'content': 'The channel validation failed.'
    }));
  }

  const params = {
    TableName: dynamoDbTable,
    Item: {
      id: 'channel',
      text: newChannel,
      updatedAt: new Date().getTime(),
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback( close(sessionAttributes, 'Fulfilled', {
        'contentType': 'PlainText',
        'content': `Sorry, I couldn't set the new channel.`
      }));
    }

    callback( close(sessionAttributes, 'Fulfilled', {
      'contentType': 'PlainText',
      'content': 'The channel #' + newChannel + ' was configured correctly.'
    }));
  });
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