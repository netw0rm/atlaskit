const path = require('path');
const baseConfig = require('./karma.conf.js');
const pkgJsonPath = path.join(process.cwd(), 'package.json');
const packageName = require(pkgJsonPath).name;
const fs = require('fs');
const glob = require('glob');

function concatTests(entryFile) {
  let entryContents = '';
  const testFiles = glob.sync('./packages/*/test/**/*.js');
  testFiles.unshift('./packages/akutil-polyfills/src/index.js');
  testFiles.forEach(testFile => {
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

    files: [entryFile],
    preprocessors: {
      [entryFile]: webpackAndSourcemap,
    },
  });

  config.webpack.module.loaders.push({
    loader: 'babel-loader',
    test: path.resolve(__dirname, entryFile),
    query: {
      presets: [
        'es2015',
      ],
    },
  });

  console.log(config);
};
