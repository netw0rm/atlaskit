/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

const ucc = require('uppercamelcase');
const path = require('path');

const { name: localPackageName } = require(path.join(process.cwd(), 'package.json'));
const { name: mainPackageName } = require('./package.json');

const globalName = `${ucc(mainPackageName)}${ucc(localPackageName)}`;

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: globalName,
    },
  },
  babel: {
    plugins: [
      'transform-flow-strip-types',
    ],
  },
  karma: {
    browsers: [require('karma-jsdom-launcher')],
    frameworks: ['mocha', 'chai'],
    plugins: [require('karma-chai')],
  },
  webpack: {
    compat: {
      enzyme: true,
      sinon: true,
    },
    extra: {
      resolve: {
        // TODO revisit when done converting to NWB.
        extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx', '.ts', '.tsx'],
        // TODO remove once everything is converted to NWB.
        mainFields: ['ak:webpack:raw', 'module', 'main', 'webpack'],
      },
    },
    // TODO remove once NWB is fully integrated.
    rules: {
      babel: {
        test: /\.jsx?/,
      },
    },
  },
};
