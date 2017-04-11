#!/usr/bin/env node
const path = require('path');
const { execSync } = require('child_process');
const { Launcher } = require('webdriverio');
const glob = require('glob');

const ERROR_CODE = 1;
const [,, fullPackageName, port] = process.argv;
const allureBin = path.join(process.cwd(), 'node_modules/.bin/allure');
const cleanPackageName = fullPackageName.replace('@atlaskit/', '');
const pattern = `./packages/${cleanPackageName}/test/selenium/**/*.{ts,js}`;
const allureResultsDir = `allure-results/${cleanPackageName}`;
const configFile = './build/selenium/wdio.conf.browserstack.js';

// Shortcut for wdio, otherwise it will check as many times as many browsers we have in config.
if (glob.sync(pattern, { cwd: process.cwd() }).length) {
  new Launcher(configFile, {
    baseUrl: `http://localhost:${port}/${cleanPackageName}`,
    specs: [pattern],
    reporterOptions: {
      allure: { outputDir: allureResultsDir },
    },
  }).run().then((code) => {
    const reportPath = path.join(process.cwd(), allureResultsDir);

    if (code === ERROR_CODE) {
      execSync(`${allureBin} generate ./`, { cwd: reportPath });
    } else {
      execSync(`rm -rf ${reportPath}`);
    }

    process.exit(0);
  }, (error) => {
    console.error('[SELENIUM] Launcher failed to start the test', error.stacktrace); // eslint-disable-line
    process.exit(1);
  });
} else {
  console.log(`[SELENIUM] Skipping "${fullPackageName}" since it doesn't have any selenium tests`);
}
