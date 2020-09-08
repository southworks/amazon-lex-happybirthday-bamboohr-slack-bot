const { BlobServiceClient } = require('@azure/storage-blob')

class Azure {

  constructor(connString, containerName, blobName) {
    this.connectionString = connString
    this.containerName = containerName
    this.blobName = blobName
  }

  /*
  * It reads employees data from Azure Blob Store
  */
  async readStore() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        this.connectionString
    )
    const containerClient = blobServiceClient.getContainerClient(this.containerName)
    const blockBlobClient = containerClient.getBlockBlobClient(this.blobName)

    const downloadBlockBlobResponse = await blockBlobClient.download(0)

    const blobData = await this.streamToString(
        downloadBlockBlobResponse.readableStreamBody
    ).then((data) => JSON.parse(data))

    return blobData
  }

  /*
  * It compose binary data to String
  */
  async streamToString(readableStream) {
    const chunks = []

    return new Promise((resolve, reject) => {
        readableStream.on('data', (data) => chunks.push(data.toString()))
        readableStream.on('end', () => resolve(chunks.join('')))
        readableStream.on('error', reject)
    })
  }
}

module.exports = Azure
