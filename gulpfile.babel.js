'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

gulp.task('js', function () {
  return gulp
    .src('src/SuggestibleInput.jsx')
    .pipe(concat('SuggestibleInput.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp
    .src('src/suggestible-input.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {

});

gulp.task('lint', function () {

});

gulp.task('build', ['js', 'css']);

gulp.task('default', ['build']);
