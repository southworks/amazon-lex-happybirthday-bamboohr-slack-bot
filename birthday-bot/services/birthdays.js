const getMsgWithEmojis = require('../packages/birthdaymessage')
const { getCurrentDate } = require('../helpers/utils')
const Azure = require('../data/azure')
const Slack = require('../data/slack')
const Amazon = require('../data/amazon')
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()


const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}


// WARN: This function should be refactored to use Azure class
const getBirthdaysEmails = async () => {
  const today = getCurrentDate()
  const az = new Azure()
  const users = await az.readStore()
  console.log('users', users)
  return users
    .filter((user) => user.Birthday.substring(5) === today)
    .map((user) => user.Email)
}

// WARN: This function should be refactored to use Slack class
/* Returns an Array with Slack users IDs by email */
const getUserIds = async (emails) => {
  const slack = new Slack()
  const amazon = new Amazon()
  const token = await amazon.getSSMParameter(process.env.AUTH_TOKEN_SSM, true)
  const promises = emails.map((email) => slack.getUserByEmail(email, token))
  return Promise.all(promises).then((users) => 
    users.map(user => {
      return user.user.id
    })
  )
}

// TODO: The checkChannel method should be moved to birthdays class and remove this implementation from here
const checkChannel = (name) => {
  const ssmParams = {
    Name: AUTH_TOKEN_SSM,
    WithDecryption: true,
  }

  return ssm
    .getParameter(ssmParams, (_, data) => {})
    .promise()
    .then((data) => {
      const url = 'https://slack.com/api/users.conversations?'
      const params = new URLSearchParams({
        token: data.Parameter.Value,
        types: 'public_channel,private_channel',
      })

      return fetch(url + params, { method: 'get' })
        .then((res) => res.json())
        .then((json) => {
          const channel = json.channels.find((channel) => channel.name === name)
          return channel ? { id: channel.id, name: channel.name } : ''
        })
    })
}

module.exports = { getBirthdaysMessage, checkChannel }
