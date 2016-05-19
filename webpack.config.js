const camelCase = require('camelcase');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));

const shouldMininimize = process.argv.indexOf('--min') !== -1;

const standardConfig = {
  entry: {
    'dist/bundle.js': './src/index.js'
  },
  output: {
    path: './',
    filename: '[name]',
    libraryTarget: 'umd',
    library: camelCase(pkg.name)
  },
  externals: /^[^.]/, //Only bundle dependancies that start with '.'
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      loader: 'babel-loader',
      test: /src\/[^\/]+?\.js$/, //only run on js files from the src directory
      query: {
        presets: 'es2015'
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js'
  });
}

module.exports = standardConfig;
