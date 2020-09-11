const { idTag } = require('./utils')
const { Templates, MultiLanguageLG } = require('botbuilder-lg')
const templatesPerLocale = new Map()
templatesPerLocale.set(
  '',
  Templates.parseFile(`${__dirname}/../resources/sentences.lg`)
)
const multiLangLG = new MultiLanguageLG(templatesPerLocale)

const joinUsers = (ids) => {
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

/* Returns a generated random message */
function getMsgWithEmojis(ids) {
  if (typeof ids === 'undefined' || !ids.length) {
    return ''
  }

  const taggedIds = joinUsers(ids)
  const output = multiLangLG.generate('greetingTemplate', { name: taggedIds })
  return output
}

module.exports = { getMsgWithEmojis, joinUsers }
