'use strict';
const	spritesmith = require('gulp.spritesmith'),
		gulp = require('gulp');

/**
 * 	img sprite
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(options) {
	return function() {
		// let spriteData;
		// spriteData.img.pipe(gulp.dest(options.dstImg)); // путь, куда сохраняем картинку
		// spriteData.css.pipe(gulp.dest(options.dstCss)); // путь, куда сохраняем стили
		let spriteData =  gulp.src(options.src, {scine: gulp.lastRun(options.taskName)})
		        .pipe(spritesmith({
		            imgName: 'sprite.png',
		            cssName: 'sprite.styl',
		            cssFormat: 'stylus',
		           	algorithm: 'binary-tree',
		           	padding: 2,
		           	imgPath: '../img/sprite.png'
		        }));
		spriteData.img.pipe(gulp.dest(options.dstImg))
		return  spriteData.css.pipe(gulp.dest(options.dstCss));
		
		
	}
};