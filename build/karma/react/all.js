const path = require('path');

const karmaConf = require('../base');
const assignPattern = require('../assignPattern');
const setUpEnzyme = require('../setUpEnzyme');
const removeSourcemaps = require('../removeSourceMaps');

module.exports = (config) => {
  karmaConf(config);
  setUpEnzyme(config);
  removeSourcemaps(config);
  assignPattern(config, path.join(__dirname, 'all.entry.js'));

  config.set({
    browsers: ['jsdom'],
  });
};
