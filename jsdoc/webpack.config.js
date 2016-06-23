const JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
  entry: "./jsdoc/src/index.js",
  output: {
    path: './jsdoc/out/scripts',
    filename: "index.js"
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.less$/,
        loader: 'css?modules&camelCase!less',
      },
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: 'es2015',
        },
      },
      { // this is for the v1 CustomElement polyfill and named-slots
        loader: 'babel-loader',
        test: /\.jsx?$/,
        include: /(webcomponents\.js\/src|skatejs-named-slots\/src)/,
        query: {
          presets: 'es2015',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new JsDocPlugin({
      conf: './jsdoc/conf.json'
    }),
  ]
};

