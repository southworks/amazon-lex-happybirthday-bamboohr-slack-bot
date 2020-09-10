const getBirthdaysMessage = require('../services/birthdays')
const Amazon = require('../data/amazon')
const fetch = require('node-fetch')

const postToSlack = (channel, callback) => {
  const url = 'https://slack.com/api/chat.postMessage'

  getBirthdaysMessage().then(async (message) => {
    let response
    const amazon = new Amazon()

    if (message) {
      const token = await amazon.getSSMParameter(process.env.AUTH_TOKEN_SSM, true)
      
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
        const body = JSON.stringify({ text: message, channel: channel })

        fetch(url, { method: 'post', body: body, headers: headers })
          .then((res) => res.json())
          .then((json) => {
            console.log(json)

            if (json.ok) {
              response = { statusCode: 200, body: 'Message sent!' }
            } else {
              response = { statusCode: 501, body: JSON.stringify(json) }
            }

            callback(response)
          })
      
    } else {
      response = { statusCode: 200, body: "There aren't any birthdays today." }

      callback(response)
    }
  })
}

const proactive = async (event, context, callback) => {

  const amazon = new Amazon()
  const channelObj = await amazon.getFile(process.env.S3_BUCKET, 'config.json')
  console.log('channelObj 1', channelObj)
  console.log('channelObj 2', channelObj.channel)

  postToSlack(channelObj.channel, (response) => {
    callback(null, response)
  })
}

module.exports = { proactive }
