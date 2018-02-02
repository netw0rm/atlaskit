import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import '@atlaskit/polyfills/array-prototype-includes';

import * as tenantContext from '../../../../src/common/services/tenantContext';
import { licenseInformationEndpoint } from '../../../../src/common/services/xflowService';

import productUsageInactive from '../mock-data/productUsageInactive.json';
import productUsageActive from '../mock-data/productUsageActive.json';

import pricingInactive from '../mock-data/pricingInactiveConfluence.json';
import pricingActivating from '../mock-data/pricingActivatingConfluence.json';
import pricingActive from '../mock-data/pricingActiveConfluence.json';

import prospectivePricesInactive from '../mock-data/prospectivePricesInactiveConfluence.json';
import prospectivePricesDeactivated from '../mock-data/prospectivePricesDeactivatedConfluence.json';

import licenseInformationActive from '../mock-data/licenseInformationActiveConfluence.json';

import productStatusChecker, {
  PRODUCT_USAGE_URL,
  PRICING_URL,
  PROSPECTIVE_PRICES_URL,
  CONFLUENCE_LANDING_PAGE,
  JIRA_LANDING_PAGE,
  checkConfluenceAvailable,
  checkJiraAvailable,
  getSiteAvailableCheckForProductKey,
} from '../../../../src/common/services/productStatusChecker';

import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
} from '../../../../src/common/productProvisioningStates';

jest.useFakeTimers();

const MOCK_CLOUD_ID = 'some-cloud-id';

const mockPricingEndpointWithResponse = (response) => {
  const url = PRICING_URL;
  fetchMock.mock(url, response, { method: 'GET' });
};

const mockPricingEndpointWithFailureStatus = (status) => {
  const url = PRICING_URL;
  fetchMock.mock(url, status);
};

const mockProductUsageEndpointWithSuccess = (inactiveResponseCount = Infinity) => {
  let count = 0;
  fetchMock.get(PRODUCT_USAGE_URL, (url, options) => {
    if (['same-origin', 'include'].includes(options.credentials)) {
      return count++ < inactiveResponseCount ? productUsageInactive : productUsageActive;
    }
    return 401;
  });
};

const mockProductUsageEndpointWithFailureStatus = (status) => {
  fetchMock.mock(PRODUCT_USAGE_URL, status);
};

const mockProspectivePricesEndpointWithResponse = (response) => {
  fetchMock.mock(PROSPECTIVE_PRICES_URL, response, { method: 'POST' });
};

const mockProspectivePricesEndpointWithFailureStatus = (status) => {
  fetchMock.mock(PROSPECTIVE_PRICES_URL, status);
};

const mockLicenseInformationEndpointWithResponse = (response) => {
  fetchMock.mock(licenseInformationEndpoint(MOCK_CLOUD_ID), response, { method: 'GET' });
};

const toBeNumberInRange = (min, max) => ({
  asymmetricMatch: actual => typeof actual === 'number' && actual >= min && actual <= max,
});

const toBeOneOf = (...values) => ({
  asymmetricMatch: actual => values.includes(actual),
});

const mockCheckSiteAvailable = (requiredChecksToComplete) => {
  let count = requiredChecksToComplete;
  return async () => {
    count--;
    return count < 1;
  };
};

const mockConfluenceLandingPageWithResponse = (response) => {
  fetchMock.mock(CONFLUENCE_LANDING_PAGE, response);
};

const mockJiraLandingPageWithResponse = (response) => {
  fetchMock.mock(JIRA_LANDING_PAGE, response);
};

