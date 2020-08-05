const birthdays = require('../packages/birthdays');

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

  callback(close(sessionAttributes, 'Fulfilled',
    { 'contentType': 'PlainText', 'content': birthdays.getBirthdaysMessage() }));
}

exports.handler = (event, context, callback) => {
  try {
    dispatch(event,
      (response) => {
        callback(null, response);
      });
  } catch (err) {
    callback(err);
  }
};
