const Amazon = require('.data/Amazon')

class Channel {
  constructor() {
    this.CONFIG_KEY = 'config.json'
    this.amazonData = new Amazon()
    this.BUCKET = process.env.S3_BUCKET
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
