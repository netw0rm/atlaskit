#!/usr/bin/env node
const log = require('minilog')('BrowserStack');
require('minilog').enable();
const tunnel = require('./browserstack-tunnel');

const childProcess = require('child_process');

// Execute BrowserStack tests via bash script
const runTests = () => {
  childProcess.execFileSync(`${__dirname}/test.browserstack.fast.sh`, {
    stdio: 'inherit',
  });
};

tunnel({ runFn: runTests, tunnelId: process.env.BROWSERSTACK_TUNNEL }).then(() => {
  process.exit(0);
}).catch(e => {
  log.error(e);
  process.exit(1);
});
