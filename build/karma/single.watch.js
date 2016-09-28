const singleConf = require('./single');

module.exports = (config) => {
  singleConf(config);
  config.singleRun = false;
};
