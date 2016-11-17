const karmaConf = require('./all.js');
const enableCoverage = require('../enableCoverage');
const moduleBabelQuery = require('../../webpack/babel.query.module');

module.exports = (config) => {
  karmaConf(config);
  config.set({
    browsers: ['Chrome'],
  });
  enableCoverage(config, 'wc', moduleBabelQuery);
};
