const Visualizer = require('webpack-visualizer-plugin');
const productionConfig = require('./production.js');

productionConfig.entry = {
  'dist/bundle-cjs.js': productionConfig.entry['dist/bundle.js'],
  'dist/bundle-cjs.min.js': productionConfig.entry['dist/bundle.js'],
};

productionConfig.output.libraryTarget = 'commonjs2';

productionConfig.plugins.push(new Visualizer({
  filename: './stats/cjs.html',
}));

module.exports = productionConfig;
