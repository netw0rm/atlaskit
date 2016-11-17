const path = require('path');

const karmaConf = require('../base');
const addPolyFills = require('../addPolyFills');
const assignPattern = require('../assignPattern');
const FailPlugin = require('../FailPlugin');


module.exports = (config) => {
  karmaConf(config);

  assignPattern(config, path.join(__dirname, 'all.entry.js'));

  config.webpack.plugins.push(new FailPlugin(config));

  // add the polyfill file to the test run
  addPolyFills(config);
};
