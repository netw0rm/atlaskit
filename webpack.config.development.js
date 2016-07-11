const webpack = require('webpack');
const standardConfig = require('./webpack.config.base.js');

standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
}));

module.exports = standardConfig;
