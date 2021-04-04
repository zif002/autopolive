"use strict";

const $ = require("gulp-load-plugins")(),
  gulp = require("gulp");

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV == "development";

/**
 * [exports build]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function (options) {
  return function () {
    return gulp
      .src(options.src, { scine: gulp.lastRun(options.taskName) })
      .pipe($.changed(options.dst))
      .pipe($.debug())
      .pipe(
        $.revReplace({
          manifest: gulp.src(options.dstManifest),
        })
      )
      .pipe($.debug())
      .pipe(gulp.dest(options.dst));
  };
};
