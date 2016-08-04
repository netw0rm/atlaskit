const path = require('path');
const baseConfig = require('./karma.conf.js');
const pkgJsonPath = path.join(process.cwd(), 'package.json');
const packageName = require(pkgJsonPath).name;

module.exports = (config) => {
  baseConfig(config);

  Object.assign(config, {
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY,
      startTunnel: !process.env.BROWSERSTACK_TUNNEL,
      tunnelIdentifier: process.env.BROWSERSTACK_TUNNEL || 'ak_tunnel',
      project: 'AtlasKit',
      name: packageName,
      build: `${process.env.CURRENT_BRANCH} ${process.env.HEAD_SHA}`,
    },
    captureTimeout: 120000,
    reporters: ['dots'],
    autoWatch: false,
    concurrency: 10,
    client: {},
  });
};
