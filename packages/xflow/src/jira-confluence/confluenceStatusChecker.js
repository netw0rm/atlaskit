import { ACTIVE, ACTIVATING, INACTIVE, UNKNOWN } from '../common/productProvisioningStates';
/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
const DEFAULT_POLLING_INTERVAL = 5000;
const POLLING_TIMEOUT = 300000; // 5 minutes, milliseconds;

export const PRODUCT_USAGE_URL = '/admin/rest/billing/api/instance/product-usage';
export const PRICING_URL = '/admin/rest/billing/api/instance/pricing';

let interval = null;
let startTime = 0;
let currentStatus = UNKNOWN;

async function checkInitialStatus() {
  const response = await fetch(PRICING_URL, {
    credentials: 'same-origin',
    cache: 'no-store',
  });

  if (!response.ok) {
    return UNKNOWN;
  }

  const pricing = await response.json();
  const isActive = pricing.activeProducts.some(
    product => product.productKey === 'confluence.ondemand'
  );
  const isActivating = pricing.activatingProducts.includes('confluence.ondemand');

  if (isActive) {
    return ACTIVE;
  } else if (isActivating) {
    return ACTIVATING;
  }
  return INACTIVE;
}

async function checkActivatingStatus() {
  const response = await fetch(PRODUCT_USAGE_URL, {
    cache: 'no-store',
    credentials: 'same-origin',
  });
  if (!response.ok) {
    return UNKNOWN;
  }

  const products = await response.json();
  const status = products.usages.some(usage => usage.productKey === 'confluence.ondemand')
    ? ACTIVE
    : ACTIVATING;
  return status;
}

async function updateStatus() {
  currentStatus = await (currentStatus === UNKNOWN || currentStatus === INACTIVE
    ? checkInitialStatus()
    : checkActivatingStatus());
  return currentStatus;
}

export default {
  async check() {
    return checkInitialStatus();
  },

  async start(progressHandler, pollingInterval = DEFAULT_POLLING_INTERVAL) {
    if (interval === null) {
      startTime = Date.now();

      const poll = async () => {
        const status = await updateStatus();
        const timeElapsed = Date.now() - startTime;
        const progress = status === ACTIVE ? 1 : Math.min(timeElapsed / POLLING_TIMEOUT, 1);

        if (progress === 1) {
          this.stop();
        } else {
          interval = setTimeout(poll, pollingInterval);
        }

        if (progressHandler) {
          progressHandler({
            status,
            progress,
          });
        }
      };

      await poll();
    }
  },

  stop() {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  },

  reset() {
    this.stop();
    currentStatus = UNKNOWN;
  },
};
