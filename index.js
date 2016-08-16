'use strict'

var babel = require('babel-core')
var joinPath = require('path').join
var relative = require('path').relative
var dirname = require('path').dirname
var through = require('through2')
var Buffer = require('buffer').Buffer

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

      // if the output type is umd, then we inject the `require` statement;
      if (outputType === 'umd' && file.babel.usedHelpers.length) {
        var prefix = relative(dirname(file.path), file.base) || '.'
        var externalHelpersPath = prefix + '/' + fileName
        var statement = 'var babelHelpers = requrie("' + externalHelpersPath + '");\n'
        file.contents = Buffer.concat([Buffer(statement), file.contents]);
      }

    }
    this.push(file)
    cb()
  }

  function onEnd (cb) {
    if (lastFile) {
      var out = lastFile.clone({ contents: false })
      out.path = joinPath(lastFile.base, fileName)
      out.contents = Buffer(babel.buildExternalHelpers(helpers, outputType))
      this.push(out)
    }
    cb()
  }

  return through.obj(onData, onEnd)
}
