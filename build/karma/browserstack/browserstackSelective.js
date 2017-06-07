// This is the entrypoint for running all the browserstack tests in CI
const chalk = require('chalk');

const allConfig = require('./all');
const stage1 = require('./browserstack.browsers.stage.1');
const stage2 = require('./browserstack.browsers.stage.2');
const stage3 = require('./browserstack.browsers.stage.3');
const processChangedPackages = require('./processChangedPackages');
const getPackagesWithTests = require('./getPackagesWithTests');

const packages = getPackagesWithTests(
  processChangedPackages(process.argv ? process.argv[process.argv.length - 1] : ''));

// eslint-disable-next-line
const launchers = Object.assign({}, stage1, stage2, stage3);
const browsers = Object.keys(launchers);

if (!packages || !packages.length) {
  // eslint-disable-next-line
  console.log(chalk.yellow('Skipping BrowserStack tests since changed packages don\'t have them.'));
  process.exit(0);
}

// eslint-disable-next-line
console.log(chalk.blue(`Running BrowserStack tests for: ${packages.join(', ')}`));

browsers.forEach((key) => {
  launchers[key].base = 'BrowserStack';
});

module.exports = (config) => {
  allConfig(config, packages);

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
    concurrency: 2,
    browserDisconnectTolerance: 5,
    client: {},
    customLaunchers: launchers,
    browsers,
  });
};
