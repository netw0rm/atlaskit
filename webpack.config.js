const camelCase = require('camelcase');
const fs = require('fs');
const glob = require('glob');
const log = require('minilog')('webpack');

const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));
const HtmlWebpackPlugin = require('html-webpack-plugin');

const argv = require('minimist')(process.argv.slice(2));
const shouldMinimize = !!argv.min;
const isDemo = !!argv.demo;
const shouldBundleDependencies = !!argv['bundle-deps'];

require('minilog').enable();

const bundleFiles = glob.sync('./src/index*.js');

const standardConfig = {
  entry: {
    'dist/bundle.js': bundleFiles,
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
        test: /\.json/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.less$/,
        loader: 'css?modules&camelCase!less',
      },
      [ // exclusive configs for babel (first one that matches will be used)
        { // Support react/jsx in stories, react/ directory, or react-*.js files
          loader: 'babel-loader',
          test: /\.jsx?$/,
          include: /react-[^/]*\.jsx?$|react\/.*\.jsx?$|stories\/.*\.jsx?|build\/storybook\/.+\.jsx?$/, // eslint-disable-line max-len
          query: {
            presets: [
              'es2015',
              'react', // required by react-storybook
              'stage-0',
            ],
          },
        },
        { // Support jsx to incremental dom in non-react locations (above).
          // Make sure vdom is imported from skatejs where jsx is used
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules|bower_components/, // eslint-disable-line max-len
          query: {
            presets: [
              'es2015',
              'stage-0',
            ],
            plugins: [
              [
                'incremental-dom',
                {
                  hoist: true,
                  prefix: 'vdom',
                },
              ],
            ],
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
      ],
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

if (isDemo) {
  log.info('Demo mode');
  standardConfig.entry['demo.js'] = './demo/index.js';
  log.info('adding polyfills');
  standardConfig.entry['polyfills.js'] = require.resolve('akutil-polyfills');
  standardConfig.plugins = [
    new HtmlWebpackPlugin({
      title: `${pkg.name} - Demo`,
      template: './demo/index.ejs',
    }),
  ];
}

if (shouldMinimize) {
  log.info('minimizing');
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': bundleFiles,
  });
}

if (shouldBundleDependencies) {
  log.info('bundling dependencies');
  delete standardConfig.externals;
}

module.exports = standardConfig;
