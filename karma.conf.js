const webpackConfig = require('./webpack.config.karma.js');
const addPolyFills = require('./karma.conf.addPolyFills.js');

module.exports = (config) => {
  Object.assign(config, {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      'packages/*/test/**/*.js',
    ],

    preprocessors: {
      'packages/*/test/**/*.js': ['webpack', 'sourcemap'],
    },

    // karma watches the test entry points
    // (you don't need to specify the entry option)
    // webpack watches dependencies
    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },

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
  addPolyFills(config);
};
