const webpack = require('webpack');

module.exports = (tmpFolder, entry) => ({
  entry,
  output: {
    path: tmpFolder,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    /^[a-z\-0-9]+$/,
  ],
  module: {
    loaders: [
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
