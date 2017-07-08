var gulp         = require('gulp'); // gulp
var sass         = require('gulp-sass'); // sass
var sasslint     = require('gulp-sass-lint'); // sass lint
var sourcemaps   = require('gulp-sourcemaps'); //sourcemaps
var autoprefixer = require('gulp-autoprefixer'); // autoprefixer
var browserSync  = require('browser-sync').create(); // browser reload

gulp.task('lint', function() {

    gulp.src('assets/sass/**/*.scss')
        .pipe(sasslint({rules: {'class-name-format': 0, 'property-sort-order': 0, 'placeholder-in-extend': 0}}))
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError())

});

gulp.task('compile', function() {

    gulp.src('assets/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream())
});


// Default - lets do something if we dont specify a task
gulp.task('default',['lint', 'compile']);

// Watch & Lint
gulp.task('dev',function() {
    gulp.watch('assets/sass/**/*.scss',['lint', 'compile']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['compile'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('assets/sass/**/*.scss',['compile']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Optimise, Compile & Shift
gulp.task('build',['compile']);


