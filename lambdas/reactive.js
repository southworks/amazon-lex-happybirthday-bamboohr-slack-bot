const getBirthdays = require('./getBirthdays');

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled
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

// --------------- Events -----------------------
function dispatch(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes;

    birthdayMessage = getBirthdays.getBirthdays()

    callback( close(sessionAttributes, 'Fulfilled', {
        'contentType': 'PlainText',
        'content': birthdayMessage
    }));
}

// --------------- Main handler -----------------------
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