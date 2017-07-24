/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
const DEFAULT_POLLING_INTERVAL = 5000;

export const INACTIVE = 'INACTIVE';
export const ACTIVE = 'ACTIVE';
export const UNKNOWN = 'UNKNOWN';

export const PRODUCT_USAGE_URL = '/admin/rest/billing/api/instance/product-usage';

let interval = null;
let startTime = 0;

async function checkStatus() {
  const response = await fetch(PRODUCT_USAGE_URL, {
    cache: 'no-store',
    credentials: 'same-origin',
  });

  if (!(response.status >= 200 && response.status <= 299)) {
    return UNKNOWN;
  }

  const products = await response.json();
  return products.usages.some(usage => usage.productKey === 'confluence.ondemand')
    ? ACTIVE
    : INACTIVE;
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
