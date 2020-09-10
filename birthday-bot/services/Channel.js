const Amazon = require('.data/Amazon')

class Channel {
  constructor() {
    this.CONFIG_KEY = 'config.json'
    this.amazonData = new Amazon()
    this.BUCKET = process.env.S3_BUCKET
    this.AUTH_TOKEN_SSM = process.env.AUTH_TOKEN_SSM
  }

  checkChannel(name) {
    const ssmParams = {
      Name: this.AUTH_TOKEN_SSM,
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
            const channel = json.channels.find(
              (channel) => channel.name === name
            )
            return channel ? { id: channel.id, name: channel.name } : ''
          })
      })
  }

  // //////////////getBirthdaysMessage is going to be on another file.
  getChannel() {
    return this.amazonData.getFile().channel
  }

  /* [String] Set a channel name to storage S3 file */
  setChannel(name) {
    this.amazonData.putFile(name)
    console.log(`Setting Channel: ${JSON.stringify(name)}`)
  }
  /*
  newChannel(name) {
    return {
      channel: name,
      updatedAt: new Date().toISOString(),
    }
  }
*/
}
module.exports = Channel
