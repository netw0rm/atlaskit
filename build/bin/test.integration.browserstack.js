#!/usr/bin/env node
const log = require('minilog')('BrowserStack');
require('minilog').enable();
const tunnel = require('./browserstack-tunnel');
const childProcess = require('child_process');

// Execute BrowserStack tests via bash script
const runTests = () => {
  const subScript = '../../build/bin/test.integration.browserstack.sh';
  childProcess.execSync(`lerna exec --concurrency 1 -- bash ${subScript}`, {
    stdio: 'inherit',
    cwd: __dirname,
    env: process.env,
  });
};


tunnel({ runFn: runTests }).then(() => {
  process.exit(0);
}).catch(e => {
  log.error(e);
  process.exit(1);
});
