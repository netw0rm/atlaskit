const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));
const standardConfig = require('./webpack.config.development.js');

standardConfig.entry['demo.js'] = './demo/index.js';
standardConfig.entry['polyfills.js'] = require.resolve('akutil-polyfills');
standardConfig.plugins = [
  new HtmlWebpackPlugin({
    title: `${pkg.name} - Demo`,
    template: './demo/index.ejs',
  }),
];

module.exports = standardConfig;
