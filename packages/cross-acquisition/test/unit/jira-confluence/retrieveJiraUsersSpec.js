
import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import retrieveJiraUsers from '../../../src/jira-confluence/retrieveJiraUsers';

chai.use(chaiAsPromised);

const JIRA_SOFTWARE_GROUP = 'jira-software-users';
const JIRA_CORE_GROUP = 'jira-core-users';
const JIRA_SERVICE_DESK_GROUP = 'jira-servicedesk-users';

const usersEndpoint = (groupName, currentIndex) => `/admin/rest/um/1/group/user/direct?groupname=${groupName}&activeFilter=active&start-index=${currentIndex}&max-results=30`;

const mockUser = (firstName, lastName) => {
  const name = `${firstName.charAt(0)}${lastName}`;
  return {
    name,
    'display-name': `${firstName} ${lastName}`,
    email: `${name}@example.com`,
  };
};

describe('retrieveJiraUsers', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  /**
   * test scenario where there are no JIRA users (i.e. all site-admin instance)
   */
  it('should emit empty array when no valid users are retrieved', () => {
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    return assert.eventually.deepEqual(retrieveJiraUsers(), [{ items: [] }]);
  });

  /**
   * test scenario where there are some JIRA users
   */
  it('should emit array with compiled jira software users', () => {
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), [mockUser('jira', 'user')], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [], { method: 'GET' });
    return assert.eventually.deepEqual(retrieveJiraUsers(), [{ items: [
      {
        content: 'jira user',
        description: 'juser@example.com',
        value: 'juser',
      },
    ] }]);
  });

  /**
   * test scenario where there are some JIRA software users and some JIRA service desk users
   */
  it('should emit array with compiled jira software and jira servicedesk users', () => {
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), [mockUser('software', 'user')], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 30), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 0), [mockUser('core', 'user')], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_CORE_GROUP, 30), [], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 0), [mockUser('service-desk', 'agent')], { method: 'GET' });
    fetchMock.mock(usersEndpoint(JIRA_SERVICE_DESK_GROUP, 30), [], { method: 'GET' });
    return assert.eventually.deepEqual(retrieveJiraUsers(), [{ items: [
      {
        content: 'core user',
        description: 'cuser@example.com',
        value: 'cuser',
      },
      {
        content: 'service-desk agent',
        description: 'sagent@example.com',
        value: 'sagent',
      },
      {
        content: 'software user',
        description: 'suser@example.com',
        value: 'suser',
      },
    ] }]);
  });

  /**
   * Test scenario when one of the requests in the chain fails
   */
  it('should emit fetchUsersFailure action with expected payload when the users fail to be fetched', () => {
    fetchMock.mock(usersEndpoint(JIRA_SOFTWARE_GROUP, 0), 500, { method: 'GET' });
    return assert.isRejected(retrieveJiraUsers(), /500/);
  });
});
