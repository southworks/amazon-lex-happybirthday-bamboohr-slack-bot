const AWS = require('aws-sdk')

class Amazon {
  constructor() {
    this.S3 = new AWS.S3()
    this.ssm = new AWS.SSM()
  }

  getFile(bucket, config_key) {
    const params = {
      Bucket: bucket,
      Key: config_key,
      ResponseContentType: 'application/json',
    }

    return this.S3.getObject(params)
      .promise()
      .then((data) => {
        console.log(`Channel File Found: ${data.Body.toString()}`)
        return JSON.parse(data.Body)
      })
  }

  putFile(bucket, config_key, data) {
    const params = {
      Bucket: bucket,
      Key: config_key,
      ContentType: 'application/json',
      Body: JSON.stringify(data),
    }

    console.log(`Storing data: ${JSON.stringify(params)}`)

    return this.S3.putObject(params)
      .promise()
      .then((data) => data)
  }

  getSSMParameter(name, decryption) {
    const ssmParams = {
      Name: name,
      WithDecryption: decryption,
    }

    return this.ssm
      .getParameter(ssmParams)
      .promise()
      .then((data) => data.Parameter.Value)
  }
}

module.exports = Amazon
