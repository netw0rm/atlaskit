const path = require('path');

function addPolyFills(config) {
  const polyfills = path.join(__dirname, 'packages', 'akutil-polyfills', 'src', 'index.js');
  config.files.unshift(polyfills);
  const additionalPreprocessors = {};
  additionalPreprocessors[polyfills] = ['webpack', 'sourcemap'];
  Object.assign(config.preprocessors, additionalPreprocessors);
}
module.exports = addPolyFills;
