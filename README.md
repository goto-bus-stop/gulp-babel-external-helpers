# gulp-babel-external-helpers

> For Babel 5, use `gulp-babel-external-helpers@1.x`! Versions >=2 are only
> compatible with Babel 6.

Gulp plugin to output external helpers for Babel to a separate file.

[![NPM](https://nodei.co/npm/gulp-babel-external-helpers.png?compact=true)](https://nodei.co/npm/gulp-babel-external-helpers)

## Usage

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

## License

[MIT](./LICENSE)
