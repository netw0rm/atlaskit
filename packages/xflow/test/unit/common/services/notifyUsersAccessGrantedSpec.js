import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import * as tenantContext from '../../../../src/common/services/tenantContext';

import { notifyAccessEndpoint } from '../../../../src/common/services/xflowService';
import notifyUsersAccessGranted from '../../../../src/common/services/notifyUsersAccessGranted';

import meResponse from '../mock-data/me.json';
import accessgrantedJiraUsersResponse from '../mock-data/accessgrantedJiraUsers.json';
import accessgrantedNoUsersResponse from '../mock-data/accessgrantedNoUsers.json';
import jiraUsersResponse from '../mock-data/jiraUsers.json';

const MOCK_CLOUD_ID = 'some-cloud-id';

const mockNotifyEastEndpointWithResponse = (response) => {
  fetchMock.mock(
    notifyAccessEndpoint(MOCK_CLOUD_ID),
    { body: response },
    {
      method: 'POST',
      name: 'NOTIFY',
    }
  );
};

describe('notifyUsersAccessGranted', () => {
  let sandbox;
  beforeEach(() => { sandbox = sinon.createSandbox(); });
  afterEach(() => sandbox.restore());

  beforeEach(() => {
    tenantContext.fetchCloudId = jest.fn().mockReturnValue(Promise.resolve(MOCK_CLOUD_ID));
    fetchMock.catch(417);
  });
  afterEach(fetchMock.restore);

  it('should return no users and it should never contact the endpoint', async () => {
    const SHOULD_NEVER_CALL = 'SHOULD_NEVER_CALL';
    fetchMock.mock(notifyAccessEndpoint(MOCK_CLOUD_ID), {}, { name: SHOULD_NEVER_CALL });
    const result = await notifyUsersAccessGranted([], 'confluence');
    expect(result).toEqual(accessgrantedNoUsersResponse);
    expect(fetchMock.called(SHOULD_NEVER_CALL)).toBe(false);
  });

  it('should return a resolved promise with no value if the endpoint returns a 200 response', async () => {
    sandbox.stub(tenantContext, 'fetchCurrentUser').resolves(meResponse);
    sandbox.stub(tenantContext, 'getInstanceName').returns('example.atlassian.net');
    mockNotifyEastEndpointWithResponse(accessgrantedJiraUsersResponse);

    const result = await notifyUsersAccessGranted(jiraUsersResponse, 'confluence');
    expect(result).toEqual(accessgrantedJiraUsersResponse);
    expect(fetchMock.done('NOTIFY')).toBe(true);

    const jsonBody = JSON.parse(fetchMock.calls('NOTIFY')[0][1].body);
    expect(jsonBody).toEqual(
      expect.objectContaining({
        instance: expect.any(String),
        grantedAccessBy: expect.objectContaining({
          name: expect.any(String),
          avatar: expect.any(String),
        }),
        grantedAccessTo: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            username: expect.any(String),
            atlassianAccountId: expect.any(String),
          }),
        ]),
      })
    );
  });

  it('should return a rejected promise if both endpoints return a 500 response', async () => {
    sandbox.stub(tenantContext, 'fetchCurrentUser').resolves(meResponse);
    sandbox.stub(tenantContext, 'getInstanceName').returns('example.atlassian.net');
    fetchMock.mock(notifyAccessEndpoint(MOCK_CLOUD_ID), 500);
    expect.assertions(1);

    try {
      await notifyUsersAccessGranted(jiraUsersResponse, 'confluence');
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to notify users that they were granted access. Status: 500')
      );
    }
  });
});
