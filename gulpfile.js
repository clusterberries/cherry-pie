/*jshint esversion: 6 */

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const del = require('del');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');

const path = {
    styles: './client/**/*.styl'
};

gulp.task('clean', () => del(['dist']));

gulp.task('stylus', () => {
    return gulp.src(path.styles)
        .pipe(sourcemaps.init())
        .pipe(rename(path => {
            path.dirname = '';
        }))
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', () => {
    gulp.watch(path.styles, gulp.series('stylus'));
    // Other watchers
});

gulp.task('build:dev', gulp.series('clean', 'stylus'));

gulp.task('default', gulp.series('clean', 'stylus', 'watch'));
