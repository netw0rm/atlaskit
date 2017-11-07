import 'es6-promise/auto';
import 'whatwg-fetch';
import bezier from 'cubic-bezier';

import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN } from './productProvisioningStates';

const DEFAULT_POLLING_INTERVAL = 5000;
const POLLING_TIMEOUT = 300000; // 5 minutes, milliseconds;
const PROGRESS_COMPLETE_DELAY = 20000;

// Used to calculate progress from time non-linearly
const easeOutFn = bezier(0.075, 0.82, 0.165, 1.0, 1000);

export const PRODUCT_USAGE_URL = '/admin/rest/billing/api/instance/product-usage';
export const PRICING_URL = '/admin/rest/billing/api/instance/pricing';
export const PROSPECTIVE_PRICES_URL = '/admin/rest/billing/api/instance/prospective-prices';

/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 * @param productKey product key being activated
 * @returns {*} Product checker object
 */
export default productKey => {
  let interval = null;
  let startTime = 0;
  let currentStatus = UNKNOWN;

  async function hasProductBeenEvaluated() {
    const response = await fetch(PROSPECTIVE_PRICES_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
      body: JSON.stringify({
        productKeys: [productKey],
      }),
    });

    if (!response.ok) {
      return UNKNOWN;
    }

    const prospectivePrices = await response.json();

    const isDeactivated = prospectivePrices.deactivatedProducts.some(
      product => product.productKey === productKey
    );

    const status = isDeactivated ? DEACTIVATED : INACTIVE;
    return status;
  }

  async function isProductActive() {
    const response = await fetch(PRICING_URL, {
      credentials: 'same-origin',
      cache: 'no-store',
    });

    if (!response.ok) {
      return UNKNOWN;
    }

    const pricing = await response.json();

    const isActive = pricing.activeProducts.some(product => product.productKey === productKey);
    const isActivating = pricing.activatingProducts.includes(productKey);

    if (isActivating) {
      return ACTIVATING;
    } else if (isActive) {
      return ACTIVE;
    }
    return INACTIVE;
  }

  async function checkInitialStatus() {
    const status = await isProductActive();
    return status === INACTIVE ? await hasProductBeenEvaluated() : status;
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
    const status = products.usages.some(usage => usage.productKey === productKey)
      ? ACTIVE
      : ACTIVATING;
    return status;
  }

  async function updateStatus() {
    currentStatus = await ([UNKNOWN, INACTIVE, DEACTIVATED].includes(currentStatus)
      ? checkInitialStatus()
      : checkActivatingStatus());
    return currentStatus;
  }

  return {
    async check() {
      return checkInitialStatus();
    },

    async start(progressHandler, pollingInterval = DEFAULT_POLLING_INTERVAL) {
      if (interval === null) {
        startTime = Date.now();

        const poll = async () => {
          const status = await updateStatus();
          const timeElapsed = Date.now() - startTime;
          const progress =
            status === ACTIVE ? 1 : easeOutFn(Math.min(timeElapsed / POLLING_TIMEOUT, 1));

          if (progress === 1) {
            setTimeout(() => this.stop(), PROGRESS_COMPLETE_DELAY);
          } else {
            interval = setTimeout(poll, pollingInterval);
          }

          if (progressHandler) {
            await progressHandler({
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
};
