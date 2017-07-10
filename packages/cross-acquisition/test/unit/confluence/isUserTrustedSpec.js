import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import isUserTrusted from '../../../src/confluence/isUserTrusted';
import jiraAdminResponse from './mock-data/isUserTrustedJiraAdmin.json';
import nonAdminResponse from './mock-data/isUserTrustedNonAdmin.json';
import siteAdminResponse from './mock-data/isUserTrustedSiteAdmin.json';

const TEST_USERNAME = 'admin%40acme.org';
chai.use(chaiAsPromised);

const mockEndpointWithResponse = (response) => {
  const url = `/rest/api/latest/user?expand=groups&username=${encodeURIComponent(TEST_USERNAME)}`;
  fetchMock.mock(url, response, { method: 'GET' });
};

const mockEndpointWithFailureStatus = (status) => {
  const url = `/rest/api/latest/user?expand=groups&username=${encodeURIComponent(TEST_USERNAME)}`;
  fetchMock.mock(url, status);
};

describe('isCurrentUserTrusted', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('will return false if they are only a JIRA administrator', () => {
    mockEndpointWithResponse(jiraAdminResponse);
    return assert.eventually.equal(isUserTrusted(TEST_USERNAME), false);
  });

  it('will return false if they are a non-administrator', () => {
    mockEndpointWithResponse(nonAdminResponse);
    return assert.eventually.equal(isUserTrusted(TEST_USERNAME), false);
  });

  it('will return true if they are a site administrator', () => {
    mockEndpointWithResponse(siteAdminResponse);
    return assert.eventually.equal(isUserTrusted(TEST_USERNAME), true);
  });

  it('will return reject with an error if the endpoint returns a 404', () => {
    mockEndpointWithFailureStatus(404);
    return assert.isRejected(isUserTrusted(TEST_USERNAME), /404/);
  });

  it('will return reject with an error if the endpoint returns a 500', () => {
    mockEndpointWithFailureStatus(500);
    return assert.isRejected(isUserTrusted(TEST_USERNAME), /500/);
  });
});
