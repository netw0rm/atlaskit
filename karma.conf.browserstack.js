const webpackConfig = require('./webpack.config.karma.browserstack.js');
const baseConfig = require('./karma.conf.js');
const addPolyFills = require('./karma.conf.addPolyFills.js');

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
    captureTimeout: 120000,
    reporters: ['dots'],
    autoWatch: false,
    concurrency: 5,
    client: {},
    webpack: webpackConfig,
    files: ['packages/*/test/**/*.js'],
    preprocessors: {
      'packages/*/test/**/*.js': ['webpack', 'sourcemap'],
    },
  });

  addPolyFills(config);
};
