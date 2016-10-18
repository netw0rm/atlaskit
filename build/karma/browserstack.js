const baseConfig = require('./all.js');
// eslint-disable-next-line import/no-dynamic-require
const launchers = require(`./browserstack.browsers.stage.${process.env.BROWSERSTACK_STAGE}.js`);

const browsers = Object.keys(launchers);
browsers.forEach((key) => {
  launchers[key].base = 'BrowserStack';
});


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
};
