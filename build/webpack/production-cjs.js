const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const productionConfig = require('./production.js');

productionConfig.entry = {
  'dist/bundle-cjs.js': productionConfig.entry['dist/bundle.js'],
  'dist/bundle-cjs.min.js': productionConfig.entry['dist/bundle.js'],
};

productionConfig.output.libraryTarget = 'commonjs2';

if (process.env.BITBUCKET_COMMIT) {
  // only generate stats when we are in CI
  productionConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: path.resolve('./stats/cjs.html'),
    openAnalyzer: false,
  }));
}

module.exports = productionConfig;
