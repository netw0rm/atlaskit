const camelCase = require('camelcase');
const fs = require('fs');
const log = require('minilog')('webpack');

const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));
const HtmlWebpackPlugin = require('html-webpack-plugin');

const argv = require('minimist')(process.argv.slice(2));
const shouldMininimize = !!argv.min;
const isDemo = !!argv.demo;
const shouldBundleDependencies = !!argv['bundle-deps'];
const isMonkeyTest = !!argv.monkey;
const isIntegratonTest = !!argv.integration;

require('minilog').enable();

const standardConfig = {
  entry: {
    'dist/bundle.js': './src/index.js',
  },
  output: {
    path: './',
    // Comes from the key of entry.
    filename: '[name]',
    libraryTarget: 'umd',
    // This will be the name of the global in the UMD module.
    library: camelCase(pkg.name),
  },
  // Only bundle dependencies that start with '.'.
  externals: fs.readdirSync('node_modules'),
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
          presets: [
            'es2015',
            'react',
            'stage-0'
          ]
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
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/, // Only remove dead code
      dead_code: true,
      mangle: false,
      beautify: true,
      comments: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      // Minify any target that ends in .min.js.
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
};

if (isIntegratonTest) {
  log.info('Integration testing');
  standardConfig.entry['integration.js'] = './integration/index.js';
  standardConfig.plugins = [
    new HtmlWebpackPlugin({
      title: `${pkg.name} - Integration Test`,
      template: './integration/index.ejs',
    }),
  ];
} else if (isDemo) {
  log.info('Demo mode');
  standardConfig.entry['demo.js'] = './demo/index.js';
  if (isMonkeyTest) {
    standardConfig.entry['monkey.js'] = path.join(__dirname, 'build', 'lib', 'monkey.js');
  }
  standardConfig.plugins = [
    new HtmlWebpackPlugin({
      title: `${pkg.name} - Demo`,
      template: './demo/index.ejs',
    }),
  ];
}

if (shouldMininimize) {
  log.info('minimizing');
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js',
  });
}

if (shouldBundleDependencies) {
  log.info('bundling dependencies');
  delete standardConfig.externals;
}

// Some overrides passed in by command line args.
if (isIntegratonTest || isDemo) {
  log.info('adding polyfills');
  standardConfig.entry['polyfills.js'] = require.resolve('ak-util-polyfills');
}

module.exports = standardConfig;
