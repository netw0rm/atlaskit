// const path = require('path');
const baseConfig = require('./karma.conf.browserstack.js');
const browserStackBrowsers = require('./build/lib/browserstack.browsers.branch.js');

module.exports = (config) => {
  baseConfig(config);

  const webpackAndSourcemap = ['webpack', 'sourcemap'];

  Object.assign(config, {
    customLaunchers: browserStackBrowsers,
    browsers: Object.keys(browserStackBrowsers),

    files: [
      'packages/akutil-polyfills/src/index.js',
      'packages/*/test/**/*.js',
    ],

    preprocessors: {
      'packages/akutil-polyfills/src/index.js': webpackAndSourcemap,
      'packages/*/test/**/*.js': webpackAndSourcemap,
    },
  });
  console.log(config);
};
