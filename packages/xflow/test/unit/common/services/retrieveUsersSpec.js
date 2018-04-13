import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import retrieveUsers from '../../../../src/common/services/retrieveUsers';

import { fetchInstanceUsersEndpoint } from '../../../../src/common/services/xflowService';

import instanceUsersResponse from '../mock-data/instanceUsers.json';
import { TENANT_INFO_URL } from '../../../../src/common/services/tenantContext';

const MOCK_CLOUD_ID = 'mock-cloud-id';

describe('retrieveUsers', () => {
  beforeEach(() => {
    fetchMock.catch(417);
    fetchMock.mock(TENANT_INFO_URL, {
      cloudId: MOCK_CLOUD_ID,
    });
  });
  afterEach(fetchMock.restore);

  it('should emit empty array when no valid users are retrieved', async () => {
    fetchMock.mock(fetchInstanceUsersEndpoint(MOCK_CLOUD_ID), [], { method: 'GET' });
    const response = await retrieveUsers();
    expect(response).toEqual([]);
  });

  it('should emit array with retrieved users', async () => {
    fetchMock.mock(fetchInstanceUsersEndpoint(MOCK_CLOUD_ID), instanceUsersResponse, { method: 'GET' });
    const response = await retrieveUsers();
    expect(response).toEqual(instanceUsersResponse);
  });

  it('should throw a 500 error when the users fail to be retrieved', async () => {
    fetchMock.mock(fetchInstanceUsersEndpoint(MOCK_CLOUD_ID), 500, { method: 'GET' });
    try {
      await retrieveUsers();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to retrieve instance users. Status: 500'));
    }
  });
});
