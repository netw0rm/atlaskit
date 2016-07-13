#!/usr/bin/env node
const log = require('minilog')('BrowserStack');
require('minilog').enable();
const tunnel = require('./browserstack-tunnel');
const childProcess = require('child_process');

if (process.argv.length < 3) {
  log.error('Please provide a package name to test');
  process.exit(1);
}
const pkgName = process.argv[2];

// Execute BrowserStack tests via bash script
const runTests = () => {
  childProcess.execFileSync(`${__dirname}/test.single.integration.browserstack.sh`, [pkgName], {
    stdio: 'inherit',
  });
};

tunnel({ runFn: runTests }).then(() => {
  process.exit(0);
}).catch(e => {
  log.error(e);
  process.exit(1);
});
