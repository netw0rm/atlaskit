import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import * as tenantContext from '../../../src/common/tenantContext';

import notifyUsersAccessGranted, {
  NOTIFY_ENDPOINT_EAST,
} from '../../../src/common/notifyUsersAccessGranted';

import userAdminResponse from './../jira-confluence/mock-data/isUserTrustedSiteAdmin.json';
import accessgrantedJiraUsersResponse from './../jira-confluence/mock-data/accessgrantedJiraUsers.json';
import accessgrantedNoUsersResponse from './../jira-confluence/mock-data/accessgrantedNoUsers.json';
import jiraUsersResponse from './../jira-confluence/mock-data/jiraUsers.json';
// import jiraSoftwareUsersResponse from './mock-data/jiraSoftwareUsers.json';
// import jiraCoreUsersResponse from './mock-data/jiraCoreUsers.json';
// import jiraServiceDeskUsersResponse from './mock-data/jiraServiceDeskUsers.json';

const mockNotifyEastEndpointWithResponse = (response) => {
  fetchMock.mock(
    NOTIFY_ENDPOINT_EAST,
    { body: response },
    {
      method: 'POST',
      name: 'NOTIFY',
    }
  );
};

describe('notifyUsersAccessGranted', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return no users and it should never contact the endpoint', async () => {
    const SHOULD_NEVER_CALL = 'SHOULD_NEVER_CALL';
    fetchMock.mock(NOTIFY_ENDPOINT_EAST, {}, { name: SHOULD_NEVER_CALL });
    const result = await notifyUsersAccessGranted([], 'confluence');
    expect(result).toEqual(accessgrantedNoUsersResponse);
    expect(fetchMock.called(SHOULD_NEVER_CALL)).toBe(false);
  });

  it('should return a resolved promise with no value if the endpoint returns a 200 response', async () => {
    tenantContext.getCurrentUsername = jest.fn().mockReturnValue('admin');
    tenantContext.queryUsername = jest.fn().mockReturnValue(Promise.resolve(userAdminResponse));
    tenantContext.getInstanceName = jest.fn().mockReturnValue('example.atlassian.net');

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
    fetchMock.mock(NOTIFY_ENDPOINT_EAST, 500);
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
