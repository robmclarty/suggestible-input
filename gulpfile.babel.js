'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import webpack from 'gulp-webpack';

gulp.task('js', function () {
  return gulp
    .src('src/suggestible-input.jsx')
    .pipe(concat('suggestible-input.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist/'));
});

gulp.task('examples', function () {
  return gulp
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
        'react': 'React'
      }
    }))
    .pipe(gulp.dest('examples/dist/basic/'));
});

gulp.task('css', function () {
  return gulp
    .src('src/suggestible-input.css')
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', function () {

});

gulp.task('lint', function () {

});

gulp.task('build', ['js', 'examples', 'css']);

gulp.task('default', ['build']);
