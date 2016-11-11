const webpackConfig = require('../webpack/karma.js');
const addPolyFills = require('./addPolyFills.js');
const FailPlugin = require('./FailPlugin');

module.exports = (config) => {
  Object.assign(config, {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    frameworks: ['mocha', 'chai', 'sinon-chai'],

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

    reportSlowerThan: 500, // default animation duration is 250ms

    singleRun: false,

    concurrency: Infinity,

    mochaReporter: {
      showDiff: true,
    },
  });

  config.webpack.plugins.push(new FailPlugin(config));

  // add the polyfill file to the test run
  addPolyFills(config);

  config.set({
    client: {
      mocha: {
        timeout: 10000, // avoid timeout on tests in VMs
      },
    },
  });
};
