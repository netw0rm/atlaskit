const standardConfig = require('./webpack.config.development.js');

// We delete the entry from the normal config and let karma insert it for us
delete standardConfig.entry;
standardConfig.devtool = '#cheap-module-eval-source-map';

module.exports = standardConfig;
