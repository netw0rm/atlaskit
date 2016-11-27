const webpackConfig = require('../webpack/karma');

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

    autoWatch: false,

    browsers: ['Chrome', 'Firefox'],

    reportSlowerThan: 500, // default animation duration is 250ms

    singleRun: true,

    concurrency: Infinity,

    mochaReporter: {
      showDiff: true,
    },
  });

  config.set({
    client: {
      mocha: {
        timeout: 6000, // avoid timeout on tests in VMs
      },
    },
  });
};
