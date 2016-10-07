const log = require('minilog')('BrowserStack');
require('minilog').enable();
const browserstack = require('browserstack-local');

module.exports = function runWithTunnel(opts) {
  return new Promise((resolve, reject) => {
    function handleError(errorMsg) {
      log.error(`BrowserStack tunnel: '${errorMsg}'`);
      reject(errorMsg.toString());
    }

    function tunnelStateChanged(newTunnelState) {
      log.info(`BrowserStack tunnel: '${newTunnelState}'`);
    }

    const browserStackTunnel = new browserstack.Local();
    const tunnelOptions = {
      key: process.env.BROWSERSTACK_KEY,
      forcelocal: true,
      force: true,
    };

    if (process.env.BITBUCKET_COMMIT) {
      tunnelOptions.binarypath = '/BrowserStackLocal';
      log.info(`We are in CI and have a pre-downloaded binary: "${tunnelOptions.binarypath}"`);
    }

    if (opts.tunnelId) tunnelOptions.localIdentifier = opts.tunnelId;
    browserStackTunnel.start(tunnelOptions, startError => {
      if (startError) {
        handleError(startError);
        return;
      }
      tunnelStateChanged('started');

      try {
        opts.runFn();
      } catch (execError) {
        handleError(execError);
        return;
      }

      // Stop the tunnel and exit successfully
      browserStackTunnel.stop(() => {
        tunnelStateChanged('stopped');
        resolve();
      });
    });
  });
};
