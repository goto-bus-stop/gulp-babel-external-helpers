'use strict'

var babel = require('gulp-babel')
var babelHelpers = require('./')
var File = require('vinyl')
var joinPath = require('path').join
var assert = require('assert')

// largely stolen from https://github.com/babel/gulp-babel/blob/260a6c3/test.js
it('should output used helpers to a separate file', function (cb) {
  var stream = babel()
  var out = stream.pipe(babelHelpers())

  var seen = 0

  out.on('data', function (file) {
    seen++
    if (file.basename === 'fixture.js') {
      assert.deepEqual(file.babel.usedHelpers, [ 'class-call-check' ])
    }
    else {
      var contents = file.contents.toString('utf8')
      assert.ok(contents.indexOf('babelHelpers.classCallCheck') !== -1
               , 'does not include used helpers')
      assert.ok(contents.indexOf('babelHelpers.slicedToArray') === -1
               , 'includes unused helpers')
    }
  })

  out.on('end', function () {
    assert.equal(seen, 2)
    cb()
  })

  stream.write(new File({
    cwd: __dirname,
    base: joinPath(__dirname, 'fixture'),
    path: joinPath(__dirname, 'fixture/fixture.js'),
    contents: new Buffer('class MyClass {};')
  }))

  stream.end()
})
