const Visualizer = require('webpack-visualizer-plugin');
const productionConfig = require('./production.js');

productionConfig.entry = {
  'dist/bundle-cjs.js': productionConfig.entry['dist/bundle.js'],
  'dist/bundle-cjs.min.js': productionConfig.entry['dist/bundle.js'],
};

productionConfig.output.libraryTarget = 'commonjs2';

if (process.env.BITBUCKET_COMMIT) {
  // only generate stats when we are in CI
  productionConfig.plugins.push(new Visualizer({
    filename: './stats/cjs.html',
  }));
}

module.exports = productionConfig;
