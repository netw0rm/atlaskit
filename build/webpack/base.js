const camelCase = require('camelcase');
const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const moduleBabelQuery = require('./babel.query.module');
const storybookBabelQuery = require('./babel.query.storybook');
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
          test: /\/stories\/.*\.tsx?$/,
          loader: loaderChain({
            'babel-loader': storybookBabelQuery,
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
        },
        //
        // JAVASCRIPT
        // Support react/jsx in stories, react/ directory, or react-*.js files
        //
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          include: /stories\/.*\.jsx?|build\/storybook\/.+\.jsx?$/,
          exclude: /stories\/skate\/.*\.js/,
          query: storybookBabelQuery,
        },
        //
        // JAVASCRIPT
        // Support jsx to incremental dom in non-react locations (above).
        // Make sure vdom is imported from skatejs where jsx is used
        //
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules|bower_components/,
          query: moduleBabelQuery,
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
