const karmaConf = require('./all.js');
const enableCoverage = require('../enableCoverage');

module.exports = (config) => {
  karmaConf(config);
  config.set({
    browsers: ['Chrome'],
  });
  enableCoverage(config, 'wc');
};
