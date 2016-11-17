const allConfig = require('./all');
const enableCoverage = require('../enableCoverage');
const moduleBabelQuery = require('../../webpack/babel.query.module');
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

module.exports = (config) => {
  allConfig(config);

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
    concurrency: 5,
    browserDisconnectTolerance: 5,
    client: {},
    customLaunchers: launchers,
    browsers,
  });
  if (isCoverage) {
    enableCoverage(config, 'wc', moduleBabelQuery);
  }
};
