const camelCase = require('camelcase');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));

const shouldMininimize = process.argv.indexOf('--min') !== -1;
const shouldBundledependencies = process.argv.indexOf('--bundle-deps') !== -1;

const standardConfig = {
  entry: {
    'dist/bundle.js': './src/index.js'
  },
  output: {
    path: './',
    // Comes from the key of entry.
    filename: '[name]',
    libraryTarget: 'umd',
    // This will be the name of the global in the UMD module.
    library: camelCase(pkg.name)
  },
  // Only bundle dependencies that start with '.'.
  externals: fs.readdirSync('node_modules'),
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css?modules&camelCase!less'
    }, {
      loader: 'babel-loader',
      // Only run on js files from the src directory.
      test: /(src|test)\/[^\/]+?\.js$/,
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
      // Minify any target that ends in .min.js.
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

// Some overrides passed in by command line args.
if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js'
  });
}

if (shouldBundledependencies) {
  delete standardConfig.externals;
}

module.exports = standardConfig;
