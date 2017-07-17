// This aligns with User Management's pagination value
const PAGINGATION = 30;
const JIRA_SOFTWARE_GROUP = 'jira-software-users';
const JIRA_CORE_GROUP = 'jira-core-users';
const JIRA_SERVICE_DESK_GROUP = 'jira-servicedesk-users';

const usernamesEndpoint = (groupName, startIndex) =>
  `/admin/rest/um/1/group/user/direct?groupname=${groupName}` +
  `&activeFilter=active&start-index=${startIndex}&max-results=${PAGINGATION}`;

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
        name: user.name,
        displayName: user['display-name'],
        email: user.email,
      })),
        // Only fetch more if there are likely to be more to fetch
      ...(result.length >= PAGINGATION
          ? await getJiraActiveUsernamesList(groupName, startIndex + PAGINGATION)
          : []),
    ]
    : [];
};

/**
 * Loop over all jira groups, compile user list, and return a sorted list of user items
 */
export default async () => {
  const userLists = await Promise.all([
    getJiraActiveUsernamesList(JIRA_SOFTWARE_GROUP),
    getJiraActiveUsernamesList(JIRA_CORE_GROUP),
    getJiraActiveUsernamesList(JIRA_SERVICE_DESK_GROUP),
  ]);

  const usernames = new Set();

  return (
    []
      .concat(...userLists)
      // Only include unique users.
      // The callback returns true when adding a new username to the set,
      // and false if it's already in there.
      .filter(user => !(usernames.has(user.name) || !usernames.add(user.name)))
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
  );
};
