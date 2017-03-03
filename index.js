'use strict'

var babel = require('babel-core')
var joinPath = require('path').join
var through = require('through2')
var Buffer = require('safe-buffer').Buffer

module.exports = babelHelpers

function babelHelpers (fileName, outputType) {
  fileName = fileName || 'babelHelpers.js'
  outputType = outputType || 'global'
  var helpers = []
  var lastFile

  function onData (file, enc, cb) {
    if (file.babel && Array.isArray(file.babel.usedHelpers)) {
      file.babel.usedHelpers.forEach(function (name) {
        if (helpers.indexOf(name) === -1) {
          helpers.push(name)
        }
      })
      lastFile = file
    }
    this.push(file)
    cb()
  }

  function onEnd (cb) {
    if (lastFile) {
      var out = lastFile.clone({ contents: false })
      out.path = joinPath(lastFile.base, fileName)
      out.contents = Buffer.from(babel.buildExternalHelpers(helpers, outputType), 'utf8')
      this.push(out)
    }
    cb()
  }

  return through.obj(onData, onEnd)
}
