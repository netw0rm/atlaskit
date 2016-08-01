const baseConfig = require('./karma.conf.browserstack.js');
const browserStackBrowsers = require('./build/lib/browserstack.browsers.master.js');

module.exports = (config) => {
  baseConfig(config);

  Object.assign(config, {
    customLaunchers: browserStackBrowsers,
    browsers: Object.keys(browserStackBrowsers),
  });
};
