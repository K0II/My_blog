var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifycss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
//var browserSync = require('browser-sync');
var clean = require('gulp-clean');

gulp.task('js', function(){
    gulp.src('./public/scripts/**/*.js')
        .pipe(concat('app.js'))              //  合并在一个文件里
        .pipe(gulp.dest('./build/js'))
        .pipe(uglify())                      //  不管多少级都被压缩了，并且是单个文件分别压缩的(如果没有上一个合并)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/js'));      //  最终发布时更换一下路径
});

gulp.task('css', function(){
    gulp.src('./public/styles/**/*.scss')
        .pipe(sass('app.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('clean', function(){
    return gulp.src(['./build/css','./build/js'],{read: false})
               .pipe(clean())
});

gulp.task('default',['clean'],function(){
    gulp.start(['js','css']);
});

// 不想用livereload，但是解决不了browser-sync和server.js的冲突
