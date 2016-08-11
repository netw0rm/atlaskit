const path = require('path');
const baseConfig = require('./karma.conf.js');
const pkgJsonPath = path.join(process.cwd(), 'package.json');
const packageName = require(pkgJsonPath).name;
const fs = require('fs');
const glob = require('glob');

function concatTests(entryFile) {
  let entryContents = '';
  glob.sync('./packages/*/test/**/*.js').forEach((testFile) => {
    entryContents += `require('${testFile}');\n`;
  });
  fs.writeFileSync(entryFile, entryContents);
}

module.exports = (config) => {
  baseConfig(config);

  const webpackAndSourcemap = ['webpack', 'sourcemap'];
  const entryFile = 'browserstack-entry.js';

  concatTests(entryFile);

  Object.assign(config, {
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY,
      startTunnel: !process.env.BROWSERSTACK_TUNNEL,
      tunnelIdentifier: process.env.BROWSERSTACK_TUNNEL || 'ak_tunnel',
      project: 'AtlasKit',
      name: packageName,
      build: `${process.env.CURRENT_BRANCH} ${new Date().getTime()} ${process.env.HEAD_SHA}`,
    },
    captureTimeout: 120000,
    reporters: ['dots'],
    autoWatch: false,
    concurrency: 5,
    client: {},

    files: [
      'packages/akutil-polyfills/src/index.js',
      entryFile,
    ],

    preprocessors: {
      'packages/akutil-polyfills/src/index.js': webpackAndSourcemap,
      [entryFile]: webpackAndSourcemap,
    },
  });

  config.webpack.module.loaders.push({
    loader: 'babel-loader',
    test: new RegExp(entryFile),
    query: {
      presets: [
        'es2015',
        'react',
        'stage-0',
      ],
    },
  });
};
