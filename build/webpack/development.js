const webpack = require('webpack');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const standardConfig = require('./base.js');

// Use this flag to turn on the stats plugin for use in a webpack bundle analyzer
const shouldUseStatsPlugin = true;

standardConfig.devtool = 'cheap-module-source-map';
standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
}));

if (shouldUseStatsPlugin) {
  standardConfig.plugins.push(new StatsWriterPlugin({
    filename: 'stats.json',
    fields: null,
  }));
}

module.exports = standardConfig;
