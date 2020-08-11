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
  return `${firstPart} ${users} ${secondPart}`
}

function getRandomEmojis() {
  let randomEmojis = messages.emojis
  randomEmojis[0] = messages.emojis.splice(getRandomInt(randomEmojis.length, 1))[0]
  randomEmojis[1] = getRandom(randomEmojis)
  return randomEmojis
}


function getMsgWithEmojis() {
    let emojis = getRandomEmojis()
    let greet = getRandomGreet()
    return `${emojis[0]} ${emojis[1]} ${greet} ${emojis[1]} ${emojis[0]}`
}

console.log(getRandomEmojis()+getRandomGreet()+getRandomEmojis())