'use strict';

const	$ = require('gulp-load-plugins')(),
		gulp = require('gulp'),
		resolver = require('stylus').resolver,
		autoprefixer = require('autoprefixer-stylus'),
		combine = require('stream-combiner2').obj;


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let flag = false;

module.exports = function(options) {
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
		.pipe($.if(isDevelopment, $.sourcemaps.init()))
		.pipe($.stylus({
			use: [autoprefixer()]
		}))
		.pipe( $.if(isDevelopment, $.sourcemaps.write()))
		.pipe($.if(!isDevelopment, combine($.cssnano(), $.rev())))
		.pipe(gulp.dest($.if(isDevelopment, options.dst, options.dstPublic)))
		.pipe($.if(!isDevelopment, combine($.rev.manifest('css.json'), gulp.dest('manifest'))));

		}
};
