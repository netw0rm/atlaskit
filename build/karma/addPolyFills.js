require('custom-event-polyfill');

function addPolyFills(config) {
  const babelPolyfill = require.resolve('babel-polyfill');
  config.files.unshift(babelPolyfill);

  Object.assign(config.preprocessors, {
    [babelPolyfill]: ['webpack', 'sourcemap'],
  });
}
module.exports = addPolyFills;
