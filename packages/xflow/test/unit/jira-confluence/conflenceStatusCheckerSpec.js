/* eslint-disable mocha/no-skipped-tests */
import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import productUsageInactive from './mock-data/productUsageInactive.json';
import productUsageActive from './mock-data/productUsageActive.json';

import confluenceStatusChecker, {
  PRODUCT_USAGE_URL,
  ACTIVE,
  INACTIVE,
  UNKNOWN,
} from '../../../src/jira-confluence/confluenceStatusChecker';

chai.use(chaiAsPromised);

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
    const expect = 3;
    let called = 0;

    mockProductUsageEndpointWithSuccess(expect - 1);

    const result = await new Promise((resolve) => {
      const progressHandler = ({ status }) => {
        called++;
        if (called === expect) {
          resolve(status);
        }
      };

      confluenceStatusChecker.start(progressHandler, 100);
    });

    assert.equal(result, ACTIVE);
  });

  it('will invoke the progressHandler with the status and polling time', async () => {
    mockProductUsageEndpointWithSuccess(1);

    const result = await new Promise((resolve) => {
      const progressHandler = (state) => {
        resolve(state);
      };

      confluenceStatusChecker.start(progressHandler);
    });

    assert.property(result, 'status');
    assert.property(result, 'time');
    assert.isNumber(result.time, 'The time should be a number');
    assert.isString(result.status, 'The state should be a string');
    assert.equal(result.status, INACTIVE);
  });

  it('will invoke the progressHandler with the status UNKNOWN when the endpoint fails', async () => {
    mockProductUsageEndpointWithFailureStatus(500);

    const result = await new Promise((resolve) => {
      const progressHandler = (state) => {
        resolve(state);
      };

      confluenceStatusChecker.start(progressHandler);
    });

    assert.property(result, 'status');
    assert.property(result, 'time');
    assert.isNumber(result.time, 'The time should be a number');
    assert.isString(result.status, 'The state should be a string');
    assert.equal(result.status, UNKNOWN);
  });
});
