import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import isConfluenceInstalledOrActivating from '../../../src/jira-confluence/isConfluenceInstalledOrActivating';
import noConfluenceResponse from './mock-data/pricingNoConfluence.json';
import activatingConfluenceResponse from './mock-data/pricingActivatingConfluence.json';
import activeConfluenceResponse from './mock-data/pricingActiveConfluence.json';

import { ACTIVE, ACTIVATING, INACTIVE } from '../../../src/common/productProvisioningStates';

const mockEndpointWithResponse = (response) => {
  const url = '/admin/rest/billing/api/instance/pricing';
  fetchMock.mock(url, response, { method: 'GET' });
};

const mockEndpointWithFailureStatus = (status) => {
  const url = '/admin/rest/billing/api/instance/pricing';
  fetchMock.mock(url, status);
};

describe('isConfluenceInstalledOrActivating', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('will return false if Confluence is neither active nor activating', async () => {
    mockEndpointWithResponse(noConfluenceResponse);
    const result = await isConfluenceInstalledOrActivating();
    expect(result).toBe(INACTIVE);
  });

  it('will return true if Confluence is activating', async () => {
    mockEndpointWithResponse(activatingConfluenceResponse);
    const result = await isConfluenceInstalledOrActivating();
    expect(result).toBe(ACTIVATING);
  });

  it('will return true if Confluence is active', async () => {
    mockEndpointWithResponse(activeConfluenceResponse);
    const result = await isConfluenceInstalledOrActivating();
    expect(result).toBe(ACTIVE);
  });

  it('will return reject with an error if the endpoint returns a 404', async () => {
    mockEndpointWithFailureStatus(404);
    let err;

    try {
      await isConfluenceInstalledOrActivating();
    } catch (e) {
      err = e;
    }

    expect(err.message).toMatch(/404/);
  });

  it('will return reject with an error if the endpoint returns a 500', async () => {
    mockEndpointWithFailureStatus(500);
    let err;

    try {
      await isConfluenceInstalledOrActivating();
    } catch (e) {
      err = e;
    }

    expect(err.message).toMatch(/500/);
  });
});
