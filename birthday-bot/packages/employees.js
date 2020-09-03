const { getCurrentDate } = require('./utils')
const { BlobServiceClient } = require('@azure/storage-blob')

const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME
const blobName = process.env.AZURE_BLOB_NAME

/*
 * It reads employees data from Azure Blob Store
 */
const readStore = async () => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
  )
  const containerClient = blobServiceClient.getContainerClient(containerName)
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  const downloadBlockBlobResponse = await blockBlobClient.download(0)

  const blobData = await streamToString(
    downloadBlockBlobResponse.readableStreamBody
  )
    .then((data) => JSON.parse(data))

  return blobData
}

/*
 * It compose binary data to String
 */
const streamToString = async (readableStream) => {
  const chunks = []

  return new Promise((resolve, reject) => {
    readableStream.on('data', (data) => chunks.push(data.toString()))
    readableStream.on('end', () => resolve(chunks.join('')))
    readableStream.on('error', reject)
  })
}

const getBirthdaysEmails = async () => {
  const today = getCurrentDate()
  const users = await readStore()
  const emails = []
  users.forEach((user) => {
    if (user.Birthday.substring(5) === today) emails.push(user.Email)
  })

  return emails
}

module.exports = getBirthdaysEmails
