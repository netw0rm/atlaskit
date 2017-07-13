/* eslint-disable mocha/no-skipped-tests */

import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import grantAccessToUsers, {
  CREATE_GROUP_URL,
  ADD_USERS_URL,
  GET_ALL_USERS_URL,
} from '../../../src/jira-confluence/grantAccessToUsers';

import createConfluenceUsersGroupResponse from './mock-data/createConfluenceUsersGroup.json';
import addUsersToGroupResponse from './mock-data/addUsersToGroupResponse';

// import selectedUsers from './mock-data/selectedUsers.json';
import allUsers from './mock-data/allUsers.json';

chai.use(chaiAsPromised);

const mockCreateGroupEndpointWithSuccessStatus = () => {
  fetchMock.mock(CREATE_GROUP_URL, createConfluenceUsersGroupResponse, { method: 'POST' });
};

const mockAddUsersEndpointWithSuccessStatus = () => {
  fetchMock.mock(ADD_USERS_URL, addUsersToGroupResponse, { method: 'POST' });
};

const mockGetAllUsersEndpointWithSuccessStatus = () => {
  fetchMock.mock(GET_ALL_USERS_URL, allUsers, { method: 'GET' });
};

const mockCreateGroupEndpointWithFailureStatus = (status) => {
  fetchMock.mock(CREATE_GROUP_URL, status);
};

const mockAddUsersEndpointWithFailureStatus = (status) => {
  fetchMock.mock(ADD_USERS_URL, status);
};

// const mockAllUsersEndpointWithFailureStatus = (status) => {
//   fetchMock.mock(GET_ALL_USERS_URL, status);
// };

describe('grantAccessToUsers', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('will add all users to the confluence-users group when "everyone" is selected', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockGetAllUsersEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();

    const result = grantAccessToUsers('everyone');
    return assert.eventually.deepEqual(result, allUsers);
  });

  xit('will return true if Confluence is activated', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();
    return assert.eventually.deepEqual(grantAccessToUsers(), true);
  });

  xit('will return true if Confluence has been deactived', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();
    return assert.eventually.deepEqual(grantAccessToUsers(), true);
  });

  xit('will return reject with an error if the create users endpoint returns a 404', () => {
    mockCreateGroupEndpointWithFailureStatus(404);
    mockAddUsersEndpointWithSuccessStatus();
    return assert.isRejected(grantAccessToUsers(), /404/);
  });

  xit('will return reject with an error if the create users endpoint returns a 500', () => {
    mockCreateGroupEndpointWithFailureStatus(500);
    mockAddUsersEndpointWithSuccessStatus();
    return assert.isRejected(grantAccessToUsers(), /500/);
  });

  xit('will return reject with an error if the add users endpoint returns a 404', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithFailureStatus(404);
    return assert.isRejected(grantAccessToUsers(), /404/);
  });

  xit('will return reject with an error if the add users endpoint returns a 500', () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithFailureStatus(500);
    return assert.isRejected(grantAccessToUsers(), /500/);
  });
});
