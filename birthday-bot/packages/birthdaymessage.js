const { Templates, MultiLanguageLG } = require('botbuilder-lg')
const templatesPerLocale = new Map()
templatesPerLocale.set('', Templates.parseFile(`${__dirname}/sentences.lg`))
const multiLangLG = new MultiLanguageLG(templatesPerLocale)

/* Returns a string with tagged users. */
const joinIds = (ids) => {
  const taggedUsers = ids.map(idTag)
  let joined = ''

  if (taggedUsers.length > 1) {
    const lastOne = taggedUsers.pop()
    joined = taggedUsers.join(', ')
    joined += ` and ${lastOne}`
  } else {
    joined = taggedUsers.join('')
  }

  return joined
}

/* Tags ID with mention */
const idTag = (id) => `<@${id}>`

/* Returns a generated random message */
function getMsgWithEmojis(ids) {
  if (!ids.length) {
    return ''
  }

  const taggedIds = joinIds(ids)
  const output = multiLangLG.generate('greetingTemplate', { name: taggedIds })
  return output
}

module.exports = getMsgWithEmojis
