const allConf = require('./all');
const assignPattern = require('../assignPattern');

const files = '@(test|src)/**/*@(Spec|spec).+(js|jsx|ts|tsx)';

module.exports = (config) => {
  allConf(config, { keepSourceMaps: true });
  assignPattern(config, files);
};
