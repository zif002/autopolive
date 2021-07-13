"use strict";
var $ = require("gulp-load-plugins")(),
  webpackstream = require("webpack-stream"),
  webpack = webpackstream.webpack,
  named = require("vinyl-named"),
  path = require("path"),
  gulp = require("gulp");
  var isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV == "development";
module.exports = function (options) {
  var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "loadash",
      "window.jQuery": "jquery",
    }),
  ]
  return function () {

    //console.log(isDevelopment);
    var optionsWebpack = {
      watch: isDevelopment,
      mode: process.env.NODE_ENV,
      devtool: isDevelopment ? "cheap-module-inline-source-map" : false,
      resolve: {
        modulesDirectories: ["node_modules"],
      },

      module: {
        loaders: [
          {
            test: /\.js$/,
            include: path.join(__dirname, options.loaders),
            loader: "babel?presets[]=es2015",
            exclude: [/node_modules/],
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      plugins: isDevelopment ? plugins : [
        ...plugins,
        new webpack.optimize.UglifyJsPlugin(),
      ],
    };

    return gulp
      .src(options.src)
      .pipe(
        $.plumber({
          errorHandler: $.notify.onError((err) => ({
            title: " ",
            message: err.message,
          })),
        })
      )
      .pipe(named())
      .pipe(webpackstream(optionsWebpack))
      .on("error", function (error) {
        plugins.util.log(plugins.util.colors.red(error.message));
        this.emit("end");
      })
      .pipe(gulp.dest(options.dst));
  };
};
