# gulp-babel-external-helpers

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

For documentation on the `outputType` parameter, see the [Babel docs](https://babeljs.io/docs/advanced/external-helpers/#output-formats).

## License

[MIT](./LICENSE)
