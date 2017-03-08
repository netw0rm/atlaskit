/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

module.exports = {
  type: 'react-component',
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
      module: {
        rules: [
          {
            test: /\.json$/,
            use: 'json-loader',
          },
        ],
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
