/**
 * Created by DrTone on 04/05/2017.
 */

var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');
var pump = require('pump');

gulp.task('build', ['minify'], function() {

});

gulp.task('minify', function(cb) {
    pump([
        gulp.src('drumViz.html'),
            useref(),
            gulpIf('*.js', uglify()),
            gulpIf('*.css', cssnano()),
            gulp.dest('build')
    ],
    cb);
});
