/* Returns current date in DD/MM format. */
const getCurrentDate = () => {
  let date = new Date();

  // Left justify with 0
  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2);

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
