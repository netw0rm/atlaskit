const baseConfig = require('./karma.conf.browserstack.js');
const browserStackBrowsers = require('./build/lib/browserstack.browsers.master.js');
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
    customLaunchers: browserStackBrowsers,
    browsers: Object.keys(browserStackBrowsers),

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
