'use strict';
const	$ = require('gulp-load-plugins')(),
		gulp = require('gulp');

/**
 * 	img imagemin
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(options) {
	return function(){
		return gulp.src(options.src)
				.pipe($.zip('production.zip'))
				.pipe(gulp.dest(options.dst));
	};
};
