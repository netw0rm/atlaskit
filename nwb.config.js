/* eslint import/no-dynamic-require: 0 */

const ucc = require('uppercamelcase');
const path = require('path');

const { name } = require(path.join(process.cwd(), 'package.json'));
const globalName = ucc(name);

module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: {
      global: globalName,
    },
  },
  babel: {
    plugins: [
      'transform-flow-strip-types',
      ['transform-react-jsx', { pragma: 'h' }],
    ],
  },
};
