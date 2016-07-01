#!/usr/bin/env node
const log = require('minilog')('BrowserStack');
require('minilog').enable();

const BrowserStackTunnel = require('browserstacktunnel-wrapper');
const childProcess = require('child_process');
const tunnelIdentifier = process.env.BROWSERSTACK_TUNNEL;

const browserStackTunnel = new BrowserStackTunnel({
  key: process.env.BROWSERSTACK_KEY,
  localIdentifier: tunnelIdentifier,
});

function handleError(error) {
  if (error) {
    log.error(`tunnel ${tunnelIdentifier}: '${error}'`);
    process.exit(1);
  }
}

function tunnelStateChanged(state) {
  log.info(`tunnel ${tunnelIdentifier}: '${state}'`);
}

browserStackTunnel.start((startError) => {
  handleError(startError);
  tunnelStateChanged('started');

  // Execute BrowserStack tests via bash script
  try {
    childProcess.execFileSync(`${__dirname}/test.browserstack.sh`, {
      stdio: 'inherit',
    });
  } catch (execError) {
    handleError(execError);
  }

  // Stop the tunnel and exit successfully
  browserStackTunnel.stop((stopError) => {
    handleError(stopError);
    tunnelStateChanged('stopped');
    process.exit(0);
  });
});
