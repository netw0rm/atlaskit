const path = require('path');

const karmaConf = require('../base');
const addPolyFills = require('../addPolyFills');
const setUpEnzyme = require('../setUpEnzyme');
const assignPattern = require('../assignPattern');

module.exports = (config) => {
  karmaConf(config);

  assignPattern(config, path.join(__dirname, 'all.entry.js'));

  // add the polyfill file to the test run
  addPolyFills(config);

  setUpEnzyme(config);
};
