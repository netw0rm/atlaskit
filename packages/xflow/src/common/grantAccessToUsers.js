import 'es6-promise/auto';
import 'whatwg-fetch';
import notifyUsersAccessGranted from './notifyUsersAccessGranted';

export const CREATE_GROUP_URL = '/admin/rest/um/1/group';
export const addUsersUrl = (groupname) => `/admin/rest/um/1/group/user/direct?groupname=${groupname}`;

/**
 * Grants access to users to a particular group, and notifies the users granted access
 * @param groupname
 * @param product
 */
export default (groupname, product) => {
  async function createUsersGroup() {
    // attempt to create group if it does not already exist
    const response = await fetch(CREATE_GROUP_URL, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        name: groupname,
        description: '',
        type: 'GROUP',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!((response.status >= 200 && response.status < 300) || response.status === 400)) {
      throw new Error(`Unable to create ${groupname} group. Status: ${response.status}`);
    }
  }

  async function addUsersToUsersGroup(users) {
    const response = await fetch(addUsersUrl(groupname), {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        users,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Unable to grant access to users. Status: ${response.status}`);
    }

    return await response.json();
  }

  return async (users, notifyUsers = true) => {
    await createUsersGroup();
    const data = await addUsersToUsersGroup(users.map(user => ({ name: user.name })));

    if (notifyUsers) {
      await notifyUsersAccessGranted(users, product);
    }

    return data ? data.users : [];
  };
};
