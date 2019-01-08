var del = require('del');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var babel = require("gulp-babel");
var requirejsOptimize = require('gulp-requirejs-optimize');
 
gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
});

gulp.task('js:babel', function(){
    return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest('stage'));
});

gulp.task('js:optimizer', function(){
    return gulp.src("stage/index.js")
    .pipe(requirejsOptimize({ 
        name: '../node_modules/almond/almond',
        include: 'index.js'
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task('clean:pre', function(){
    return del(['css/**/*', 'stage/**/*', 'dist/**/*']);
});

gulp.task('clean:post', function(){
    return del(['stage/**/*', 'stage']);
});

gulp.task('js', gulp.series('js:babel', 'js:optimizer'));

gulp.task('build', gulp.series('clean:pre', gulp.parallel('js', 'css'), 'clean:post'));