/*jshint esversion: 6 */

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const del = require('del');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

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

gulp.task('serve', () => {
    browserSync.init({
        proxy: 'localhost:8000',
        snippetOptions: {
            ignorePaths: 'components/**/*.html'
        }
    });

    browserSync.watch(['client/**/*.js','dist']).on('change', browserSync.reload);
});

gulp.task('build', gulp.series('stylus'));
gulp.task('load', gulp.parallel('watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'load'));
