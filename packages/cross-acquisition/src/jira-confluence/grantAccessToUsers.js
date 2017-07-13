export const CREATE_GROUP_URL = '/admin/rest/um/1/group';
export const ADD_USERS_URL = '/admin/rest/um/1/group/user/direct?groupname=confluence-users';
export const GET_ALL_USERS_URL = '/admin/rest/get/all/users'; // TODO Replace this with the real URL

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

  if (!(Math.floor(response.status / 100) === 2 || response.status === 400)) {
    throw new Error(`Unable to create confluence-users group. Status: ${response.status}`);
  }
}

async function getAllJiraUsers() {
  const response = await fetch(GET_ALL_USERS_URL);
  const data = await response.json();
  return data;
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

export default async (group, usernames = []) => {
  let users = usernames;
  let data;

  switch (group) {
    case 'everyone':
      users = await getAllJiraUsers();
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
