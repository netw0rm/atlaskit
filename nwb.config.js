/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */
/* eslint no-unused-vars: 0 */
/* eslint prefer-object-spread/prefer-object-spread: 0 */

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');

const cwd = process.cwd();
const pkg = require(path.join(cwd, 'package.json'));

const runInRealBrowsers = [/^editor-/];

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    cjs: false,
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
    presets: [
      'es2015',
      'react',
      'stage-0',
    ],
    plugins: [
      'transform-class-properties',
      'transform-flow-strip-types',
      'transform-runtime',
    ],
  },
  karma: {
    browsers: runInRealBrowsers.some(r => r.test(pkg.name.replace('@altaskit/', ''))) ? [
      require('karma-chrome-launcher'),
    ] : [
      require('karma-jsdom-launcher'),
    ],
    frameworks: ['mocha', 'chai'],
    plugins: [require('karma-chai')],

    // TODO remove this when following the default convention.
    testFiles: [
      // This is our current convention.
      'test/**Spec.@(js|jsx|ts|tsx)',

      // This is the default NWB convention.
      '@(src|test|tests)/**@(.|-)@(spec|test).js',

      // Some follow this convention.
      '@(test|tests)/**!(_)*.@(js|jsx|ts|tsx)',

      // Some TypeScript tests follow yet another convention.
      'test/**/!(_)*.+(js|jsx|ts|tsx)',
    ],
  },
  webpack: {
    compat: {
      enzyme: true,
      sinon: true,
    },
    extra: {
      // The .(t|j)sx extensions are there because that's how we distinguished
      // between Web Component and React JSX pragmas.
      entry: ['index.js', 'index.jsx', 'index.ts', 'index.tsx']
        .map(p => path.join(cwd, 'src', p)).filter(fs.existsSync)[0],

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
        }, {
          test: /\.tsx?$/,
          use: 'ts-loader',
        }],
      },

      // TODO remove this when not using .jsx anymore.
      resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
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

  uglify: false,
};
