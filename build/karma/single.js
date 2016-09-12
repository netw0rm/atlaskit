const karmaConf = require('./base.js');
const addPolyFills = require('./addPolyFills.js');

module.exports = (config) => {
  const files = 'test/**/*.+(js|ts)';
  karmaConf(config);

  Object.assign(config, {
    files: [
      files,
    ],

    preprocessors: {
      [files]: ['webpack', 'sourcemap'],
    },
  });

  // add the polyfill file to the test run
  addPolyFills(config);
};