describe('productStatusChecker', () => {
  let confluenceStatusChecker;

  beforeEach(() => {
    tenantContext.fetchCloudId = jest.fn().mockReturnValue(Promise.resolve(MOCK_CLOUD_ID));
    fetchMock.catch(417);
  });
  afterEach(fetchMock.restore);

  beforeEach(() => {
    jest.clearAllTimers();

    confluenceStatusChecker = productStatusChecker('confluence.ondemand', mockCheckSiteAvailable(3));
  });

  afterEach(() => {
    confluenceStatusChecker.reset();
  });

  describe('polling', () => {
    it('will poll the product usage endpoint until confluence is active', async () => {
      mockPricingEndpointWithResponse(pricingActivating);
      mockProductUsageEndpointWithSuccess(5);
      mockLicenseInformationEndpointWithResponse(licenseInformationActive);

      const progressHandler = jest.fn();
      const result = await new Promise(async (resolve) => {
        progressHandler.mockImplementation(({ status }) => {
          if (status === ACTIVE) {
            resolve(status);
          }
          jest.runAllTimers();
        });

        await confluenceStatusChecker.start(progressHandler);
        jest.runAllTimers();
      });

      expect(result).toEqual(ACTIVE);
      expect(progressHandler).toHaveBeenCalledWith(
        expect.objectContaining({ progress: toBeNumberInRange(0, 1), status: ACTIVATING })
      );
      expect(progressHandler).toHaveBeenLastCalledWith({ progress: 1, status: ACTIVE });
      expect(progressHandler).toHaveBeenCalledTimes(9);
    });

    it('will invoke the progressHandler with the status and progress', async () => {
      mockPricingEndpointWithResponse(pricingInactive);
      mockProductUsageEndpointWithSuccess(1);
      mockProspectivePricesEndpointWithResponse(prospectivePricesInactive);

      const result = await new Promise(async (resolve) => {
        const progressHandler = (state) => {
          resolve(state);
        };

        await confluenceStatusChecker.start(progressHandler);
      });

      expect(result).toEqual(
        expect.objectContaining({
          progress: toBeNumberInRange(0, 1),
          status: INACTIVE,
        })
      );
    });

    it('will invoke the progressHandler with the status UNKNOWN when the product usage endpoint fails', async () => {
      mockPricingEndpointWithResponse(pricingActivating);
      mockProductUsageEndpointWithFailureStatus(500);

      const progressHandler = jest.fn();
      const result = await new Promise(async (resolve) => {
        progressHandler.mockImplementation(({ status }) => {
          if (status === UNKNOWN) {
            resolve(status);
          }
        });

        await confluenceStatusChecker.start(progressHandler);
        jest.runAllTimers();
      });

      expect(result).toEqual(UNKNOWN);
      expect(progressHandler).toHaveBeenCalledWith(
        expect.objectContaining({ progress: toBeNumberInRange(0, 1), status: ACTIVATING })
      );
      expect(progressHandler).toHaveBeenLastCalledWith({
        progress: toBeNumberInRange(0, 1),
        status: UNKNOWN,
      });
    });

    it('will invoke the progressHandler with the status UNKNOWN when the pricing endpoint fails', async () => {
      mockPricingEndpointWithFailureStatus(500);
      mockProductUsageEndpointWithFailureStatus(500);
      mockProspectivePricesEndpointWithFailureStatus(500);

      const progressHandler = jest.fn();
      const result = await new Promise(async (resolve) => {
        progressHandler.mockImplementation(({ status }) => {
          if (status === UNKNOWN) {
            resolve(status);
          }
        });

        await confluenceStatusChecker.start(progressHandler);
        jest.runAllTimers();
      });

      expect(result).toEqual(UNKNOWN);
      expect(progressHandler).not.toHaveBeenCalledWith(
        expect.objectContaining({
          progress: toBeNumberInRange(0, 1),
          status: toBeOneOf(ACTIVE, ACTIVATING, INACTIVE),
        })
      );
      expect(progressHandler).toHaveBeenCalledTimes(1);
      expect(progressHandler).toHaveBeenLastCalledWith({
        progress: toBeNumberInRange(0, 1),
        status: UNKNOWN,
      });
    });
  });

  describe('manual check', () => {
    it('will return INACTIVE if Confluence is neither active nor activating', async () => {
      mockPricingEndpointWithResponse(pricingInactive);
      mockProspectivePricesEndpointWithResponse(prospectivePricesInactive);

      const result = await confluenceStatusChecker.check();
      expect(result).toBe(INACTIVE);
    });

    it('will return DEACTIVATED if Confluence is neither active nor activating, but has been activated previously', async () => {
      mockPricingEndpointWithResponse(pricingInactive);
      mockProspectivePricesEndpointWithResponse(prospectivePricesDeactivated);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(DEACTIVATED);
    });

    it('will return ACTIVATING if Confluence is activating', async () => {
      mockPricingEndpointWithResponse(pricingActivating);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(ACTIVATING);
    });

    it('will return ACTIVE if Confluence is active', async () => {
      mockPricingEndpointWithResponse(pricingActive);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(ACTIVE);
    });

    it('will return UNKNOWN if the pricing endpoint returns a 404', async () => {
      mockPricingEndpointWithFailureStatus(404);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(UNKNOWN);
    });

    it('will return UNKNOWN if the pricing endpoint returns a 500', async () => {
      mockPricingEndpointWithFailureStatus(500);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(UNKNOWN);
    });
  });

  describe('Jira site availability check', () => {
    it('will return true when Jira site is available', async () => {
      mockJiraLandingPageWithResponse(200);

      const result = await checkJiraAvailable();
      expect(result).toBe(true);
    });

    it('will return true when Jira site was redirected, but to an onboarding inside Jira', async () => {
      mockJiraLandingPageWithResponse({
        __redirectUrl: 'https://myjira.atlassian.net/onboarding/software',
      });

      const result = await checkJiraAvailable();
      expect(result).toBe(true);
    });

    it('will return false when Jira site was redirected to Confluence - the site is not ready yet', async () => {
      mockJiraLandingPageWithResponse({
        __redirectUrl: 'https://myjira.atlassian.net/wiki/',
      });

      const result = await checkJiraAvailable();
      expect(result).toBe(false);
    });
  });

  describe('Confluence site availability check', () => {
    it('will return true when Confluence site is available', async () => {
      mockConfluenceLandingPageWithResponse(200);

      const result = await checkConfluenceAvailable();
      expect(result).toBe(true);
    });

    it('will return true when Confluence site was redirected, but to an onboarding inside Confluence', async () => {
      mockConfluenceLandingPageWithResponse({
        __redirectUrl: 'https://myjira.atlassian.net/wiki/welcome.action',
      });

      const result = await checkConfluenceAvailable();
      expect(result).toBe(true);
    });
  });

  describe('getSiteAvailableCheckForProductKey', () => {
    it('will return checkJiraAvailable for Jira Service Desk', async () => {
      const result = getSiteAvailableCheckForProductKey('jira-servicedesk.ondemand');
      expect(result).toBe(checkJiraAvailable);
    });

    it('will return checkJiraAvailable for Jira Core', async () => {
      const result = getSiteAvailableCheckForProductKey('jira-core.ondemand');
      expect(result).toBe(checkJiraAvailable);
    });

    it('will return checkJiraAvailable for Jira Software', async () => {
      const result = getSiteAvailableCheckForProductKey('jira-software.ondemand');
      expect(result).toBe(checkJiraAvailable);
    });

    it('will return checkConfluenceAvailable for Confluence', async () => {
      const result = getSiteAvailableCheckForProductKey('confluence.ondemand');
      expect(result).toBe(checkConfluenceAvailable);
    });

    it('will throw for a non defined product key', async () => {
      expect(() => {
        getSiteAvailableCheckForProductKey('doesntexist.ondemand');
      }).toThrow();
    });
  });
});
