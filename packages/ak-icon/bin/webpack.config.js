const webpack = require('webpack');
const path = require('path');
const baseIconChunkName = require('./constants').baseIconChunkName;


const relativePathToIcon = path.join('..', 'src', 'Icon');
const pathToIcon = path.join(__dirname, relativePathToIcon);

const isDevelopment = process.env.NODE_ENV === 'development';
let cssOptions = '?camelCase=true&modules=true&mergeRules=false';
if (isDevelopment) {
  cssOptions += '&-minimize';
}


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
        loader: `css${cssOptions}!less`,
      },
      {
        loader: 'babel',
        test: /\.js$/,
        query: {
          babelrc: false,
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
