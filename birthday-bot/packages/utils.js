const utcOffset = process.env.utcOffset

/* Returns current date in DD/MM format. */
const getCurrentDate = () => {
  // Get UTC time in milliseconds
  const utcTime = new Date().getTime()

  // Creates a new date using the UTC time, plus the utcOffset (multiplied by 3600000 in order to get milliseconds)
  const date = new Date(utcTime + utcOffset * 3600000);

  // Left justify with 0
  const day = ('0' + date.getUTCDate()).slice(-2);
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);

  return `${day}/${month}`;
}

/* Read and parse Json file from path. */
const readJSON = (path) => {
  const fs = require('fs');
  const data = fs.readFileSync(path);
  const json = JSON.parse(data);

  return json;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandom(array) {
  return array[getRandomInt(array.length)];
}

module.exports = { getCurrentDate, readJSON, getRandomInt, getRandom }
