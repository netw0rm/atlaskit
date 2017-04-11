#!/usr/bin/env node
const { Launcher } = require('webdriverio');

const [,, fullPackageName] = process.argv;
const cleanPackageName = fullPackageName.replace('@atlaskit/', '');
const pattern = `./packages/${cleanPackageName}/test/selenium/**/*.{ts,js}`;
const configFile = './build/selenium/wdio.conf.local.js';

new Launcher(configFile, {
  specs: [pattern],
}).run().then(
  code => process.exit(code),
  (error) => {
    console.error('[SELENIUM] Launcher failed to start the test', error.stacktrace); // eslint-disable-line
    process.exit(1);
  }
);
