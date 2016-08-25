const webpackConfig = require('./webpack.config.karma.browserstack.js');
const baseConfig = require('./karma.conf.js');
const addPolyFills = require('./karma.conf.addPolyFills.js');
const writeEntryFile = require('./karma.conf.browserstack.writeEntryFile.js');

module.exports = (config) => {
  baseConfig(config);
  const entryFile = writeEntryFile('browserstack-entry.js');

  Object.assign(config, {
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY,
      startTunnel: !process.env.BROWSERSTACK_TUNNEL,
      tunnelIdentifier: process.env.BROWSERSTACK_TUNNEL || 'ak_tunnel',
      project: 'AtlasKit',
      build: `${process.env.CURRENT_BRANCH} ${new Date().getTime()} ${process.env.HEAD_SHA}`,
    },
    captureTimeout: 120000,
    reporters: ['dots'],
    autoWatch: false,
    concurrency: 5,
    client: {},
    webpack: webpackConfig(entryFile),
    files: [entryFile],
    preprocessors: {
      [entryFile]: ['webpack', 'sourcemap'],
    },
  });

  addPolyFills(config);
};
