const log = require('minilog')('BrowserStack');
require('minilog').enable();
const BrowserStackTunnel = require('browserstacktunnel-wrapper');

module.exports = function runWithTunnel(tunnelId, runFn) {
  return new Promise((resolve, reject) => {
    const browserStackTunnel = new BrowserStackTunnel({
      key: process.env.BROWSERSTACK_KEY,
      localIdentifier: tunnelId,
    });

    function handleError(errorMsg) {
      log.error(`tunnel ${tunnelId}: '${errorMsg}'`);
      browserStackTunnel.stop();
      reject(errorMsg);
    }

    function tunnelStateChanged(newTunnelState) {
      log.info(`tunnel ${tunnelId}: '${newTunnelState}'`);
    }

    browserStackTunnel.start(startError => {
      if (startError) handleError(startError);
      tunnelStateChanged('started');

      try {
        runFn();
      } catch (execError) {
        handleError(execError);
      }

      // Stop the tunnel and exit successfully
      browserStackTunnel.stop(() => {
        tunnelStateChanged('stopped');
        resolve();
      });
    });
  });
};
