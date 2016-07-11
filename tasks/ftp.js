'use strict';

const $ = require('gulp-load-plugins')(),
	  gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

/**
 * [exports build]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(options) {
  return function() {
	  var conn = options;
	  return gulp.src(options.dist, {base:'./public/' , buffer: false})
		  .pipe($.debug())
		  .pipe(conn.$.newer(ftpconf.remote)) // only upload newer files
		  .pipe($.debug())
		  .pipe(conn.dest(ftpconf.remote));
  };

};