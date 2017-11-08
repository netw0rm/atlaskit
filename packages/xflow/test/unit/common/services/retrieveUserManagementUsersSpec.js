import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import retrieveUserManagementUsers, {
    JIRA_SOFTWARE_GROUP,
    JIRA_CORE_GROUP,
    JIRA_SERVICE_DESK_GROUP,
    SITE_ADMINS_GROUP,
} from '../../../../src/common/services/retrieveUserManagementUsers';

import groupSearch from '../mock-data/groupSearch.json';
import jiraUsersResponse from '../mock-data/jiraUsers.json';
import jiraSoftwareUsersResponse from '../mock-data/jiraSoftwareUsers.json';
import jiraCoreUsersResponse from '../mock-data/jiraCoreUsers.json';
import jiraServiceDeskUsersResponse from '../mock-data/jiraServiceDeskUsers.json';
import missingJiraCoreGroupResponse from '../mock-data/missingJiraCoreGroup.json';

const GROUPS_ENDPOINT = '/admin/rest/um/1/group/search';

const usersEndpoint = (groupName, currentIndex) =>
  `/admin/rest/um/1/group/user/direct?groupname=${groupName}&activeFilter=active&start-index=${currentIndex}&max-results=30`;

describe('retrieveUserManagementUsers', () => {
  let retrieveJiraUsers;

  beforeEach(() => {
    fetchMock.restore();

    retrieveJiraUsers = retrieveUserManagementUsers([
      JIRA_SOFTWARE_GROUP,
      JIRA_CORE_GROUP,
      JIRA_SERVICE_DESK_GROUP,
      SITE_ADMINS_GROUP,
    ]);
  });

  /**
   * test scenario where there are no JIRA users (i.e. all site-admin instance)`
   */
  it('should emit empty array when no valid users are retrieved', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });
    const response = await retrieveJiraUsers('everyone', false);
    expect(response).toEqual([]);
  });

  /**
   * test scenario where there are some JIRA users
   */
  it('should emit array with compiled jira software users', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), jiraSoftwareUsersResponse.slice(30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });
    const response = await retrieveJiraUsers('everyone', false);
    expect(response).toEqual(jiraSoftwareUsersResponse);
  });

  /**
   * test scenario where there are some JIRA software users and some JIRA service desk users
   */
  it('should emit array with compiled jira software and jira servicedesk users', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    // The first 5 users of the set of JSW and JSD users are non-overlapping. This ensures
    // that there are no duplicates in the expected output.
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 5), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(
      usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0),
      jiraServiceDeskUsersResponse.slice(0, 5),
      { method: 'GET' }
    );
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });
    const response = await retrieveJiraUsers('everyone', false);
    expect(response).toEqual(
      expect.arrayContaining([
        ...jiraSoftwareUsersResponse.slice(0, 5),
        ...jiraServiceDeskUsersResponse.slice(0, 5),
      ])
    );
  });

  /**
   * test scenario where there are users in all groups, including some unique and shared
   */
  it('should emit array all unique users from jira software, jira service desk and jira core groups', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), jiraSoftwareUsersResponse.slice(30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), jiraCoreUsersResponse.slice(0, 30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 30), jiraCoreUsersResponse.slice(30), {
      method: 'GET',
    });
    fetchMock.mock(
      usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0),
      jiraServiceDeskUsersResponse.slice(0, 30),
      { method: 'GET' }
    );
    fetchMock.mock(
      usersEndpoint(JIRA_SERVICE_DESK_GROUP, 30),
      jiraServiceDeskUsersResponse.slice(30),
      { method: 'GET' }
    );
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });
    const response = await retrieveJiraUsers('everyone', false);
    expect(response).toEqual(jiraUsersResponse);
  });

  /**
   * test scenario where useCache parameter is set to true and should only be called once
   */
  it('should only be called once when useCache is set to true', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    const spy = jest.fn()
      .mockReturnValueOnce(jiraCoreUsersResponse)
      .mockReturnValueOnce(jiraServiceDeskUsersResponse);
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), spy, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });
    const [firstResponse, secondResponse] = await Promise.all([retrieveJiraUsers('everyone'), retrieveJiraUsers('everyone')]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(firstResponse).toEqual(secondResponse);
  });

  /**
   * Test scenario when one of the requests in the chain fails
   */
  it('should emit fetchUsersFailure action with expected payload when the users fail to be fetched', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), 500, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), jiraCoreUsersResponse, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), jiraServiceDeskUsersResponse, {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });
    try {
      await retrieveJiraUsers('everyone', false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to retrieve active users. Status: 500'));
    }
  });

  /**
   * Test scenario when one of the requests in the chain fails due to 404 group does not exist
   */
  it('should not emit fetchUsersFailure action when the group does not exist', async () => {
    fetchMock.mock(GROUPS_ENDPOINT, groupSearch, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), jiraSoftwareUsersResponse.slice(30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), { status: 404, body: missingJiraCoreGroupResponse }, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(SITE_ADMINS_GROUP, 0), [], { method: 'GET' });

    const response = await retrieveJiraUsers('everyone', false);
    expect(response).toEqual(jiraSoftwareUsersResponse);
  });

  it('should only request users from groups that exist', async () => {
    const onlyJiraSoftwareGroup = groupSearch.filter(group => group.name === JIRA_SOFTWARE_GROUP);
    fetchMock.mock(GROUPS_ENDPOINT, onlyJiraSoftwareGroup, { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), jiraSoftwareUsersResponse.slice(30), {
      method: 'GET',
    });

    // This will fail if it requests for groups that haven't been mocked out
    const response = await retrieveJiraUsers('everyone', false);
    expect(response).toEqual(jiraSoftwareUsersResponse);
  });
});
