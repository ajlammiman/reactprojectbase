"use strict"

var gulp = require('gulp');
var connect = require('gulp-connect'); //local dev server
var open = require('gulp-open'); //opens a url in web browser
var browserify = require('browserify'); //js bundle
var reactify = require('reactify'); //transforms react to js
var source = require('vinyl-source-stream'); //use convential text streams with Gulp
var concat = require('gulp-concat'); //concatenates files 

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
} 

//start local server
gulp.task('connect', function() {
        connect.server({
            root: ['dist'],
            port: config.port,
            base: config.devBaseUrl,    
            livereload: true 
        });

})

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default',['html', 'js', 'css', 'open', 'watch']);