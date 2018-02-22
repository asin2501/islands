'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    //bourbon = require('node-bourbon'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglifyjs'),
    browserSync = require('browser-sync').create();


// Scss stylesheets
gulp.task('stylesheets', function() {
    return gulp.src('stylesheets/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            //includePaths: bourbon.includePaths
        })).on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    watch(['stylesheets/**/*.scss'], function(event, cb) {
        gulp.start('stylesheets');
    });
    // watch(['./js/main.js'], function(event, cb) {
    //     gulp.start('uglify');
    // });

    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./",
        open: true,
        port: 8081
    });

});

gulp.task('uglify', function() {
    gulp.src('./js/main.js')
        //.pipe(uglify())
        .pipe(gulp.dest('./js/min'))
});

// Run
gulp.task('default', [
    'stylesheets',
    'serve',
    'watch'
]);

gulp.task('wp', [
    'stylesheets',
    'watch'
]);