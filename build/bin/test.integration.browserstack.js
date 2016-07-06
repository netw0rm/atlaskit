#!/usr/bin/env node
const log = require('minilog')('BrowserStack');
require('minilog').enable();
const tunnel = require('./browserstack-tunnel');
const childProcess = require('child_process');

const tunnelIdentifier = process.env.BROWSERSTACK_TUNNEL || 'protractor_all_tunnel';

// Execute BrowserStack tests via bash script
const runTests = () => {
  // Need to extend env vars here to avoid node_modules errros inside shell script
  const baseEnvVars = Object.assign({}, process.env, {
    BROWSERSTACK_TUNNEL: tunnelIdentifier,
  });

  const subScript = '../../build/bin/test.integration.browserstack.sh';
  childProcess.execSync(`lerna exec --concurrency 1 -- bash ${subScript}`, {
    stdio: 'inherit',
    cwd: __dirname,
    env: baseEnvVars,
  });
};

tunnel(tunnelIdentifier, runTests).then(() => {
  process.exit(0);
}).catch(e => {
  log.error(e);
  process.exit(1);
});
