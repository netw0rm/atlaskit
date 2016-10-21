const allConfig = require('./all.js');
const coverageConfig = require('./coverage.js');
const stage1 = require('./browserstack.browsers.stage.1');
const stage2 = require('./browserstack.browsers.stage.2');
const stage3 = require('./browserstack.browsers.stage.3');

const stages = [
  null,
  stage1,
  stage2,
  stage3,
];

const currentStage = +process.env.BROWSERSTACK_STAGE;
const launchers = stages[currentStage];

const browsers = Object.keys(launchers);
browsers.forEach((key) => {
  launchers[key].base = 'BrowserStack';
});

// Only generate coverage report for first stage
const isCoverage = currentStage === 1;
const baseConfig = isCoverage ? coverageConfig : allConfig;

module.exports = (config) => {
  baseConfig(config);

  Object.assign(config, {
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY,
      retryLimit: 5,
      startTunnel: !process.env.BITBUCKET_COMMIT,
      tunnelIdentifier: process.env.BITBUCKET_COMMIT || 'ak_tunnel',
      project: 'AtlasKit',
      build: `${process.env.CURRENT_BRANCH} ${new Date().getTime()} ${process.env.GITHEAD_SHORT}`,
    },
    captureTimeout: 120000,
    reporters: ['mocha', 'BrowserStack'],
    singleRun: true,
    autoWatch: false,
    concurrency: 5,
    browserDisconnectTolerance: 5,
    client: {},
    customLaunchers: launchers,
    browsers,
  });
  if (isCoverage) {
    config.reporters.push('coverage');
  }
};
