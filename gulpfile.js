'use strict';

const gulp     = require('gulp'),
      path     = require('path'),
      ftp      = require('vinyl-ftp'),
      util     = require('gulp-util'),
      $        = require('gulp-load-plugins')();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


/**
 * 	
 * @param  {[type]} taskName [description]
 * @param  {[type]} path     [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [task]
 */
function lazyRequireTask(taskName, path, options){
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback){
		let task = require(path).call(this, options);
		return task(callback);
	})

}
// Deploy via FTP
var ftpconf = {
  user: 'yakov',
  password: '9B7c8G9v',
  host: '37.143.14.38',
  port: 21,
  dist: ['./public/**'],
  remote: '/kvanta'
};

gulp.task('deploy', function() {
  var conn = ftp.create({
    host: ftpconf.host,
    port: ftpconf.port,
    user: ftpconf.user,
    password: ftpconf.password,
    parallel: 5,
    log: util.log
  });
  return gulp.src(ftpconf.dist, {base:'./public/' , buffer: false})
  	.pipe($.debug())
    .pipe(conn.newer(ftpconf.remote)) // only upload newer files
    .pipe($.debug())
    .pipe(conn.dest(ftpconf.remote));
});


var nameDir = path.resolve('../').split(path.sep)[path.resolve('../').split(path.sep).length-1];
/**
 * 	tasks css
 * @type {String} stylus css
 */
// lazyRequireTask('deploy', './tasks/ftp', ftpconf);

/**
 * 	tasks css
 * @type {String} stylus css
 */
lazyRequireTask('stylus', './tasks/stylus', {
	src: 'frontend/stylus/index.styl',
	dst: 'tmp/css'
});
/**
 * 	tasks clean
 * @type {clear dir}
 */
lazyRequireTask('clean', './tasks/clean', {
	dst:  'tmp'
});


/**
 * 	 up server browser-sync
 * @type {String}
 */
lazyRequireTask('serve', './tasks/serve', {
  src: $.if(isDevelopment, 'tmp', 'public')
});

/**
 * 	jade
 * @type {String}
 */
lazyRequireTask('jade', './tasks/jade', {
  src: 'frontend/template/*.jade',
  dst: 'tmp',
  dstManifest: 'manifest/css.json'
});
/**
 * task image in sprite
 * [img description]
 * @type {[type]}
 */
lazyRequireTask('img:sprite', './tasks/sprite', {
  src: 'frontend/img/sprite/*.png',
  dstImg:'tmp/img/',
  dstCss: 'frontend/stylus/styl/',
});
/**
 * task image min
 * [image min]
 * @type {[type]}
 */
lazyRequireTask('img:image', './tasks/image', {
  src: 'frontend/img/*.{jpg,png}',
  dst:'tmp/img/'
});
/**
 * [img svg]
 * @type {[type]}
 */
lazyRequireTask('img:svg', './tasks/svg', {
  src: 'frontend/img/svg/*.svg',
  dstSprite: 'tmp/img/',
  dstStyl: 'frontend/stylus/styl'
});
/**
 * 	TASKS ZIP
 * @type {[type]}
 */
lazyRequireTask('zip', './tasks/zip', {
  src: 'public/**/*.*',
  dst: '.'
});
/**
 * 	build public
 * @type {String}
 */


 /*	build public
 * @type {String}
 */
lazyRequireTask('svg:copy', './tasks/svgCopy', {
  src: 'frontend/img/*.svg',
  dst: 'tmp/img',
});
/**
 * [fonts copy]
 * @type {[type]}
 */
lazyRequireTask('fonts', './tasks/fonts', {
  src: 'frontend/fonts/**/*.*',
  dst:'tmp/fonts'
});
/**
 * [src webpack plug]
 * @type {String}
 */
lazyRequireTask('webpack', './tasks/webpack', {
  src: 'frontend/js/*.js',
  dst:'tmp/js',
  loaders: '../frontend'
});


gulp.task('watch', function(){
	gulp.watch('frontend/stylus/**/*.styl', gulp.series('stylus'));
	gulp.watch('frontend/template/**/*.jade', gulp.series('jade'));
	gulp.watch('frontend/img/sprite/*.png', gulp.series('img:sprite'));
  gulp.watch('frontend/img/svg/*.svg', gulp.series('img:svg'));
	gulp.watch('frontend/img/*.svg', gulp.series('svg:copy'));
	gulp.watch('frontend/img/*.{jpg,png}', gulp.series('img:image'));
	gulp.watch('frontend/fonts/**/*.*', gulp.series('fonts'));
});
gulp.task('init', gulp.series('clean', 'img:image', 'jade', 'stylus', 'webpack', 'fonts'));
gulp.task('dev',gulp.series('clean', 'fonts', 'svg:copy', 'img:image', 'img:sprite', 'img:svg', 'stylus', 'jade', gulp.parallel( 'webpack','watch', 'serve')));
gulp.task('build' , gulp.series('clean', 'img:sprite', 'img:image', 'img:svg', 'stylus','jade', 'webpack'));

