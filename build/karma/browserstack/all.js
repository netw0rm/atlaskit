const path = require('path');

// This is not the entrypoint for browserstack tests,
// see browserstack.js, browserstackAll.js, browserstackSelective.js

const karmaConf = require('../base');
const addPolyFills = require('../addPolyFills');
const setUpEnzyme = require('../setUpEnzyme');
const assignPattern = require('../assignPattern');
const removeSourcemaps = require('../removeSourceMaps');
const createPattern = require('./createPattern');

module.exports = (config, packages) => {
  karmaConf(config);
  assignPattern(config, packages ? createPattern(packages) : path.join(__dirname, 'all.entry.js'));
  addPolyFills(config);
  setUpEnzyme(config);
  removeSourcemaps(config);
};
