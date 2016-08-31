const camelCase = require('camelcase');
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));
const autoprefixer = require('autoprefixer');

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
        { // Support react/jsx in stories
          loader: 'babel-loader',
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
        { // Support jsx to incremental dom in non-react locations (above).
          // Make sure vdom is imported from skatejs where jsx is used
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules|bower_components/,
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
