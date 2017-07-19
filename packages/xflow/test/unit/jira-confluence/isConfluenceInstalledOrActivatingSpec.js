import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import isConfluenceInstalledOrActivating from '../../../src/jira-confluence/isConfluenceInstalledOrActivating';
import noConfluenceResponse from './mock-data/pricingNoConfluence.json';
import activatingConfluenceResponse from './mock-data/pricingActivatingConfluence.json';
import activeConfluenceResponse from './mock-data/pricingActiveConfluence.json';

chai.use(chaiAsPromised);

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

  it('will return false if Confluence is neither active nor activating', () => {
    mockEndpointWithResponse(noConfluenceResponse);
    return assert.eventually.equal(isConfluenceInstalledOrActivating(), false);
  });

  it('will return true if Confluence is activating', () => {
    mockEndpointWithResponse(activatingConfluenceResponse);
    return assert.eventually.equal(isConfluenceInstalledOrActivating(), true);
  });

  it('will return true if Confluence is active', () => {
    mockEndpointWithResponse(activeConfluenceResponse);
    return assert.eventually.equal(isConfluenceInstalledOrActivating(), true);
  });

  it('will return reject with an error if the endpoint returns a 404', () => {
    mockEndpointWithFailureStatus(404);
    return assert.isRejected(isConfluenceInstalledOrActivating(), /404/);
  });

  it('will return reject with an error if the endpoint returns a 500', () => {
    mockEndpointWithFailureStatus(500);
    return assert.isRejected(isConfluenceInstalledOrActivating(), /500/);
  });
});
