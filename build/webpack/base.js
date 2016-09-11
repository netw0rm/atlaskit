const camelCase = require('camelcase');
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const idomBabelPlugin = ['incremental-dom', {
  components: true,
  hoist: true,
  prefix: 'vdom',
}];

function defaultPackageMains() {
  const options = new webpack.WebpackOptionsDefaulter();
  options.process({});
  return options.defaults.resolve.packageMains;
}

/**
 * Build a loader chain.
 *
 * @param {Object} spec -- {loader2: {}, loader1: {}, ...}
 *   The order of definition is significant. The prior example would return:
 *
 *       'loader1?{}!loader2?{}'
 */
const loaderChain = (spec) => Object.keys(spec)
  .map(key => `${key}?${JSON.stringify(spec[key])}`)
  .join('!');

const standardConfig = {
  entry: {
    'dist/bundle.js': `./${pkg['ak:webpack:raw']}`,
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
        loader: 'json',
      },
      {
        test: /\.less$/,
        loader: loaderChain({
          css: {
            camelCase: true,
            importLoaders: 1,
            mergeRules: false,
            modules: true,
          },
          postcss: {},
          less: {},
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
            babel: {
              presets: [
                'es2015',
                'react',
              ],
              plugins: [
                'transform-runtime',
              ],
            },
            ts: {},
          }),
        },
        //
        // TYPESCRIPT
        // Package code -- uses Incremental DOM rather than React
        //
        {
          test: /\.tsx?$/,
          loader: loaderChain({
            babel: {
              presets: 'es2015',
              plugins: [
                'transform-runtime',
                idomBabelPlugin,
              ],
            },
            ts: {},
          }),
        },
        //
        // JAVASCRIPT
        // Support react/jsx in stories, react/ directory, or react-*.js files
        //
        {
          loader: 'babel',
          test: /\.jsx?$/,
          include: /stories\/.*\.jsx?|build\/storybook\/.+\.jsx?$/,
          query: {
            presets: [
              'es2015',
              'react', // required by react-storybook
              'stage-0',
            ],
            plugins: [
              'transform-runtime',
            ],
          },
        },
        //
        // JAVASCRIPT
        // Support jsx to incremental dom in non-react locations (above).
        // Make sure vdom is imported from skatejs where jsx is used
        //
        {
          loader: 'babel',
          test: /\.jsx?$/,
          exclude: /node_modules|bower_components/,
          query: {
            presets: [
              'es2015',
              'stage-0',
            ],
            plugins: [
              'transform-runtime',
              idomBabelPlugin,
            ],
          },
        },
      ],
    ],
  },
  postcss: () => [
    autoprefixer({
      // have a look here: https://confluence.atlassian.com/display/Cloud/Supported+browsers
      // "not Opera" w/o version qualifier is not valid, so I chose a really high version number
      browsers: 'last 1 version, ie 11, Android > 4, not Opera < 1000',
    }),
  ],
  plugins: [],
};

module.exports = standardConfig;
