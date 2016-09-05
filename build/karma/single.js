const karmaConf = require('./base.js');
const addPolyFills = require('./addPolyFills.js');

module.exports = (config) => {
  karmaConf(config);

  Object.assign(config, {
    files: [
      'test/**/*.js',
    ],

    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
    },
  });

  // add the polyfill file to the test run
  addPolyFills(config);
};
