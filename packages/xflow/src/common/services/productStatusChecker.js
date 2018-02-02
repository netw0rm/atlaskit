import 'es6-promise/auto';
import 'whatwg-fetch';
import bezier from 'cubic-bezier';
import '@atlaskit/polyfills/array-prototype-includes';

import { ACTIVE, ACTIVATING, INACTIVE, DEACTIVATED, UNKNOWN } from '../productProvisioningStates';
import { licenseInformationEndpoint } from './xflowService';
import { fetchCloudId } from './tenantContext';

const DEFAULT_POLLING_INTERVAL = 5000;
const POLLING_TIMEOUT = 300000; // 5 minutes, milliseconds;
const PROGRESS_COMPLETE_DELAY = 20000;

// Used to calculate progress from time non-linearly
const easeOutFn = bezier(0.075, 0.82, 0.165, 1.0, 1000);

export const PRODUCT_USAGE_URL = '/admin/rest/billing/api/instance/product-usage';
export const PRICING_URL = '/admin/rest/billing/api/instance/pricing';
export const PROSPECTIVE_PRICES_URL = '/admin/rest/billing/api/instance/prospective-prices';

export const JIRA_LANDING_PAGE = '/secure/LandingPage.jspa';
export const CONFLUENCE_LANDING_PAGE = '/wiki/';

const stateMap = {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
};

export async function checkJiraAvailable() {
  const response = await fetch(JIRA_LANDING_PAGE, {
    credentials: 'same-origin',
    redirect: 'follow',
  });

  // redirects may happen because of onboarding in Jira, but
  // a redirect to /wiki means that Jira is not ready yet when
  // expanding from Confluence. For the time being, this assumes its not
  // possible to expand from a non-Jira and non-Confluence product.
  return response.ok && !response.url.includes(CONFLUENCE_LANDING_PAGE);
}

export async function checkConfluenceAvailable() {
  const response = await fetch(CONFLUENCE_LANDING_PAGE, {
    credentials: 'same-origin',
    redirect: 'follow',
  });

  // if Confluence is not ready, then there will be a 404 from Jira
  // so its fine to just check if the response is ok.
  return response.ok;
}

export function getSiteAvailableCheckForProductKey(productKey) {
  switch (productKey) {
    case 'jira-software.ondemand':
    case 'jira-core.ondemand':
    case 'jira-servicedesk.ondemand':
      return checkJiraAvailable;
    case 'confluence.ondemand':
      return checkConfluenceAvailable;
    default:
      throw new Error('No implementation of isSiteAvailable for this product key');
  }
}

export async function checkLicenseInformation(productKey) {
  let response;

  try {
    response = await fetch(licenseInformationEndpoint(await fetchCloudId()), {
      credentials: 'include',
    });
  } catch (err) {
    return UNKNOWN;
  }

  if (!response.ok) {
    return UNKNOWN;
  }

  const licenseInformation = await response.json();

  return licenseInformation.products[productKey] ?
    stateMap[licenseInformation.products[productKey].state] : INACTIVE;
}

/**
 * This function will poll a specified site for a set period to check if it
 * has come up.
 * @param productKey product key being activated
 * @param checkSiteAvailable, function to be called to determine
 * whether the site for the product is ready for use. If not provided,
 * an appropriate handler will be provided based on the product key
 * @returns {*} Product checker object
 */
export default (productKey,
  checkSiteAvailable = getSiteAvailableCheckForProductKey(productKey)) => {
  let interval = null;
  let startTime = 0;
  let currentStatus = UNKNOWN;
  let productUsageLicenseReady = false;
  let xflowLicenseReady = false;

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
    if (!productUsageLicenseReady) {
      const response = await fetch(PRODUCT_USAGE_URL, {
        cache: 'no-store',
        credentials: 'same-origin',
      });
      if (!response.ok) {
        return UNKNOWN;
      }

      const products = await response.json();
      productUsageLicenseReady = products.usages.some(usage => usage.productKey === productKey);
    }

    if (productUsageLicenseReady && !xflowLicenseReady) {
      const status = await checkLicenseInformation(productKey);

      // UNKNOWN means that the endpoint returned an error
      //   If this occurs, then we cannot rely on accessing this endpoint and
      //   should  not try again.
      //   This most likely occurs due to an expired or missing cookie, and
      //   will be solved after Stargate changes to be accessible via a path,
      //   rather than a separate domain.
      //   When this changes, this UNKNOWN check can be removed, and this
      //   status checker can be updated to simply poll the license-information
      //   endpoint, without polling the the pricing endpoints.
      xflowLicenseReady = status === ACTIVE || status === UNKNOWN;
    }

    return productUsageLicenseReady && xflowLicenseReady && await checkSiteAvailable().catch(() => console.warn(`${productKey} status unable to be determined`) && false)  // eslint-disable-line no-console
      ? ACTIVE
      : ACTIVATING;
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
