const { BlobServiceClient } = require('@azure/storage-blob')

class Azure {
  constructor() {
    this.connectionString = process.env.AZURE_BLOB_CONNECTION_STRING
    this.containerName = process.env.AZURE_BLOB_CONTAINER_NAME
    this.blobName = process.env.AZURE_BLOB_NAME
  }

  /* It reads employees data from Azure Blob Store */
  async readStore() {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.connectionString
    )
    const containerClient = blobServiceClient.getContainerClient(
      this.containerName
    )
    const blockBlobClient = containerClient.getBlockBlobClient(this.blobName)

    try {
      const downloadBlockBlobResponse = await blockBlobClient.download(0)

      const blobData = await this.streamToString(
        downloadBlockBlobResponse.readableStreamBody
      )
      return JSON.parse(blobData)
    } catch (error) {
      throw new Error(`AZURE: error getting blobData, ${error}`)
    }
  }

  /* It compose binary data to String */
  streamToString(readableStream) {
    const chunks = []

    return new Promise((resolve, reject) => {
      readableStream.on('data', (data) => chunks.push(data.toString()))
      readableStream.on('end', () => resolve(chunks.join('')))
      readableStream.on('error', reject)
    })
  }
}

module.exports = Azure
