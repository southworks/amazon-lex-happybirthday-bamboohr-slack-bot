const getBirthdaysEmails = require('../data/azure')
const getUserIds = require('../data/slack')
const getMsgWithEmojis = require('../packages/birthdaymessage')
const fetch = require('node-fetch')
const AWS = require('aws-sdk')
const ssm = new AWS.SSM()
const AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM

const getBirthdaysMessage = () => {
  return getBirthdaysEmails()
    .then((emails) => getUserIds(emails))
    .then((ids) => getMsgWithEmojis(ids))
}

// TODO: For checkChannel method should be moved to service layer and remove this implementation from here
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
