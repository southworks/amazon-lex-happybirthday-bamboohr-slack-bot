const AWS = require('aws-sdk')
const S3 = new AWS.S3()

class Amazon {
  
  getFile(bucket, config_key) {
    configParams = {
      Bucket: bucket,
      Key: config_key,
    }

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

          resolve(JSON.parse(data.Body))
        }
      })
    })
  }

  putFile(bucket, config_key, data) {
    configParams = {
      Bucket: bucket,
      Key: config_key,
    }

    const params = {
      ...configParams,
      ContentType: 'application/json',
      Body: JSON.stringify(data),
    }

    console.log(`Storing data: ${JSON.stringify(params)}`)
  
    S3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else return data
    })
  }
}

module.exports = Amazon
