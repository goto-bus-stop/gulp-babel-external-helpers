# gulp-babel-external-helpers

> For Babel 5, use `gulp-babel-external-helpers@1.x`! Versions >=2 are only
> compatible with Babel 6.

Gulp plugin to output external helpers for Babel to a separate file.

[![NPM](https://nodei.co/npm/gulp-babel-external-helpers.png?compact=true)](https://nodei.co/npm/gulp-babel-external-helpers)

## Usage

> **Note**: Usage with watch plugins like `gulp-changed` and `gulp-newer` is
> [not supported, but there are workarounds](#usage-with-gulp-changed-gulp-newer).

```
var babel = require('gulp-babel')
var babelHelpers = require('gulp-babel-external-helpers')

gulp.task('build', function () {
  return gulp.src('src/')
    .pipe(babel({ externalHelpers: true }))
    .pipe(babelHelpers('babelHelpers.js'))
    .pipe(gulp.dest('lib/'))
})
```

## API

### babelHelpers(fileName='babelHelpers.js', outputType='global')

For documentation on the `outputType` parameter, see the [Babel 5 docs](https://developit.github.io/babel-legacy-docs/docs/advanced/external-helpers/#output-formats).
(This behaviour is the same in both Babel 5 and 6.)

## Usage with gulp-changed, gulp-newer

Usage with plugins like `gulp-changed` and `gulp-newer` is not supported.
Both `gulp-babel` and `gulp-babel-external-helpers` need to process _all_ files
in your task to be able to include all the necessary helpers. With a plugin like
`gulp-newer`, only the changed files will be processed, and only helpers used in
the changed files will be included in the generated file.

If your tasks are small, you could create a separate watch build task, and a
'normal' build task that always processes every file:

```js
var gulp = require('gulp')
var newer = require('gulp-newer')
var babel = require('gulp-babel')
var babelHelpers = require('gulp-babel-external-helpers')

var src = 'src/**/*.js'
var dest = 'lib/'

// Use external helpers when running "gulp build"
gulp.task('build', function () {
  return gulp.src(src)
    .pipe(babel({ externalHelpers: true }))
    .pipe(babelHelpers('babelHelpers.js'))
    .pipe(dest)
})

// Use the inline helpers when watching
gulp.task('watch:build', function () {
  return gulp.src(src)
    .pipe(newer(dest))
    .pipe(babel({ externalHelpers: false }))
    .pipe(dest)
})

gulp.task('watch', function () {
  gulp.watch([src], ['watch:build'])
})
```

If your build tasks are more complex and you're using `gulp-newer` for your
watch task only, you can use [`gulp-if`](https://npmjs.com/package/gulp-if) to
conditionally use `gulp-babel-external-helpers`:

```js
var gulp = require('gulp')
var gulpif = require('gulp-if')
var newer = require('gulp-newer')
var babel = require('gulp-babel')
var babelHelpers = require('gulp-babel-external-helpers')

var watching = false

var src = 'src/**/*.js'
var dest = 'lib/'

gulp.task('build', function () {
  return gulp.src(src)
    .pipe(gulpif(watching, newer(dest)))
    .pipe(somePlugin())
    .pipe(someOtherPlugin())
    // Use the inline helpers when watching, but external helpers when doing a
    // full build.
    .pipe(babel({ externalHelpers: !watching }))
    .pipe(gulpif(!watching, babelHelpers('babelHelpers.js')))
    .pipe(gulp.dest(dest))
})

gulp.task('watch', function () {
  watching = true
  gulp.watch([src], ['build'])
})
```

## License

[MIT](./LICENSE)
