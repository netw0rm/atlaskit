/* eslint-disable prefer-object-spread/prefer-object-spread */

const webpack = require('webpack');
const path = require('path');
const baseIconChunkName = require('./constants').baseIconChunkName;

const relativePathToIcon = path.join('..', 'src', 'Icon');
const pathToIcon = path.join(__dirname, relativePathToIcon);

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = (tmpFolder, entry) => ({
  entry: Object.assign({
    [baseIconChunkName]: [pathToIcon],
  }, entry),
  output: {
    path: tmpFolder,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    (context, request, callback) => {
      const offset = request.indexOf(relativePathToIcon);
      if (offset !== -1) {
        const foldersUp = request.substring(0, offset);
        const relativePathToBaseIcon = path.join(foldersUp, `${baseIconChunkName}.jsx`);
        callback(null, `./${relativePathToBaseIcon}`);
        return;
      }
      callback();
    },
    /^[a-z\-0-9]+$/,
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
          loader: 'css-loader',
          options: {
            camelCase: true,
            mergeRules: false,
            minimize: !isDevelopment,
            modules: true,
          },
        }, 'less-loader'],
      },
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'es2015',
              'react',
              'stage-0',
            ],
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // TODO remove this when going back to using the -loader suffix.
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
});
