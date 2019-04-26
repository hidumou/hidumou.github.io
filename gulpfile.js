var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// 一次性编译 Sass 
gulp.task('sass', function() {
    return gulp.src('./themes/apollo/source/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./themes/apollo/source/css'));
});

// 实时编译
gulp.task('default', ['sass'], function() {
    gulp.watch('./themes/apollo/source/scss/_partial/*.scss', ['sass']);
    gulp.watch('./themes/apollo/source/scss/*.scss', ['sass']);
});