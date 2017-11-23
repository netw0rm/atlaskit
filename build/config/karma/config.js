const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../../webpack/karma');
const getConfigRoot = require('../_getConfigRoot');

const cwd = process.cwd();
const configRoot = getConfigRoot(cwd);

const customEventPolyfill = require.resolve('custom-event-polyfill');
const babelPolyfill = require.resolve('babel-polyfill');
const pattern = path.join(__dirname, 'entry.js');

Object.assign(webpackConfig, {
  devtool: 'inline-source-map', // just do inline source maps instead of the default
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
});

delete webpackConfig.devtool;

if (configRoot.indexOf('packages') > 0) {
  const packageName = configRoot.split('packages')[1].split('/')[1];

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.AK_COMPONENT': JSON.stringify(packageName),
  }));
}

module.exports = (config) => {
  Object.assign(config, {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      babelPolyfill,
      customEventPolyfill,
      pattern,
    ],

    preprocessors: {
      [customEventPolyfill]: ['webpack'],
      [babelPolyfill]: ['webpack', 'sourcemap'],
      [pattern]: ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // Reduces verbosity significantly by skipping the output of >1000 lines on
      // the terminal. This is helpful in IDEs that have a constrained console buffer.
      stats: {
        chunks: false,
      },
    },

    mime: {
      'application/javascript': ['ts', 'tsx'],
    },

    reporters: ['spec'],

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome', 'Firefox'],

    reportSlowerThan: 500, // default animation duration is 250ms

    // The default 10s is not adequate to handle the bundle size when lerna *does not* link
    // all the packages together. When lerna linking is not applied (for whatever reason)
    // deduping is not implicit, and bundle sizes are huge, which can take a significant amount
    // of time in CI.
    browserNoActivityTimeout: 100000,

    singleRun: true,

    concurrency: 20,

    mochaReporter: {
      showDiff: true,
    },

    client: {
      mocha: {
        timeout: 10000, // avoid timeout on tests in VMs
      },
    },
  });

  if (process.argv.indexOf('--watch') !== -1) {
    config.set({
      singleRun: false,
      autoWatch: true,
      reporters: ['mocha'],
      mochaReporter: {
        output: 'autowatch',
        showDiff: true,
      },
    });
  }

  if (process.argv.indexOf('--browserstack') !== -1) {
    const launchers = {
      internet_explorer_11: { browser: 'ie', os: 'WINDOWS', os_version: '8.1', browser_version: '11' },
      iphone: { os: 'ios', os_version: '9.1', device: 'iPhone 6S' },
      chrome_latest_osx: { browser: 'chrome', os: 'OS X', os_version: 'El Capitan' },
      firefox_latest_windows: { browser: 'firefox', os: 'WINDOWS', os_version: '10' },
      firefox_latest_osx: { browser: 'firefox', os: 'OS X', os_version: 'El Capitan' },
      edge_latest: { browser: 'edge', os: 'WINDOWS', os_version: '10' },
    };

    const browsers = Object.keys(launchers);

    browsers.forEach((key) => {
      launchers[key].base = 'BrowserStack';
    });

    Object.assign(config, {
      browserStack: {
        username: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_KEY,
        retryLimit: 5,
        startTunnel: !process.env.BITBUCKET_COMMIT,
        tunnelIdentifier: process.env.BITBUCKET_COMMIT || 'ak_tunnel',
        project: 'Atlaskit',
        build: `${process.env.CURRENT_BRANCH} ${new Date().getTime()} ${process.env.GITHEAD_SHORT}`,
      },
      captureTimeout: 120000,
      reporters: ['mocha', 'BrowserStack'],
      concurrency: 2,
      browserDisconnectTolerance: 5,
      customLaunchers: launchers,
      browsers,
    });
  }
};
