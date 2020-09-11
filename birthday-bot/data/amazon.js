const AWS = require('aws-sdk')

class Amazon {
  constructor() {
    this.s3 = new AWS.S3()
    this.ssm = new AWS.SSM()
  }

  getFile(bucket, configKey) {
    const params = {
      Bucket: bucket,
      Key: configKey,
      ResponseContentType: 'application/json',
    }

    return this.s3
      .getObject(params)
      .promise()
      .then((data) => JSON.parse(data.Body))
      .catch((error) => {
        throw new Error(`AWS: error getting JSON file from S3, ${error}`)
      })
  }

  putFile(bucket, configKey, data) {
    const params = {
      Bucket: bucket,
      Key: configKey,
      ContentType: 'application/json',
      Body: JSON.stringify(data),
    }

    return this.s3
      .putObject(params)
      .promise()
      .then((data) => data)
      .catch((error) => {
        throw new Error(`AWS: error setting JSON file from S3, ${error}`)
      })
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
      .catch((error) => {
        throw new Error(`AWS: error getting parameter from SSM, ${error}`)
      })
  }
}

module.exports = Amazon
