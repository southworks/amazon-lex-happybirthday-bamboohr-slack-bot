const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')
const Slack = require('../data/slack')
const AWS = require('aws-sdk')
const slackObject = new Slack
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}

// WARN: This function should be refactored to use Azure class
const getBirthdaysEmails = async () => {
  const today = getCurrentDate()
  const users = await readStore()

  return users
    .filter((user) => user.Birthday.substring(5) === today)
    .map((user) => user.Email)
}

// WARN: This function should be refactored to use Slack class
/* Returns an Array with Slack users IDs by email */
const getUserIds = (emails) => {
  const promises = emails.map((email) => getSlackId(email))
  return Promise.all(promises).then((userIds) => userIds.filter((el) => el))
}

const checkChannel = async (name) => {
  let channelResult = '';
  const ssmParams = {
    Name: AUTH_TOKEN_SSM,
    WithDecryption: true,
  }

  return await ssm.getParameter(ssmParams, (_, data) => {
      return slackObject.getChannels(data.Parameter.Value).then(slackJson => {
        const channel = slackJson.channels.find((channel) => channel.name === name)
        channelResult = channel ? { id: channel.id, name: channel.name } : ''
      });
  })
  .promise()
  .then(() => channelResult)
}

module.exports = { getBirthdaysMessage, checkChannel }
