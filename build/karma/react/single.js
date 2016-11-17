const allConf = require('./all');
const assignPattern = require('../assignPattern');

const base = 'test';
const files = `${base}/**/*Spec.jsx`;

module.exports = (config) => {
  allConf(config);
  assignPattern(config, files);
};
