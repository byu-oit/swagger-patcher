const fs = require('fs')
const async = require('async')
const patch = require('../lib/patcher')

const patchFiles = (swaggerPath, patchPath) => {
  const swaggerAccessCheck = cb => fs.access(swaggerPath, fs.constants.R_OK | fs.constants.W_OK, err => cb(null, !err))
  const patchAccessCheck = cb => fs.access(patchPath, fs.constants.R_OK, err => cb(null, !err))
  const accessChecks = next => {
    async.parallel([swaggerAccessCheck, patchAccessCheck], (err, data) => {
      if (err) return next(err)
      const [accessSwagger, accessPatch] = data
      if (!accessSwagger) {
        console.error(`Can't access ${swaggerPath}!`)
        return next('Error:NoAccess:swaggerPath')
      } else if (!accessPatch) {
        console.error(`Can't access ${patchPath}!`)
        return next('Error:NoAccess:patchPath')
      }
      next(null)
    })
  }

  const readFile = (path, cb) => fs.readFile(path, 'utf8', cb)
  const readFiles = next => {
    async.map([swaggerPath, patchPath], readFile, (err, results) => {
      if (err) {
        console.error('Error reading a file!', err)
        return next(err)
      }
      try {
        return next(null, results.map(f => JSON.parse(f)))
      } catch (ex) {
        console.error('Error parsing a file!', err)
        return next(err)
      }
    })
  }

  const doPatch = (data, next) => {
    const [swaggerData, patchData] = data
    try {
      const patchedSwagger = patch(swaggerData, patchData)
      return next(null, patchedSwagger)
    } catch (err) {
      console.error('Error patching swagger!', err)
      return next(err)
    }
  }

  const writeResults = (data, next) => fs.writeFile(swaggerPath, JSON.stringify(data, null, 2), next)

  const finish = (err, data) => {
    if (err) {
      console.error('Error processing patch file!', err)
    } else {
      console.log('done')
    }
  }

  async.waterfall([accessChecks, readFiles, doPatch, writeResults], finish)
}

module.exports = patchFiles
