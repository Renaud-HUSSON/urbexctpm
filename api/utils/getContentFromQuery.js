const getContentFromQuery = content => {
  return eval(`(${content})`)
}

module.exports = getContentFromQuery