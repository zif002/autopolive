'use strict';
const	$ = require('gulp-load-plugins')(),

		gulp = require('gulp');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src, {scine: gulp.lastRun(options.taskName)})
		.pipe($.plumber({
			errorHandler:$.notify.onError(function(err){
			return {
				title: 'Jade',
				message: err.message
			};
			})
		}))
		.pipe($.changed(options.dst, {extension: '.html'}))
		.pipe($.jade({
			client: false,
			pretty: true

		}))
		.pipe(gulp.dest(options.dst))
		}
};