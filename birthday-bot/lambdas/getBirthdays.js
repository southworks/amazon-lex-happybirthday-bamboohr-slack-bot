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

module.exports.handler = (event, context, callback) => {
  console.log(event)
  try {
    dispatch(event,
      (response) => {
        callback(null, response);
      });
  } catch (err) {
    callback(err);
  }
};
