const webpack = require('webpack');
const standardConfig = require('./development.js');

// We delete the entry from the normal config and let karma insert it for us
delete standardConfig.entry;

// Dedupe modules
standardConfig.plugins.push(new webpack.optimize.DedupePlugin());

module.exports = standardConfig;
