'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import webpack from 'gulp-webpack';

gulp.task('js', function () {
  return gulp
    .src('src/SuggestibleInput.jsx')
    .pipe(concat('suggestible-input.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist/'));
});

gulp.task('standalone', function () {
  return gulp
    .src('src/SuggestibleInput.jsx')
    .pipe(webpack({
      output: {
        filename: 'suggestible-input-standalone.js'
      },
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'babel-loader' }
        ]
      },
      externals: {
        'react': 'React'
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('examples', function () {
  return gulp
    .src('examples/basic.js')
    .pipe(webpack({
      output: {
        filename: 'basic-compiled.js'
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      },
      externals: {
        'react': 'React'
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    }))
    .pipe(gulp.dest('examples/'));
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

gulp.task('build', ['js', 'standalone', 'css']);

gulp.task('default', ['build']);
