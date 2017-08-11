// This aligns with User Management's pagination value
const PAGINATION = 30;
const JIRA_SOFTWARE_GROUP = 'jira-software-users';
const JIRA_CORE_GROUP = 'jira-core-users';
const JIRA_SERVICE_DESK_GROUP = 'jira-servicedesk-users';
const SITE_ADMINS_GROUP = 'site-admins';

const usernamesEndpoint = (groupName, startIndex) =>
  `/admin/rest/um/1/group/user/direct?groupname=${groupName}` +
  `&activeFilter=active&start-index=${startIndex}&max-results=${PAGINATION}`;

const CACHE_TIMEOUT = 100000; // 100 seconds
const cache = new Map();

/**
 * Recursively compile usernames for adding to group
 *
 * @param groupName UM group that grants access to products (e.g. jira-software-users)
 * @param currentList current list of users
 * @param startIndex counter for current loop of user group
 * Example:
 * [
 *   {name: 'test2', displayName: 'test 2', email: 'test@example.com'},
 *   {name: 'mtruong', displayName: 'michael truong', email: 'mtruong@example.com'}
 * ]
 */
const getJiraActiveUsernamesList = async (groupName, startIndex = 0) => {
  const response = await fetch(usernamesEndpoint(groupName, startIndex), {
    credentials: 'same-origin',
    dataType: 'json',
  });

  // if this request fails, return an empty array
  if (!(response.status >= 200 && response.status < 300)) {
    throw new Error(`Unable to retrieve active jira users. Status: ${response.status}`);
  }

  const result = await response.json();

  return result.length
    ? [
      ...result.map(user => ({
        displayName: user['display-name'],
        ...user,
      })),
        // Only fetch more if there are likely to be more to fetch
      ...(result.length >= PAGINATION
          ? await getJiraActiveUsernamesList(groupName, startIndex + PAGINATION)
          : []),
    ]
    : [];
};

const getUsersInGroup = async (group) => {
  let users;
  if (group === 'site-admins') {
    users = getJiraActiveUsernamesList(SITE_ADMINS_GROUP);
  } else {
    const userLists = await Promise.all([
      getJiraActiveUsernamesList(SITE_ADMINS_GROUP),
      getJiraActiveUsernamesList(JIRA_SOFTWARE_GROUP),
      getJiraActiveUsernamesList(JIRA_CORE_GROUP),
      getJiraActiveUsernamesList(JIRA_SERVICE_DESK_GROUP),
    ]);

    const usernames = new Set();

    users = []
      .concat(...userLists)
      // Only include unique users.
      // The callback returns true when adding a new username to the set,
      // and false if it's already in there.
      .filter(user => !(usernames.has(user.name) || !usernames.add(user.name)))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }
  return users;
};

/**
 * Loop over all jira groups, compile user list, and return a sorted list of user items
 */
export default async (group = 'everyone') => {
  // Fetching the set of users for the specific users list is the same set as 'everyone'
  const fetchGroup = group === 'specific-users' ? 'everyone' : group;

  // Avoid fetching twice.
  if (cache.has(fetchGroup)) {
    const data = cache.get(fetchGroup);
    if (Date.now() - data.timestamp < CACHE_TIMEOUT) {
      return await data.promise;
    }
    cache.delete(fetchGroup);
  }

  const p = getUsersInGroup(fetchGroup);
  cache.set(fetchGroup, {
    timestamp: Date.now(),
    promise: p,
  });
  return await p;
};
