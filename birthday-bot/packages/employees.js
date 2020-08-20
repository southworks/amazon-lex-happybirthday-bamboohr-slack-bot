const { getCurrentDate } = require("./utils");
const { BlobServiceClient } = require("@azure/storage-blob");
const connectionString =
  "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;";
const containerName = "birthday-bot-blob-store";
const blobName = "employees.json";

/*
 * It reads employees data from Azure Blob Store
 */
const readStore = async () => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    connectionString
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const downloadBlockBlobResponse = await blockBlobClient.download(0);

  const blobData = await streamToString(
    downloadBlockBlobResponse.readableStreamBody
  )
    .then((data) => JSON.parse(data).employees)
    .then((employees) => employees.map(userParser));

  return blobData;
};

const streamToString = async (readableStream) => {
  return new Promise((resolve, reject) => {
    let chunks = [];

    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });

    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });

    readableStream.on("error", reject);
  });
};

const getBirthdaysEmails = async () => {
  const today = getCurrentDate();
  const users = await readStore();

  let emails = [];
  users.forEach((user) => {
    if (user.birthday == today) emails.push(user.email);
  });

  return emails;
};

/*
 * It parse users to give us digested data:
 *   { email: "employee@company.com", birthday: "DD/MM" }
 */
const BIRTH_MONTH_INDEX = 1;
const BIRTH_DAY_INDEX = 2;

const userParser = (employee) => {
  const date = employee.dateOfBirth.split("-");
  const birthday = `${date[BIRTH_DAY_INDEX]}/${date[BIRTH_MONTH_INDEX]}`;

  return { birthday: birthday, email: employee.workEmail };
};

module.exports = getBirthdaysEmails;
