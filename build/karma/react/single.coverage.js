const single = require('./single');
const coverage = require('../coverage');

module.exports = (config) => {
  single(config);
  coverage(config);
};
