'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const BUCKET = 'birthday-bot-s3-operations-bucket'; 
const OBJECT_KEY = 'config.json';

const getS3Object = (bucket, key) => {
  const params ={
    Bucket: bucket,
    Key: key,
    ResponseContentType: 'txt/json'
  }
  console.log(`GetS3Object -> params: ${params}`);

  return S3.getObject(params)
    .promise()
    .then(file => {
      console.log(`GetS3Object -> File found: ${file}`);

      // Here I should parse from file object to json object
      return file;
    })
    .catch(error => {
      console.log(`GetS3Object -> File not found, then I will create it`);
      
      return putS3Object(bucket, key, '');
    });
}

const setChannel = (oldChannel, newChannel) => {
  console.log(`SetChannel -> { oldChannel: ${oldChannel}, newChannel: ${newChannel} }`;

  // Here I should return the new json channel config
  return oldChannel;
}

const putS3Object = (bucket, key, body) => {
  return S3.putObject({
    Body: body,
    Bucket: bucket,
    ContentType: 'text/json',
    Key: key
  }).promise();
}

const getSignedUrl = (bucket, key) => {
  const params = { Bucket: bucket, Key: key };

  return S3.getSignedUrl('getObject', params);
}

module.exports.setChannel = newChannel => 
  return getS3Object(BUCKET, OBJECT_KEY)
    .then(data => setChannel(data.body, newChannel)
    .then(buffer => putS3Object(BUCKET, OBJECT_KEY, buffer)
    .then(() => getSignedUrl(BUCKET, OBJECT_KEY));
};
