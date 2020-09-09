const AWS = require('aws-sdk')

class Amazon {

  constructor() {
    this.S3 = new AWS.S3()
    this.ssm = new AWS.SSM()
  }
  
  getFile(bucket, config_key) {
    const configParams = {
      Bucket: bucket,
      Key: config_key,
    }

    const params = {
      ...configParams,
      ResponseContentType: 'application/json',
    }

    return new Promise((resolve, reject) => {
      this.S3.getObject(params, (err, data) => {
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
    const configParams = {
      Bucket: bucket,
      Key: config_key,
    }

    const params = {
      ...configParams,
      ContentType: 'application/json',
      Body: JSON.stringify(data),
    }

    console.log(`Storing data: ${JSON.stringify(params)}`)
  
    this.S3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack)
      else return data
    })
  }

  getSSMParameter(name, decryption) {
    const ssmParams = {
      Name: name,
      WithDecryption: decryption,
    }

    return this.ssm
      .getParameter(ssmParams, (_, data) => {})
      .promise()
      .then((data) => data.Parameter.Value)
  }
}

module.exports = Amazon
