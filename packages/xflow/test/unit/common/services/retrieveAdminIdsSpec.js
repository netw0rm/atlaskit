import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import retrieveAdminIds from '../../../../src/common/services/retrieveAdminIds';

import { fetchInstanceAdminsEndpoint } from '../../../../src/common/services/xflowService';

import adminIdsResponse from '../mock-data/adminIds.json';

describe('retrieveAdminIds', () => {
  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  it('should emit empty array when no valid admin ids are retrieved', async () => {
    fetchMock.mock(fetchInstanceAdminsEndpoint, [], { method: 'GET' });
    const response = await retrieveAdminIds();
    expect(response).toEqual([]);
  });

  it('should emit an array with retrieved admin ids', async () => {
    fetchMock.mock(fetchInstanceAdminsEndpoint, adminIdsResponse, { method: 'GET' });
    const response = await retrieveAdminIds();
    expect(response).toEqual(adminIdsResponse);
  });

  it('should emit fetchUsersFailure action with expected payload when the admin ids fail to be fetched', async () => {
    fetchMock.mock(fetchInstanceAdminsEndpoint, 500, { method: 'GET' });
    try {
      await retrieveAdminIds();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to retrieve instance admins. Status: 500'));
    }
  });
});
