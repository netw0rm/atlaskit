/* eslint-disable mocha/no-skipped-tests */

import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import jiraUsers from './mock-data/jiraUsers.json';
import jiraServiceDeskUsers from './mock-data/jiraServiceDeskUsers.json';

import grantAccessToUsers, {
  CREATE_GROUP_URL,
  ADD_USERS_URL,
} from '../../../src/jira-confluence/grantAccessToUsers';

import createConfluenceUsersGroupResponse from './mock-data/createConfluenceUsersGroup.json';
import addUsersToGroupResponse from './mock-data/addUsersToGroupResponse';

const mockRetrieveJiraUsers = () => Promise.resolve(jiraUsers);
const mapUsers = users => users.map(user => ({ name: user.name }));
const grantAccess = (group, usernames) =>
  grantAccessToUsers(group, usernames && mapUsers(usernames), mockRetrieveJiraUsers);

chai.use(chaiAsPromised);

const mockCreateGroupEndpointWithSuccessStatus = () => {
  fetchMock.mock(CREATE_GROUP_URL, createConfluenceUsersGroupResponse, {
    method: 'POST',
    name: 'CreateGroup',
  });
};

const mockAddUsersEndpointWithSuccessStatus = () => {
  fetchMock.mock(ADD_USERS_URL, addUsersToGroupResponse, {
    method: 'POST',
    name: 'AddUsers',
  });
};

const mockCreateGroupEndpointWithFailureStatus = (status) => {
  fetchMock.mock(CREATE_GROUP_URL, status);
};

const mockAddUsersEndpointWithFailureStatus = (status) => {
  fetchMock.mock(ADD_USERS_URL, status);
};

describe('grantAccessToUsers', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('will add all users to the confluence-users group when "everyone" is selected', async () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();

    const result = await grantAccess('everyone');

    assert.isTrue(fetchMock.done('AddUsers'));
    assert.deepEqual(result, mapUsers(jiraUsers));
  });

  it('will add the specified users to the confluence-users group when "specificUsers" is selected', async () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();

    const result = await grantAccess('specificUsers', jiraServiceDeskUsers);

    assert.isTrue(fetchMock.done('AddUsers'));
    assert.deepEqual(result, mapUsers(jiraServiceDeskUsers));
  });

  it('will do nothing if "siteAdmins" is selected', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();
    return assert.eventually.deepEqual(grantAccess('siteAdmins'), []);
  });

  it('will return reject with an error if the create group endpoint returns a 404', () => {
    mockCreateGroupEndpointWithFailureStatus(404);
    mockAddUsersEndpointWithSuccessStatus();
    return assert.isRejected(grantAccess('everyone'), /404/);
  });

  it('will return reject with an error if the create group endpoint returns a 500', () => {
    mockCreateGroupEndpointWithFailureStatus(500);
    mockAddUsersEndpointWithSuccessStatus();
    return assert.isRejected(grantAccess('everyone'), /500/);
  });

  it('will return reject with an error if the add users endpoint returns a 404', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithFailureStatus(404);
    return assert.isRejected(grantAccess('everyone'), /404/);
  });

  it('will return reject with an error if the add users endpoint returns a 500', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithFailureStatus(500);
    return assert.isRejected(grantAccess('everyone'), /500/);
  });
});
