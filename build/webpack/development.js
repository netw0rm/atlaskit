const webpack = require('webpack');
const standardConfig = require('./base.js');

standardConfig.devtool = 'inline-source-map';
standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
}));

module.exports = standardConfig;
