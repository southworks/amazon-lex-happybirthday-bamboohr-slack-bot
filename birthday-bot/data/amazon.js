const AWS = require('aws-sdk')
const S3 = new AWS.S3()

class Amazon {

  BUCKET = process.env.S3_BUCKET
  CONFIG_KEY = 'config.json'
  configParams = {
    Bucket: this.BUCKET,
    Key: this.CONFIG_KEY,
  }

  constructor() {}

  getChannel() {
    const params = {
      ...this.configParams,
      ResponseContentType: 'application/json',
    }

    return new Promise((resolve, reject) => {
      S3.getObject(params, (err, data) => {
        if (err) {
          console.log('Channel File Not Found, then I will create it')

          reject(err)
        } else {
          console.log(`Channel File Found: ${data.Body.toString()}`)

          resolve(JSON.parse(data.Body).channel)
        }
      })
    })
  }

  setChannel(name) {
    const params = {
      ...this.configParams,
      ContentType: 'application/json',
      Body: JSON.stringify(this.newChannel(name)),
    }
    console.log(`Setting Channel: ${JSON.stringify(params)}`)
  
    S3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else return data
    })
  }

  newChannel(name) {
    return {
      channel: name,
      updatedAt: new Date().toISOString(),
    }
  }
}

module.exports = Amazon
