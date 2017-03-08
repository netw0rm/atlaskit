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

    // TODO remove this when following the default covention.
    testFiles: [
      // This is our current convention.
      'test/**Spec.jsx',

      // This is the default NWB convention.
      '@(src|test|tests)/**@(.|-)@(spec|test).js',
    ],
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
          }, {
            test: /\.less$/,
            use: [
              { loader: 'css-loader', options: { modules: true } },
              'less-loader',
            ],
          },
        ],
      },

      // TODO remove this when not using .jsx anymore.
      resolve: {
        extensions: ['.js', '.json', '.jsx'],
      },

      // TODO remove this when going back to using the -loader suffix.
      resolveLoader: {
        moduleExtensions: ['-loader'],
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
