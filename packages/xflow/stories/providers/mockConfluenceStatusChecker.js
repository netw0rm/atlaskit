/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
const DEFAULT_POLLING_INTERVAL = 5000;
const FOUR_MINUTES = 240000; // milliseconds

export const INACTIVE = 'INACTIVE';
export const ACTIVE = 'ACTIVE';

export const PRODUCT_USAGE_URL = '/admin/rest/billing/api/instance/product-usage';

let interval = null;
let startTime = 0;

async function checkStatus() {
  return new Promise(resolve =>
    setTimeout(() => resolve(Date.now() - startTime > FOUR_MINUTES ? ACTIVE : INACTIVE), 500)
  );
}

export default {
  start(progressHandler, pollingInterval = DEFAULT_POLLING_INTERVAL) {
    if (interval === null) {
      startTime = Date.now();

      const poll = async () => {
        const status = await checkStatus();

        if (progressHandler) {
          progressHandler({
            status,
            time: Date.now() - startTime,
          });
        }

        if (status === ACTIVE) {
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
};
