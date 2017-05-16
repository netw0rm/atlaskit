/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */
/* eslint no-unused-vars: 0 */
/* eslint prefer-object-spread/prefer-object-spread: 0 */

const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const externals = require('webpack-node-externals');

const { BITBUCKET_COMMIT } = process.env;
const cwd = process.cwd();
const pkg = require(path.join(cwd, 'package.json'));

// TODO come up with a per-package stategy to run these.
const runInRealBrowsers = [
  /editor-/,

  // TODO Visibility test fails in JSDOM.
  /util-common-test/,
];

const customLaunchers = {
  ie: {
    browser: 'ie',
    os: 'WINDOWS',
    os_version: '8.1',
    browser_version: '11',
  },
  iphone: {
    os: 'ios',
    os_version: '9.1',
    device: 'iPhone 6S',
  },
  chrome: {
    browser: 'chrome',
    os: 'WINDOWS',
    os_version: '10',
  },
  firefox: {
    browser: 'firefox',
    os: 'WINDOWS',
    os_version: '10',
  },
};

const browsers = (() => {
  if (runInRealBrowsers.some(r => r.test(pkg.name.replace('@atlaskit/', '')))) {
    if (BITBUCKET_COMMIT) {
      const temp = Object.keys(customLaunchers);
      temp.forEach(key => (customLaunchers[key].base = 'BrowserStack'));
      return temp;
    }
    return [require('karma-chrome-launcher')];
  }
  return [require('karma-jsdom-launcher')];
})();

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    cjs: false,
    umd: { global: camelcase(pkg.name) },
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
    browsers,
    frameworks: ['mocha', 'chai'],
    plugins: [require('karma-chai'), require('karma-browserstack-launcher')],

    // TODO remove this when following the default convention.
    testFiles: [
      // This is the default NWB convention.
      '+(src|test?(s))/**/*+(-test|.spec|.test).js',

      // This is our current convention.
      'test/**Spec.@(js|jsx|ts|tsx)',

      // Some follow this convention.
      '@(test|tests)/**!(_)*.@(js|jsx|ts|tsx)',

      // Some TypeScript tests follow yet another convention.
      'test/**/!(_)*.+(js|jsx|ts|tsx)',
    ],

    extra: {
      browserStack: {
        username: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_KEY,
      },
      customLaunchers,

      // Required so we don't get incorrect MIME type errors for TypeScript files.
      mime: {
        'text/x-typescript': ['ts', 'tsx'],
      },
    },
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

      externals: [externals({ modulesFromFile: true })],
      module: {
        rules: [{
          test: /\.json$/,
          use: 'json-loader',
        }, {
          test: /\.less$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              camelCase: true,
              hashPrefix: `${pkg.name}${pkg.version}`,  // Avoid hash collisions
              importLoaders: 1,
              mergeRules: false,
              modules: true,
            },
          }, {
            loader: 'less-loader',
          }],
        }, {
          test: /\.tsx?$/,
          use: [{
            loader: 'awesome-typescript-loader',
            options: {
              declaration: true,
              declarationDir: './types',
            },
          }],
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
