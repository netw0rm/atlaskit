import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import retrieveUsers from '../../../../src/common/services/retrieveUsers';

import { fetchInstanceUsersEndpoint } from '../../../../src/common/services/xflowService';

import instanceUsersResponse from '../mock-data/instanceUsers.json';

describe('retrieveUsers', () => {
  beforeEach(() => {
    fetchMock.catch(417);
  });
  afterEach(fetchMock.restore);

  it('should emit empty array when no valid users are retrieved', async () => {
    fetchMock.mock(fetchInstanceUsersEndpoint, [], { method: 'GET' });
    const response = await retrieveUsers();
    expect(response).toEqual([]);
  });

  it('should emit array with retrieved users', async () => {
    fetchMock.mock(fetchInstanceUsersEndpoint, instanceUsersResponse, { method: 'GET' });
    const response = await retrieveUsers();
    expect(response).toEqual(instanceUsersResponse);
  });

  it('should emit fetchUsersFailure action with expected payload when the users fail to be fetched', async () => {
    fetchMock.mock(fetchInstanceUsersEndpoint, 500, { method: 'GET' });
    try {
      await retrieveUsers();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to retrieve instance users. Status: 500'));
    }
  });
});
