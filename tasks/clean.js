'use strict';

const	del = require('del'),
		gulpif = require('gulp-if');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {

	return function() {
		return del(gulpif(isDevelopment, options.dst, options.dstPublic));
		}
};
