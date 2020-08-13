const birthdays = require('../packages/birthdays');
const fetch = require("node-fetch");
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDbTable = process.env.DYNAMODB_TABLE;
const authToken = process.env.slackAuthToken;

function postToSlack(channel, callback) {
  let url = "https://slack.com/api/chat.postMessage";
  let message = birthdays.getBirthdaysMessage();
  let response;

  if (message) {
    fetch(url, {
      method: "post",
      body: JSON.stringify({
          text: message,
          channel: channel
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
  
      if (json.ok) {
        response = {
          statusCode: 200,
          body: 'Message sent!'
        }
      } else {
        response = {
          statusCode: 501,
          body: JSON.stringify(json)
        }
      }
  
      callback(response)
    });
  } else {
    response = {
      statusCode: 200,
      body: `There aren't any birthday today.`
    }
    callback(response)
  }
  
}

exports.proactive = (event, context, callback) => {
  const params = {
    TableName: dynamoDbTable,
    Key: {
      id: "channel",
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      return "error";
    }

    postToSlack("facu-gonza-tests",
      (response) => {
        callback(null, response);
      });
  });
};