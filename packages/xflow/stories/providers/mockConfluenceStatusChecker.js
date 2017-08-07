import {
  ACTIVE,
  // ACTIVATING,
  INACTIVE,
  // DEACTIVATED,
  // UNKNOWN
} from '../../src/common/productProvisioningStates';
/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
const DEFAULT_POLLING_INTERVAL = 5000;
const MOCK_ACTIVATION_TIME = 30000; // milliseconds

const POLLING_TIMEOUT = 300000; // milliseconds;

let interval = null;
let startTime = 0;

async function checkStatus() {
  return new Promise(resolve =>
    setTimeout(
      () => resolve(Date.now() - startTime > MOCK_ACTIVATION_TIME ? ACTIVE : INACTIVE),
      500
    )
  );
}

export default initialState => ({
  async check() {
    return initialState;
  },

  start(progressHandler, pollingInterval = DEFAULT_POLLING_INTERVAL) {
    if (interval === null) {
      startTime = Date.now();

      const poll = async () => {
        const status = await checkStatus();
        const timeElapsed = Date.now() - startTime;
        const progress = status === ACTIVE ? 1 : Math.min(timeElapsed / POLLING_TIMEOUT, 1);
        if (progressHandler) {
          progressHandler({
            status,
            progress,
          });
        }

        if (progress === 1) {
          this.stop();
        }
      };

      interval = setInterval(poll, pollingInterval);
      poll();
    }
  },

  stop() {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  },
});
