import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import retrieveAdminIds from '../../../../src/common/services/retrieveAdminIds';

import { fetchInstanceAdminsEndpoint } from '../../../../src/common/services/xflowService';
import { TENANT_INFO_URL } from '../../../../src/common/services/tenantContext';

import adminIdsResponse from '../mock-data/adminIds.json';

const MOCK_CLOUD_ID = 'mock-cloud-id';

describe('retrieveAdminIds', () => {
  beforeEach(() => {
    fetchMock.catch(417);
    fetchMock.mock(TENANT_INFO_URL, {
      cloudId: MOCK_CLOUD_ID,
    });
  });
  afterEach(fetchMock.restore);

  it('should emit empty array when no valid admin ids are retrieved', async () => {
    fetchMock.mock(fetchInstanceAdminsEndpoint(MOCK_CLOUD_ID), [], { method: 'GET' });
    const response = await retrieveAdminIds();
    expect(response).toEqual([]);
  });

  it('should emit an array with retrieved admin ids', async () => {
    fetchMock.mock(fetchInstanceAdminsEndpoint(MOCK_CLOUD_ID), adminIdsResponse, { method: 'GET' });
    const response = await retrieveAdminIds();
    expect(response).toEqual(adminIdsResponse);
  });

  it('should throw a 500 error when the admin ids fail to be retrieved', async () => {
    fetchMock.mock(fetchInstanceAdminsEndpoint(MOCK_CLOUD_ID), 500, { method: 'GET' });
    try {
      await retrieveAdminIds();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to retrieve instance admins. Status: 500'));
    }
  });
});
