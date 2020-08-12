const messages = require("../mock/messages.json"); 

users=["user 1" , "user 2"]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandom (array) {
  return array[getRandomInt(array.length)];
}

function getRandomGreet(users) {
  let firstPart = getRandom(messages.firstPart)
  let secondPart = getRandom(messages.secondPart)
  return `${firstPart} ${users}. ${secondPart}`
}

function getRandomEmojis() {
  let randomEmojis = messages.emojis
  //randomEmojis[0] = messages.emojis.splice(getRandomInt(randomEmojis.length, 1))[0]
  for (var i = 0; i < 4; i++) {
    randomEmojis[i] = messages.emojis.splice(getRandomInt(randomEmojis.length), 1)[0]
 }

  return randomEmojis
}


function getMsgWithEmojis(users) {
    let emojis = getRandomEmojis()
    let greet = getRandomGreet(users)
    return `${emojis[0]} ${emojis[1]} ${greet} ${emojis[2]} ${emojis[3]}`
}

module.exports = { getMsgWithEmojis }