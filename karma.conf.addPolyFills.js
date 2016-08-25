function addPolyFills(config) {
  const polyfills = require.resolve('akutil-polyfills');
  config.files.unshift(polyfills);
  const additionalPreprocessors = {};
  additionalPreprocessors[polyfills] = ['webpack', 'sourcemap'];
  Object.assign(config.preprocessors, additionalPreprocessors);
}
module.exports = addPolyFills;
