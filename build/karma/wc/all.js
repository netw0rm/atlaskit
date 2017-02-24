const path = require('path');

const karmaConf = require('../base');
const addPolyFills = require('../addPolyFills');
const setUpEnzyme = require('../setUpEnzyme');
const assignPattern = require('../assignPattern');
const removeSourcemaps = require('../removeSourceMaps');

module.exports = (config) => {
  karmaConf(config);
  assignPattern(config, path.join(__dirname, 'all.entry.js'));
  addPolyFills(config);
  setUpEnzyme(config);
  removeSourcemaps(config);
};
