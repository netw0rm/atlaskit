const baseConfig = require('./base.js');
const browserStackBrowsers = require('./browserstack.browsers.js');

module.exports = (config) => {
  baseConfig(config);

  Object.assign(config, {
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY,
      startTunnel: !process.env.BROWSERSTACK_TUNNEL,
      tunnelIdentifier: process.env.BROWSERSTACK_TUNNEL || 'ak_tunnel',
      project: 'AtlasKit',
      build: `${process.env.CURRENT_BRANCH} ${new Date().getTime()} ${process.env.HEAD_SHA}`,
    },
    logLevel: config.LOG_DEBUG,
    captureTimeout: 120000,
    browserNoActivityTimeout: 30000,
    reporters: ['dots'],
    autoWatch: false,
    concurrency: 5,
    client: {},
    customLaunchers: browserStackBrowsers,
    browsers: Object.keys(browserStackBrowsers),
  });
};
