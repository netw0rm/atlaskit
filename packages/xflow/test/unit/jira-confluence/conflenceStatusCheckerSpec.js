/* eslint-disable mocha/no-skipped-tests */
import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import productUsageInactive from './mock-data/productUsageInactive.json';
import productUsageActive from './mock-data/productUsageActive.json';

import confluenceStatusChecker, {
  PRODUCT_USAGE_URL,
} from '../../../src/jira-confluence/confluenceStatusChecker';

import {
  ACTIVE,
  ACTIVATING,
  // INACTIVE,
  UNKNOWN,
} from '../../../src/common/productProvisioningStates';

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

describe('confluenceStatusChecker', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  afterEach(() => {
    confluenceStatusChecker.stop();
  });

  it('will poll the product usage endpoint until confluence is active', async () => {
    const expectedValue = 3;
    let called = 0;

    mockProductUsageEndpointWithSuccess(expectedValue - 1);

    const result = await new Promise((resolve) => {
      const progressHandler = ({ status }) => {
        called++;
        if (called === expectedValue) {
          resolve(status);
        }
      };

      confluenceStatusChecker.start(progressHandler, 100);
    });

    expect(result).toEqual(ACTIVE);
  });

  it('will invoke the progressHandler with the status and progress', async () => {
    mockProductUsageEndpointWithSuccess(1);

    const result = await new Promise((resolve) => {
      const progressHandler = (state) => {
        resolve(state);
      };

      confluenceStatusChecker.start(progressHandler);
    });

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('progress');
    expect(result.progress).toBeGreaterThanOrEqual(0);
    expect(result.progress).toBeLessThanOrEqual(1);
    expect(result.status).toBe(ACTIVATING);
  });

  it('will invoke the progressHandler with the status UNKNOWN when the endpoint fails', async () => {
    mockProductUsageEndpointWithFailureStatus(500);

    const result = await new Promise((resolve) => {
      const progressHandler = (state) => {
        resolve(state);
      };

      confluenceStatusChecker.start(progressHandler);
    });

    expect(result).toHaveProperty('status');
    expect(result.status).toBe(UNKNOWN);
  });
});
