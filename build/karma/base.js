const webpackConfig = require('../webpack/karma.js');
const addPolyFills = require('./addPolyFills.js');

module.exports = (config) => {
  const files = 'packages/*/test/**/*.+(js|ts)';

  Object.assign(config, {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      files,
    ],

    preprocessors: {
      [files]: ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },

    reporters: ['progress'],

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'Firefox'],

    reportSlowerThan: 200,

    singleRun: false,

    concurrency: Infinity,
  });

  // add the polyfill file to the test run
  addPolyFills(config);
};
