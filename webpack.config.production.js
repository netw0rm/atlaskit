const fs = require('fs');
const webpack = require('webpack');
const standardConfig = require('./webpack.config.base.js');
const argv = require('minimist')(process.argv.slice(2));

const shouldBundleDependencies = !!argv['bundle-deps'];
const libraryTarget = argv['library-target'];

Object.assign(standardConfig.entry, {
  'dist/bundle.min.js': standardConfig.entry['dist/bundle.js'],
});

if (libraryTarget) {
  standardConfig.output.libraryTarget = libraryTarget;
}

if (!shouldBundleDependencies) {
  // Only bundle dependencies that start with '.'.
  standardConfig.externals = fs.readdirSync('node_modules');
}

standardConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  include: /\.js$/, // Only remove dead code
  dead_code: true,
  mangle: false,
  beautify: true,
  comments: true,
  compress: {
    warnings: false,
  },
}));
standardConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  // Minify any target that ends in .min.js.
  include: /\.min\.js$/,
  minimize: true,
  compress: {
    warnings: false,
  },
}));

standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));


module.exports = standardConfig;
