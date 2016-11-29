const allConf = require('./all.js');
const assignPattern = require('../assignPattern');
const addPolyFills = require('../addPolyFills');

const base = 'test';
const files = `${base}/**/*.+(js|ts|tsx)`;
const exclude = `${base}/_*.+(js|ts|tsx)`;

module.exports = (config) => {
  allConf(config);
  assignPattern(config, files, exclude);
  addPolyFills(config);
};
