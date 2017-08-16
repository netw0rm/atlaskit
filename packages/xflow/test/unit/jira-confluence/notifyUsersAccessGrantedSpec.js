import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import * as tenantContext from '../../../src/jira-confluence/tenantContext';

import notifyUsersAccessGranted, {
  NOTIFY_ENDPOINT_EAST,
} from '../../../src/jira-confluence/notifyUsersAccessGranted';

import userAdminResponse from './mock-data/isUserTrustedSiteAdmin.json';
import accessgrantedJiraUsersResponse from './mock-data/accessgrantedJiraUsers.json';
import accessgrantedNoUsersResponse from './mock-data/accessgrantedNoUsers.json';
import jiraUsersResponse from './mock-data/jiraUsers.json';
// import jiraSoftwareUsersResponse from './mock-data/jiraSoftwareUsers.json';
// import jiraCoreUsersResponse from './mock-data/jiraCoreUsers.json';
// import jiraServiceDeskUsersResponse from './mock-data/jiraServiceDeskUsers.json';

const NEVER_CALL = 'NEVER_CALL';
const shouldNeverContactEndpoint = () => {
  fetchMock.mock(NOTIFY_ENDPOINT_EAST, {}, { name: NEVER_CALL });
};

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

  it('should return a resolved promise with no value and it should never contact the endpoint', async () => {
    shouldNeverContactEndpoint();
    const result = await notifyUsersAccessGranted([]);
    expect(result).toEqual(accessgrantedNoUsersResponse);
    expect(fetchMock.done(NEVER_CALL)).toBe(false);
  });

  it('should return a resolved promise with no value if the endpoint returns a 200 response', async () => {
    tenantContext.getCurrentUsername = jest.fn().mockReturnValue('admin');
    tenantContext.queryUsername = jest.fn().mockReturnValue(userAdminResponse);
    tenantContext.getInstanceName = jest.fn().mockReturnValue('example.atlassian.net');

    mockNotifyEastEndpointWithResponse(accessgrantedJiraUsersResponse);

    const result = await notifyUsersAccessGranted(jiraUsersResponse);
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
      await notifyUsersAccessGranted(jiraUsersResponse);
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to notify users that they were granted access. Status: 500')
      );
    }
  });
});
