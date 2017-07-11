const _ = require('lodash')

const alterForArrayKey = key => /\[/.test(key) ? key.replace(/[[\]]/g, '') : key

const traverse = (doc, key) => undefined || doc[alterForArrayKey(key)]

const resolveKey = (doc, key) => {
  if (typeof key !== 'string') return undefined
  const keyParts = key.split('.')
  return keyParts.reduce(traverse, doc)
}

const applyChange = (doc, change) => {
  const objectToUpdate = resolveKey(doc, change.key)
  if (objectToUpdate) {
    objectToUpdate.description = change.description
  }
  return doc
}

const patch = (swagger, patches) => {
  return patches.reduce(applyChange, _.cloneDeep(swagger))
}

exports.patch = patch
