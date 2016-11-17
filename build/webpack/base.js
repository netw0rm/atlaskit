const camelCase = require('camelcase');
const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const moduleBabelQuery = require('./babel.query.module');
const loaderChain = require('./loader-chain').encode;


const isDevelopment = process.env.NODE_ENV === 'development';

function defaultPackageMains() {
  const options = new webpack.WebpackOptionsDefaulter();
  options.process({});
  return options.defaults.resolve.packageMains;
}

const css = {
  camelCase: true,
  importLoaders: 1,
  mergeRules: false,
  modules: true,
};

if (isDevelopment) {
  css['-minimize'] = true;
}


const standardConfig = {
  entry: {
    'dist/bundle.js': [`./${pkg['ak:webpack:raw']}`],
  },
  output: {
    path: './',
    // Comes from the key of entry.
    filename: '[name]',
    libraryTarget: 'umd',
    // This will be the name of the global in the UMD module.
    library: camelCase(pkg.name),
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
    packageMains: ['ak:webpack:raw', ...defaultPackageMains()],
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.less$/,
        loader: loaderChain({
          'css-loader': css,
          'postcss-loader': {},
          'less-loader': {},
        }),
      },
      [ // exclusive configs for babel (first one that matches will be used)
        //
        // TYPESCRIPT
        // Storybook only -- uses React rather than Incremental DOM
        //
        {
          test: /\/(stories|react)\/.*\.tsx?$/,
          loader: loaderChain({
            'babel-loader': {},
            'ts-loader': {},
          }),
        },
        //
        // TYPESCRIPT
        // Package code -- uses Incremental DOM rather than React
        //
        {
          test: /\.tsx?$/,
          loader: loaderChain({
            'babel-loader': moduleBabelQuery,
            'ts-loader': {},
          }),
          exclude: /node_modules/,
        },
        //
        // JAVASCRIPT (React components)
        //
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        //
        // JAVASCRIPT (Web components)
        // Support react/jsx in stories, react/ directory, or react-*.js files
        //
        // TODO: remove this once we don't have WC any more
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: /stories\/.*\.jsx?|build\/storybook\/.+\.jsx?$/,
          // TODO: Remove next line once ak-component-base and ak-tooltip are migrated
          exclude: /stories\/skate\/.*\.js/,
        },
        //
        // JAVASCRIPT
        // Support jsx to incremental dom in non-react locations (above).
        // Make sure vdom is imported from skatejs where jsx is used
        //
        // TODO: remove this once we don't have WC any more
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: moduleBabelQuery,
          exclude: /node_modules/,
        },
      ],
    ],
  },
  postcss: () => [
    autoprefixer({
      // have a look here: https://confluence.atlassian.com/display/Cloud/Supported+browsers
      // "not Opera" w/o version qualifier is not valid, so I chose a really high version number
      // TODO: Remove IE10 once Confluence stop supporting it (IE 10 is not tested in CI) https://ecosystem.atlassian.net/browse/AK-542
      browsers: 'last 1 version, ie 10, Android > 4, not Opera < 1000',
    }),
  ],
  plugins: [],
};

module.exports = standardConfig;
