var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    inject = require('gulp-inject'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    env;

var isProduction = function isProduction() {
    return env === 'pro';
};

gulp.task('browserify', function () {
    return gulp.src('src/js/main.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: false
        }))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, rename('main.min.js')))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function () {
    gulp.src('node_modules/phaser/build/phaser.js')
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, rename('phaser.min.js')))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(connect.reload());
});

// gulp.task('inject', function () {
//     gulp.src('src/*.html')
//         .pipe(inject(gulp.src('dist/scripts/*.js', {read: false}), {
//             relative: false,
//             addRootSlash: false,
//             transform: function (filePath) {
//                 var newFilePath = filePath.replace('dist/', '');
//                 return '<script src="' + newFilePath + '"></script>';
//             }
//         }))
//         .pipe(gulp.dest('dist'));
// });

gulp.task('assets', function () {
    gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/assets'))
        .pipe(connect.reload());
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/lib/*.js', ['scripts']);
    gulp.watch('src/js/**', ['browserify']);
    gulp.watch('src/assets/**', ['assets']);
});

gulp.task('server', function () {
    connect.server({
        root: 'dist',
        port: 9876,
        livereload: true
    });
});

gulp.task('copy', ['html',  'scripts', 'assets'], function () {
});

// Common tasks
gulp.task('commonTasks', function () {
    // runSequence('clean', 'copy', 'browserify', 'inject');
    runSequence('clean', 'copy', 'browserify');
});

// Production task
gulp.task('dist', function () {
    env = 'pro';
    runSequence('commonTasks');
});

// Development task
gulp.task('default', function () {
    env = 'dev';
    runSequence('commonTasks', 'server', 'watch');
});
