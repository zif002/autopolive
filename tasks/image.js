'use strict';
const	$ = require('gulp-load-plugins')(),
		//imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		imageminJpegtran  = require('imagemin-jpegtran'),
		gulp = require('gulp');

/**
 * 	img imagemin
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(options) {
	return function(){
		return gulp.src(options.src)
				.pipe($.plumber({
					errorHandler:$.notify.onError(function(err){
					return {
						title: 'imagemin',
						message: err.message
					};
					})
				}))
				.pipe($.changed(options.dst))
				.pipe($.imagemin({
					progressive: true
				}))
				.pipe(gulp.dest(options.dst));
	};
};
