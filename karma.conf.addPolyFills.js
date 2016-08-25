function addPolyFills(config) {
  const polyfills = require.resolve('akutil-polyfills');
  config.files.unshift(polyfills);

  Object.assign(config.preprocessors, {
    [polyfills]: ['webpack', 'sourcemap'],
  });
}
module.exports = addPolyFills;
