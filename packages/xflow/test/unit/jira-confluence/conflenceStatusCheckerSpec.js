import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import productUsageInactive from './mock-data/productUsageInactive.json';
import productUsageActive from './mock-data/productUsageActive.json';

import inactiveConfluenceResponse from './mock-data/pricingInactiveConfluence.json';
import activatingConfluenceResponse from './mock-data/pricingActivatingConfluence.json';
import activeConfluenceResponse from './mock-data/pricingActiveConfluence.json';

import confluenceStatusChecker, {
  PRODUCT_USAGE_URL,
  PRICING_URL,
} from '../../../src/jira-confluence/confluenceStatusChecker';

import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  UNKNOWN,
} from '../../../src/common/productProvisioningStates';

jest.useFakeTimers();

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

const toBeNumberInRange = (min, max) => ({
  asymmetricMatch: actual => typeof actual === 'number' && actual >= min && actual <= max,
});

const toBeOneOf = (...values) => ({
  asymmetricMatch: actual => values.includes(actual),
});

describe('confluenceStatusChecker', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  afterEach(() => {
    confluenceStatusChecker.reset();
  });

  describe('polling', () => {
    it('will poll the product usage endpoint until confluence is active', async () => {
      mockPricingEndpointWithResponse(activatingConfluenceResponse);
      mockProductUsageEndpointWithSuccess(5);

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
    });

    it('will invoke the progressHandler with the status and progress', async () => {
      mockPricingEndpointWithResponse(inactiveConfluenceResponse);
      mockProductUsageEndpointWithSuccess(1);

      const result = await new Promise(async (resolve) => {
        const progressHandler = (state) => {
          resolve(state);
        };

        await confluenceStatusChecker.start(progressHandler);
        jest.runAllTimers();
      });

      expect(result).toEqual(
        expect.objectContaining({
          progress: toBeNumberInRange(0, 1),
          status: INACTIVE,
        })
      );
    });

    it('will invoke the progressHandler with the status UNKNOWN when the product usage endpoint fails', async () => {
      mockPricingEndpointWithResponse(activatingConfluenceResponse);
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
      mockPricingEndpointWithResponse(inactiveConfluenceResponse);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(INACTIVE);
    });

    it('will return ACTIVATING if Confluence is activating', async () => {
      mockPricingEndpointWithResponse(activatingConfluenceResponse);
      const result = await confluenceStatusChecker.check();
      expect(result).toBe(ACTIVATING);
    });

    it('will return ÅCTIVE if Confluence is active', async () => {
      mockPricingEndpointWithResponse(activeConfluenceResponse);
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
});
