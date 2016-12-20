function addPolyFills(config) {
  const polyfills = require.resolve('akutil-polyfills');
  config.files.unshift(polyfills);

  const babelPolyfill = require.resolve('babel-polyfill');
  config.files.unshift(babelPolyfill);

  Object.assign(config.preprocessors, {
    [babelPolyfill]: ['webpack', 'sourcemap'],
    [polyfills]: ['webpack', 'sourcemap'],
  });
}
module.exports = addPolyFills;
