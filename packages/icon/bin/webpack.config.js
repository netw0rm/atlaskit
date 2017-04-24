/* eslint-disable prefer-object-spread/prefer-object-spread */

const webpack = require('webpack');
const path = require('path');
const baseIconChunkName = require('./constants').baseIconChunkName;

const relativePathToIcon = path.join('..', 'src', 'Icon');

const isDevelopment = process.env.NODE_ENV === 'development';
let cssOptions = '?camelCase=true&modules=true&mergeRules=false';
if (isDevelopment) {
  cssOptions += '&-minimize';
}

module.exports = (tmpFolder, entry) => ({
  entry,
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
    loaders: [
      {
        test: /\.less$/,
        loader: `style!css${cssOptions}!less`,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: [
            'es2015',
            'react',
            'stage-0',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
});
