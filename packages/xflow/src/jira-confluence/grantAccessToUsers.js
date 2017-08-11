import 'es6-promise/auto';
import 'whatwg-fetch';
import retreiveJiraUsers from './retrieveJiraUsers';
import notifyUsersAccessGranted from './notifyUsersAccessGranted';

export const CREATE_GROUP_URL = '/admin/rest/um/1/group';
export const ADD_USERS_URL = '/admin/rest/um/1/group/user/direct?groupname=confluence-users';

async function createConfluenceUsersGroup() {
  // attempt to create confluence-users
  const response = await fetch(CREATE_GROUP_URL, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      name: 'confluence-users',
      description: '',
      type: 'GROUP',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!((response.status >= 200 && response.status < 300) || response.status === 400)) {
    throw new Error(`Unable to create confluence-users group. Status: ${response.status}`);
  }
}

async function addUsersToConfluenceUsersGroup(users) {
  const response = await fetch(ADD_USERS_URL, {
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

export default async (group, usernames, notifyUsers = true, fetchFn) => {
  let users = usernames;
  let fetchedUsers;

  if (group !== 'specificUsers') {
    fetchedUsers = await (fetchFn || retreiveJiraUsers)(group);
    users = fetchedUsers.map(user => ({ name: user.name }));
  }

  await createConfluenceUsersGroup();
  const data = await addUsersToConfluenceUsersGroup(users);

  if (notifyUsers) {
    await notifyUsersAccessGranted();
  }

  return data ? data.users : [];
};
