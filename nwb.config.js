/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */
/* eslint no-unused-vars: 0 */
/* eslint prefer-object-spread/prefer-object-spread: 0 */
/* eslint quotes: 0 */

/*

NWB TODO

- Turn off "lib" build

*/

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');

const cwd = process.cwd();
const entryPath = path.join(cwd, 'src', 'index');
const entryJs = `${entryPath}.js`;
const entryJsx = `${entryJs}x`;
const pkg = require(path.join(cwd, 'package.json'));

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: {
      global: camelcase(pkg.name),
      externals: Object.keys(Object.assign(
        {},
        pkg.dependencies,
        pkg.peerDependencies
      )).reduce((prev, curr) => {
        prev[curr] = curr;
        return prev;
      }, {}),
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

    // TODO remove this when following the default convention.
    testFiles: [
      // This is our current convention.
      'test/**Spec.jsx',

      // This is the default NWB convention.
      '@(src|test|tests)/**@(.|-)@(spec|test).js',

      // Some follow this convention.
      '@(src|test|tests)/**!(_)*.js',
    ],
  },
  webpack: {
    compat: {
      enzyme: true,
      sinon: true,
    },
    extra: {
      // Some use .js, some use .jsx. Yeah.
      entry: fs.existsSync(entryJsx) ? entryJsx : entryJs,

      module: {
        rules: [{
          test: /\.json$/,
          use: 'json-loader',
        }, {
          test: /\.less$/,
          use: [{
            loader: 'css-loader',
            options: {
              camelCase: true,
              hashPrefix: `${pkg.name}${pkg.version}`,  // Avoid hash collisions
              importLoaders: 1,
              mergeRules: false,
              modules: true,
            },
          }, 'less-loader'],
        }],
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
