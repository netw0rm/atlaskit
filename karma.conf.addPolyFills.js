const path = require('path');
function addPolyFills(config) {
  const polyfills = path.resolve(__dirname, 'node_modules', 'akutil-polyfills/src/index.js');
  config.files.unshift(polyfills);

  Object.assign(config.preprocessors, {
    [polyfills]: ['webpack', 'sourcemap'],
  });
}
module.exports = addPolyFills;
