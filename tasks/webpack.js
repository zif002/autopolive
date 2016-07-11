'use strict';
const	$ = require('gulp-load-plugins')(),
		webpackstream = require('webpack-stream'),
		webpack = webpackstream.webpack, 
		named = require('vinyl-named'),
		path  = require('path'),
		gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
	return function() {
		//console.log(isDevelopment);
		let optionsWebpack = {
		  watch:   isDevelopment,
		  devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
		  resolve: {
		    modulesDirectories: ["node_modules", "bower_components"]
		  },
		  module:  {
		    loaders: [{
		      test:    /\.js$/,
		      include: path.join(__dirname, options.loaders),
		      loader:  'babel?presets[]=es2015',
		      exclude: [/bower_components/, /node_modules/, /comnponents/]
		    },
		   ]
		  },
		  plugins: [
		    new webpack.NoErrorsPlugin(),
		    new webpack.ProvidePlugin({
		      $:      "jquery",
		      jQuery: "jquery",
		          _: "loadash",
		      "window.jQuery": "jquery"
		    })
		  ]
		};

		return gulp.src(options.src)
		    .pipe($.plumber({
		      errorHandler: $.notify.onError(err => ({
		        title:   ' ',
		        message: err.message
		      }))
		    }))
		    .pipe(named())
		    .pipe(webpackstream(optionsWebpack))
		    .pipe(gulp.dest(options.dst))

		}
};