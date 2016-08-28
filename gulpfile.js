/*jshint esversion: 6 */

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const del = require('del');
const rename = require("gulp-rename");

const path = {
    styles: './client/**/*.styl'
};

gulp.task('clean', () => del(['dist']));

gulp.task('stylus', ['clean'], () => {
    gulp.src(path.styles)
        .pipe(rename(path => {
            path.dirname = '';
        }))
        .pipe(stylus())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', ['stylus'], () => {
  gulp.watch(path.styles, ['stylus']);
  // Other watchers
});

gulp.task('default', ['watch']);
