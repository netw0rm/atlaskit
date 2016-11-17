const allConf = require('./all.js');
const enableCoverage = require('../enableCoverage');

module.exports = (config) => {
  allConf(config);
  enableCoverage(config, 'react');
};
