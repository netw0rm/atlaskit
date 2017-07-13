import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import hasConfluenceBeenEvaluated from '../../../src/jira-confluence/hasConfluenceBeenEvaluated';
import inactiveConfluenceResponse from './mock-data/prospectivePricesInactiveConfluence.json';
import activatedConfluenceResponse from './mock-data/prospectivePricesActivatedConfluence.json';
import deactivatedConfluenceResponse from './mock-data/prospectivePricesDeactivatedConfluence.json';

chai.use(chaiAsPromised);

const mockEndpointWithResponse = (response) => {
  const url = '/admin/rest/billing/api/instance/prospective-prices';
  fetchMock.mock(url, response, { method: 'POST' });
};

const mockEndpointWithFailureStatus = (status) => {
  const url = '/admin/rest/billing/api/instance/prospective-prices';
  fetchMock.mock(url, status);
};

describe('hasConfluenceBeenEvaluated', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('will return false if Confluence has never been activated', () => {
    mockEndpointWithResponse(inactiveConfluenceResponse);
    return assert.eventually.equal(hasConfluenceBeenEvaluated(), false);
  });

  it('will return true if Confluence is activated', () => {
    mockEndpointWithResponse(activatedConfluenceResponse);
    return assert.eventually.equal(hasConfluenceBeenEvaluated(), true);
  });

  it('will return true if Confluence has been deactived', () => {
    mockEndpointWithResponse(deactivatedConfluenceResponse);
    return assert.eventually.equal(hasConfluenceBeenEvaluated(), true);
  });

  it('will return reject with an error if the endpoint returns a 404', () => {
    mockEndpointWithFailureStatus(404);
    return assert.isRejected(hasConfluenceBeenEvaluated(), /404/);
  });

  it('will return reject with an error if the endpoint returns a 500', () => {
    mockEndpointWithFailureStatus(500);
    return assert.isRejected(hasConfluenceBeenEvaluated(), /500/);
  });
});
