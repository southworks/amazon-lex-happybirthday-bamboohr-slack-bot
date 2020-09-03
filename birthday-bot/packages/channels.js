const AWS = require('aws-sdk')
const S3 = new AWS.S3()

const BUCKET = process.env.S3_BUCKET
const CONFIG_KEY = 'config.json'
const configParams = {
  Bucket: BUCKET,
  Key: CONFIG_KEY,
}

/* [String] Retrieve a channel name from storage S3 file */
const getChannel = () => {
  const params = {
    ...configParams,
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

/* [String] Set a channel name to storage S3 file */
const setChannel = (name) => {
  const params = {
    ...configParams,
    ContentType: 'application/json',
    Body: JSON.stringify(newChannel(name)),
  }
  console.log(`Setting Channel: ${JSON.stringify(params)}`)

  S3.putObject(params, (err, data) => {
    if (err) console.log(err, err.stack)
    else return data
  })
}

const newChannel = (name) => {
  return {
    channel: name,
    updatedAt: new Date().toISOString(),
  }
}

module.exports = { getChannel, setChannel }
