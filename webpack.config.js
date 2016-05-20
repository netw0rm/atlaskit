const camelCase = require('camelcase');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));

const shouldMininimize = process.argv.indexOf('--min') !== -1;
const shouldBundleDependancies = process.argv.indexOf('--bundle-deps') !== -1;

const standardConfig = {
  entry: {
    'dist/bundle.js': './src/index.js'
  },
  output: {
    path: './',
    filename: '[name]', // Comes from the key of entry.
    libraryTarget: 'umd',
    library: camelCase(pkg.name) // This will be the name of the global in the UMD module
  },
  externals: fs.readdirSync("node_modules"), // Only bundle dependancies that start with '.'
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      loader: 'babel-loader',
      test: /src\/[^\/]+?\.js$/, // Only run on js files from the src directory
      query: {
        presets: 'es2015'
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/, // Minify any target that ends in .min.js
      dead_code: true,
      mangle: false,
      beautify: true,
      comments: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/, // Minify any target that ends in .min.js
      minimize: true
    })
  ]
};

// Some overrides passed in by command line args
if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js'
  });
}

if (shouldBundleDependancies) {
  delete standardConfig.externals;
}

module.exports = standardConfig;
