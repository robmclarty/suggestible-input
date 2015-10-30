'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import shell from 'gulp-shell';
import uglify from 'gulp-uglify';
import webpack from 'gulp-webpack';
import merge from 'merge-stream';

const componentPath = './src/suggestible-input.jsx';

gulp.task('component', function () {
  return gulp
    .src(componentPath)
    .pipe(concat('suggestible-input.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('example-basic', function () {
  var js = gulp
    .src('examples/src/basic/basic.jsx')
    .pipe(webpack({
      output: {
        filename: 'basic.js'
      },
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'babel-loader' }
        ]
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }))
    .pipe(gulp.dest('examples/dist/basic/'));

  var staticFiles = gulp
    .src([
      'examples/src/basic/basic.css',
      'examples/src/basic/close-round.svg',
      'examples/src/basic/index.html'
    ])
    .pipe(gulp.dest('examples/dist/basic/'));

  return merge(js, staticFiles);
});

gulp.task('example-objects', function () {
  var js = gulp
    .src('examples/src/objects/objects.jsx')
    .pipe(webpack({
      output: {
        filename: 'objects.js'
      },
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'babel-loader' }
        ]
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }))
    .pipe(gulp.dest('examples/dist/objects/'));

  var staticFiles = gulp
    .src([
      'examples/src/objects/objects.css',
      'examples/src/objects/close-round.svg',
      'examples/src/objects/index.html'
    ])
    .pipe(gulp.dest('examples/dist/objects/'));

  return merge(js, staticFiles);
});

// TODO: Make some tests. Prefer mocha/chai :)
gulp.task('test', function () {

});

gulp.task('lint', shell.task([
  `./node_modules/eslint/bin/eslint.js ${componentPath}; exit 0`
]));

gulp.task('build', ['component', 'example-basic', 'example-objects']);

gulp.task('default', ['build']);
