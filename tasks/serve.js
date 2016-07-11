'use strict';

const browserSync = require('browser-sync').create(),
	gulp = require('gulp');

module.exports = function(options) {

  return function() {

    browserSync.init({
      server: options.src
    });

    browserSync.watch(`${options.src}/**/*.*`).on('change', browserSync.reload);
  };

};