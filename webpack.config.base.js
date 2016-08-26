const camelCase = require('camelcase');
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));
const autoprefixer = require('autoprefixer');

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
  module: {
    loaders: [
      {
        test: /\.json/,
        loader: 'json',
      },
      {
        test: /\.less$/,
        loader: 'css?modules&camelCase&importLoaders=1!postcss-loader!less',
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
            plugins: [
              'transform-runtime',
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
              'transform-runtime',
              [
                'incremental-dom',
                {
                  components: true,
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
