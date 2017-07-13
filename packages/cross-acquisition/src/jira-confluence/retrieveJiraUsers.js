const PAGINGATION = 30;
const JIRA_SOFTWARE_GROUP = 'jira-software-users';
const JIRA_CORE_GROUP = 'jira-core-users';
const JIRA_SERVICE_DESK_GROUP = 'jira-servicedesk-users';

const createUserItem = user => ({
  content: user.displayName,
  value: user.name,
  description: user.email,
});

const usernamesEndpoint = (groupName, startIndex) => `/admin/rest/um/1/group/user/direct?groupname=${groupName}` +
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
const getJiraActiveUsernamesList = (groupName, currentList, startIndex) =>
  fetch(usernamesEndpoint(groupName, startIndex), {
    credentials: 'same-origin',
    dataType: 'json',
  }).then((response) => {
    // if this request fails, return an empty array
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    throw new Error(`Unable to retrieve active jira users. Status: ${response.status}`);
  }).then((result) => {
    if (result.length) {
      // continue building currentList
      result.map(user =>
        currentList.push({
          name: user.name,
          displayName: user['display-name'],
          email: user.email,
        })
      );
      return getJiraActiveUsernamesList(groupName, currentList, startIndex + PAGINGATION);
    }
    // if the final result is empty, we are done
    return currentList;
  });

/**
 * Loop over all jira groups, compile user list, and return a sorted list of user items
 */
export default () => getJiraActiveUsernamesList(JIRA_SOFTWARE_GROUP, [], 0)
  .then(currentList => getJiraActiveUsernamesList(JIRA_CORE_GROUP, currentList, 0))
  .then(currentList => getJiraActiveUsernamesList(JIRA_SERVICE_DESK_GROUP, currentList, 0))
  .then(currentList => currentList.sort((a, b) => a.displayName.localeCompare(b.displayName)))
  .then((currentList) => {
    const items = [];
    currentList.forEach(user => items.push(createUserItem(user)));
    return [{ items }];
  });
