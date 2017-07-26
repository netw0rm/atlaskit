import { ACTIVE, INACTIVE, UNKNOWN } from '../common/productProvisioningStates';
/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
const DEFAULT_POLLING_INTERVAL = 5000;

export const PRODUCT_USAGE_URL = '/admin/rest/billing/api/instance/product-usage';

const POLLING_TIMEOUT = 300000; // milliseconds;

let interval = null;
let startTime = 0;

async function checkStatus() {
  const response = await fetch(PRODUCT_USAGE_URL, {
    cache: 'no-store',
    credentials: 'same-origin',
  });

  if (!response.ok) {
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
};
