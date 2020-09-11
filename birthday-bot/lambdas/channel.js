const utils = require('../helpers/utils')
const Channel = require('../services/channel')

const config = (event, _, callback) => {
  const sessionAttributes = event.sessionAttributes
  const channelName = event.currentIntent.slots.channel
  const channelService = new Channel()

  channelService
    .checkChannel(channelName)
    .then((channel) => {
      if (channel) {
        return channelService
          .setChannel(channel.name)
          .then(() => `The channel <#${channel.id}> was configured correctly`)
          .catch(() => 'There was an error configuring the channel.')
      } else {
        // eslint-disable-next-line max-len
        return 'That channel is not available for me, add me to the channel by clicking on me, then selecting "Add this app to a channel", and finally, choosing the channel\'s name'
      }
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
