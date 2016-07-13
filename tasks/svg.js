'use strict';
const	$ = require('gulp-load-plugins')(),
		//svgSprite = require('gulp-svg-sprite'),
		gulp = require('gulp');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
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
					title: 'Svg',
					message: err.message
				};
				})
			}))
			.pipe($.svgSprite({
		        mode: {
		          css: {
		            dest:       '.',
		            bust:       !isDevelopment,
		            sprite:     '../img/sprite.svg', // filename for sprite relative to dest
		            layout:     'vertical',
		            prefix:     '$', // .svg-
		            dimensions: true,
		            render:     {
		              styl: {
		                dest: 'sprite_svg.styl'  // filename for .styl relative to dest^
		              }
		            }
		          }
		        }
		      }))
		      .pipe($.if('*.styl', gulp.dest(options.dstStyl), gulp.dest(options.dstSprite)));
	};
};
