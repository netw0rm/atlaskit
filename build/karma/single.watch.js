const singleConf = require('./single');

module.exports = (config) => {
  singleConf(config);
  config.singleRun = false;
  config.reporters = ['mocha'];
  config.mochaReporter = {
    output: 'autowatch',
    showDiff: true,
  };
};
