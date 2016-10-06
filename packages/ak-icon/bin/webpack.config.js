const webpack = require('webpack');
const path = require('path');
const relativePathToIcon = path.join('..', 'src', 'Icon');
const pathToIcon = path.join(__dirname, relativePathToIcon);
const baseIconChunkName = require('./constants').baseIconChunkName;

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
        const relativePathToBaseIcon = path.join(foldersUp, `${baseIconChunkName}.js`);
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
        loader: 'css?camelCase=true&modules=true!less',
      },
      {
        loader: 'babel',
        test: /\.js$/,
        query: {
          presets: [
            'es2015',
            'stage-0',
          ],
          plugins: [
            ['incremental-dom', {
              components: true,
              hoist: true,
              prefix: 'vdom',
            }],
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
