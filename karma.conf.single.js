const karmaConf = require('./karma.conf.js');
const addPolyFills = require('./karma.conf.addPolyFills.js');

module.exports = (config) => {
  karmaConf(config);

  Object.assign(config, {
    files: [
      'test/**/*.+(ts|js)',
    ],

    preprocessors: {
      'test/**/*.+(js|ts)': ['webpack', 'sourcemap'],
    },
  });

  // add the polyfill file to the test run
  addPolyFills(config);
};
