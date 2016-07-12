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
    if (opts.tunnelId) tunnelOptions.localIdentifier = opts.tunnelId;
    browserStackTunnel.start(tunnelOptions, startError => {
      if (startError) handleError(startError);
      tunnelStateChanged('started');

      try {
        opts.runFn();
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
