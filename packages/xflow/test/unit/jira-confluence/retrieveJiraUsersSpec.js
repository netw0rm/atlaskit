/* eslint-disable jest/no-disabled-tests */
import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import retrieveJiraUsers from '../../../src/jira-confluence/retrieveJiraUsers';

import jiraUsersResponse from './mock-data/jiraUsers.json';
import jiraSoftwareUsersResponse from './mock-data/jiraSoftwareUsers.json';
import jiraCoreUsersResponse from './mock-data/jiraCoreUsers.json';
import jiraServiceDeskUsersResponse from './mock-data/jiraServiceDeskUsers.json';

const mapUser = user => ({
  name: user.name,
  displayName: user['display-name'],
  email: user.email,
});

const jiraSoftwareUsersOutput = jiraSoftwareUsersResponse.map(mapUser);
const jiraServiceDeskUsersOutput = jiraServiceDeskUsersResponse.map(mapUser);
// const jiraCoreUsersOutput = jiraCoreUsersResponse.map(mapUser);
const jiraUsersOutput = jiraUsersResponse.map(mapUser);

chai.use(chaiAsPromised);

const JIRA_SOFTWARE_GROUP = 'jira-software-users';
const JIRA_CORE_GROUP = 'jira-core-users';
const JIRA_SERVICE_DESK_GROUP = 'jira-servicedesk-users';

const usersEndpoint = (groupName, currentIndex) =>
  `/admin/rest/um/1/group/user/direct?groupname=${groupName}&activeFilter=active&start-index=${currentIndex}&max-results=30`;

describe('retrieveJiraUsers', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  /**
   * test scenario where there are no JIRA users (i.e. all site-admin instance)
   */
  xit('should emit empty array when no valid users are retrieved', () => {
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    return assert.eventually.deepEqual(retrieveJiraUsers(), []);
  });

  /**
   * test scenario where there are some JIRA users
   */
  xit('should emit array with compiled jira software users', () => {
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), jiraSoftwareUsersResponse.slice(30), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    return assert.eventually.deepEqual(retrieveJiraUsers(), jiraSoftwareUsersOutput);
  });

  /**
   * test scenario where there are some JIRA software users and some JIRA service desk users
   */
  xit('should emit array with compiled jira software and jira servicedesk users', () => {
    // The first 5 users of the set of JSW and JSD users are non-overlapping. This ensures
    // that there are no duplicates in the expected output.
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), jiraSoftwareUsersResponse.slice(0, 5), {
      method: 'GET',
    });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(
      usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0),
      jiraServiceDeskUsersResponse.slice(0, 5),
      {
        method: 'GET',
      }
    );
    return assert.eventually.deepEqual(retrieveJiraUsers(), [
      ...jiraServiceDeskUsersOutput.slice(0, 5),
      ...jiraSoftwareUsersOutput.slice(0, 5),
    ]);
  });

  /**
   * test scenario where there are users in all groups, including some unique and shared
   */
  xit(
    'should emit array all unique users from jira software, jira service desk and jira core groups',
    () => {
      fetchMock.mock(
        usersEndpoint(JIRA_SOFTWARE_GROUP, 0),
        jiraSoftwareUsersResponse.slice(0, 30),
        {
          method: 'GET',
        }
      );
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
      return assert.eventually.deepEqual(retrieveJiraUsers(), jiraUsersOutput);
    }
  );

  /**
   * Test scenario when one of the requests in the chain fails
   */
  xit(
    'should emit fetchUsersFailure action with expected payload when the users fail to be fetched',
    () => {
      fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), 500, { method: 'GET' });
      fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), jiraCoreUsersResponse, {
        method: 'GET',
      });
      fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), jiraServiceDeskUsersResponse, {
        method: 'GET',
      });
      return assert.isRejected(retrieveJiraUsers(), /500/);
    }
  );
});
