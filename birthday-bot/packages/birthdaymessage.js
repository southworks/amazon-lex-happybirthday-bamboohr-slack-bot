const utils = require('./utils')
const messages = require('../mock/messages.json')
const { Templates, MultiLanguageLG } = require('botbuilder-lg');
const templatesPerLocale = new Map();
templatesPerLocale.set('', Templates.parseFile(`../${__dirname}/sentences.lg`));
const multiLangLG = new MultiLanguageLG(templatesPerLocale);


/* Returns a string with tagged users. */
const joinIds = (ids) => {
  const taggedUsers = ids.map(idTag);
  let joined = '';

  if (taggedUsers.length > 1) {
    const lastOne = taggedUsers.pop();
    joined = taggedUsers.join(', ');
    joined += ` and ${lastOne}`;
  } else {
    joined = taggedUsers.join('');
  }

  return joined;
}

/* Tags ID with mention */
const idTag = (id) => `<@${id}>`;

// users=["user 1" , "user 2"]

function getRandomGreet(ids) {
  let firstPart = utils.getRandom(messages.firstPart)
  let secondPart = utils.getRandom(messages.secondPart)
  return `${firstPart} ${ids}. ${secondPart}`
}

function getRandomEmojis() {
  let randomEmojis = []

  for (var i = 0; i < 4; i++) {
    randomEmojis[i] = messages.emojis.splice(utils.getRandomInt(messages.emojis.length), 1)[0]
 }
 
  return randomEmojis
}


function getMsgWithEmojis(ids) {
    let taggedIds = joinIds(ids)
    //let greet = getRandomGreet(taggedIds)
    //let emojis = getRandomEmojis()
    let output = multiLangLG.generate('greetingTemplate',{ name: taggedIds })
    //return `${emojis[0]} ${emojis[1]} ${greet} ${emojis[2]} ${emojis[3]}`
    return output 
}

module.exports = getMsgWithEmojis