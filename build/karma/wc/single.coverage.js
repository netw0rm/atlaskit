const coverage = require('../coverage');
const single = require('./single');

module.exports = (config) => {
  single(config);
  coverage(config);
};
