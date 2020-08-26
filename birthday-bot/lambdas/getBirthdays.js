const getBirthdaysMessage = require('../packages/birthdays');

const close = (sessionAttributes, fulfillmentState, message) => {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message,
    },
  };
};

const dispatch = (intentRequest, callback) => {
  const sessionAttributes = intentRequest.sessionAttributes;

  getBirthdaysMessage().then(message => {
    callback( close(sessionAttributes, 'Fulfilled', {
        contentType: 'PlainText',
        content: message,
    }));
  })
};

const handler = (event, context, callback) => {
  console.log(event);

  try {
    dispatch(event, (response) => callback(null, response));
  } catch (err) {
    callback(err);
  }
};

module.exports = { handler };
