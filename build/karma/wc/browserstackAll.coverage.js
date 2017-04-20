const coverage = require('../coverage');
const browserstackAll = require('./browserstackAll');

module.exports = (config) => {
  browserstackAll(config);
  coverage(config);
};
