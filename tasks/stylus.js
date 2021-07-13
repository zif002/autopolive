'use strict';

var	$ = require('gulp-load-plugins')(),
		gulp = require('gulp'),
    gulpIf = require('gulp-if'),
		autoprefixer = require('autoprefixer-stylus'),
		combine = require('stream-combiner2').obj,
    minifycss    = require('gulp-minify-css');


var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  console.log(isDevelopment)
	return function() {
		return gulp.src(options.src, {scine: gulp.lastRun(options.taskName)})
		.pipe($.plumber({
			errorHandler:$.notify.onError(function(err){
			return {
				title: 'Styles',
				message: err.message
			};
			})
		}))
		.pipe($.changed(options.dst))
		.pipe(gulpIf(isDevelopment, $.sourcemaps.init()))
		.pipe($.stylus({
			use: [autoprefixer()]
		}))

		.pipe(gulpIf(isDevelopment, $.sourcemaps.write()))
		.pipe(gulpIf(!isDevelopment, combine($.cssnano(), $.rev())))
    .pipe(gulpIf(!isDevelopment, minifycss()))
		.pipe(gulp.dest(options.dst))
		.pipe(gulpIf(!isDevelopment, combine($.rev.manifest('css.json'), gulp.dest('manifest'))));
		}
};
