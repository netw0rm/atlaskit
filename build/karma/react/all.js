const path = require('path');

const karmaConf = require('../base');
const assignPattern = require('../assignPattern');
const setUpEnzyme = require('../setUpEnzyme');


module.exports = (config) => {
  karmaConf(config);
  setUpEnzyme(config);
  assignPattern(config, path.join(__dirname, 'all.entry.js'));
  config.set({
    browsers: ['jsdom'],
  });
};
