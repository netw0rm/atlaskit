const path = require('path');
const browserStackBrowsers = require('./build/lib/karma.browserstack.browsers.js');
const webpackConfig = require('./webpack.config.karma.js');

module.exports = (config) => {
  Object.assign(config, {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai'],

    // list of files / patterns to load in the browser
    // all dependencies should be traced through here
    files: [
      'test/**/*.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // webpack will trace and watch all dependencies
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
    },

    // karma watches the test entry points
    // (you don't need to specify the entry option)
    // webpack watches dependencies
    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });

  // add the polyfill file to the test run
  const polyfills = path.join(__dirname, 'packages', 'akutil-polyfills', 'src', 'index.js');
  config.files.unshift(polyfills);
  const additionalPreprocessors = {};
  additionalPreprocessors[polyfills] = ['webpack', 'sourcemap'];
  Object.assign(config.preprocessors, additionalPreprocessors);

  if (process.env.BROWSERSTACK) {
    const pkgJsonPath = path.join(process.cwd(), 'package.json');
    const packageName = require(pkgJsonPath).name; // eslint-disable-line global-require
    Object.assign(config, {
      browserStack: {
        username: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_KEY,
        startTunnel: !process.env.BROWSERSTACK_TUNNEL,
        tunnelIdentifier: process.env.BROWSERSTACK_TUNNEL || 'ak_tunnel',
        project: 'AtlasKit',
        name: packageName,
      },
      customLaunchers: browserStackBrowsers,
      browsers: Object.keys(browserStackBrowsers),
      captureTimeout: 120000,
      browserNoActivityTimeout: 60000,
      reporters: ['dots'],
      autoWatch: false,
      concurrency: 5,
      client: {},
    });
  }
};
