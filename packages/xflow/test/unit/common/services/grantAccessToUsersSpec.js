import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import * as notifyUsersAccessGranted from '../../../../src/common/services/notifyUsersAccessGranted';

import jiraUsers from '../mock-data/jiraUsers.json';

import grantAccessToUsers, {
  CREATE_GROUP_URL,
  addUsersUrl,
} from '../../../../src/common/services/grantAccessToUsers';

import createConfluenceUsersGroupResponse from '../mock-data/createConfluenceUsersGroup.json';

const addUsersToGroupResponse = (url, options) => {
  const { users } = JSON.parse(options.body);
  return {
    expand: 'user',
    users,
  };
};

const mapUsers = users => users.map(user => ({ name: user.name }));

const mockCreateGroupEndpointWithSuccessStatus = () => {
  fetchMock.mock(CREATE_GROUP_URL, createConfluenceUsersGroupResponse, {
    method: 'POST',
    name: 'CreateGroup',
  });
};

const mockAddUsersEndpointWithSuccessStatus = () => {
  fetchMock.mock(addUsersUrl('confluence-users'), addUsersToGroupResponse, {
    method: 'POST',
    name: 'AddUsers',
  });
};

const mockCreateGroupEndpointWithFailureStatus = (status) => {
  fetchMock.mock(CREATE_GROUP_URL, status);
};

const mockAddUsersEndpointWithFailureStatus = (status) => {
  fetchMock.mock(addUsersUrl('confluence-users'), status);
};

describe('grantAccessToUsers', () => {
  let confluenceGrantAccessToUsers;

  beforeEach(() => {
    fetchMock.restore();

    confluenceGrantAccessToUsers = grantAccessToUsers('confluence-users', 'confluence');
  });

  it('will add the specified users to the confluence-users group', async () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();

    const result = await confluenceGrantAccessToUsers(jiraUsers, false);

    expect(fetchMock.done('CreateGroup')).toBe(true);

    const createGroupCalledWith = JSON.parse(fetchMock.calls('CreateGroup')[0][1].body);
    expect(createGroupCalledWith).toEqual(
      expect.objectContaining({
        name: 'confluence-users',
        description: '',
        type: 'GROUP',
      })
    );

    expect(fetchMock.done('AddUsers')).toBe(true);

    const addUsersCalledWith = JSON.parse(fetchMock.calls('AddUsers')[0][1].body);
    expect(addUsersCalledWith).toEqual({ users: mapUsers(jiraUsers) });

    expect(result).toEqual(mapUsers(jiraUsers));
  });

  it('will notify the users being added to the confluence-users group', async () => {
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();

    notifyUsersAccessGranted.default = jest.fn().mockReturnValue(Promise.resolve());

    await confluenceGrantAccessToUsers(jiraUsers);

    expect(notifyUsersAccessGranted.default).toHaveBeenCalledWith(jiraUsers, 'confluence');
  });

  it('will reject with an error if the notifying users fails', async () => {
    expect.assertions(1);
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithSuccessStatus();

    notifyUsersAccessGranted.default = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('Failed to notify Users')));

    try {
      await confluenceGrantAccessToUsers(jiraUsers);
    } catch (e) {
      expect(e).toEqual(new Error('Failed to notify Users'));
    }
  });

  it('will reject with an error if the create group endpoint returns a 404', async () => {
    expect.assertions(1);
    mockCreateGroupEndpointWithFailureStatus(404);
    mockAddUsersEndpointWithSuccessStatus();
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to create confluence-users group. Status: 404'));
    }
  });

  it('will reject with an error if the create group endpoint returns a 500', async () => {
    expect.assertions(1);
    mockCreateGroupEndpointWithFailureStatus(500);
    mockAddUsersEndpointWithSuccessStatus();
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to create confluence-users group. Status: 500'));
    }
  });

  it('will reject with an error if the add users endpoint returns a 404', async () => {
    expect.assertions(1);
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithFailureStatus(404);
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to grant access to users. Status: 404'));
    }
  });

  it('will reject with an error if the add users endpoint returns a 500', async () => {
    expect.assertions(1);
    mockCreateGroupEndpointWithSuccessStatus();
    mockAddUsersEndpointWithFailureStatus(500);
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to grant access to users. Status: 500'));
    }
  });
});
