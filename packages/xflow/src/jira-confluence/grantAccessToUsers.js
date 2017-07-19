import 'es6-promise/auto';
import 'whatwg-fetch';
import retreiveJiraUsers from './retrieveJiraUsers';

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

export default async (group, usernames, fetchFn) => {
  let data;
  let users = usernames;
  let fetchedUsers;

  switch (group) {
    case 'everyone':
      fetchedUsers = await (fetchFn || retreiveJiraUsers)();
      users = fetchedUsers.map(user => ({ name: user.name }));

    /* falls through */
    case 'specificUsers':
      await createConfluenceUsersGroup();
      data = await addUsersToConfluenceUsersGroup(users);

      break;
    default:
      // Do nothing for siteAdmins case
      break;
  }

  return data ? data.users : [];
};
