const channels = require('../data/amazon')
const utils = require('../helpers/utils')
const services = require('../services/birthdays')

const config = (event, _, callback) => {
  const sessionAttributes = event.sessionAttributes
  const slots = event.currentIntent.slots
  const channelName = slots.channel

  services
    .checkChannel(channelName)
    .then((channel) => {
      if (channel) {
        channels.setChannel(channel.name)
        return `The channel <#${channel.id}> was configured correctly`
      }
      // eslint-disable-next-line max-len
      return 'That channel is not available for me, add me to the channel by clicking on me, then selecting "Add this app to a channel", and finally, choosing the channel\'s name'
    })
    .then((message) =>
      callback(
        null,
        utils.messageToResponse(message, 'Fulfilled', sessionAttributes)
      )
    )
    .catch((err) => callback(err))
}

module.exports = { config }
