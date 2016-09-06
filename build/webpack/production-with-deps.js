const productionConfig = require('./production.js');

delete productionConfig.externals;

productionConfig.entry = {
  'dist/bundle-with-deps.js': productionConfig.entry['dist/bundle.js'],
  'dist/bundle-with-deps.min.js': productionConfig.entry['dist/bundle.js'],
};

module.exports = productionConfig;
