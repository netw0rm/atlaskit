// This aligns with User Management's pagination value
const PAGINATION = 30;
// export const CONFLUENCE_GROUP = 'confluence-users';
export const JIRA_SOFTWARE_GROUP = 'jira-software-users';
export const JIRA_CORE_GROUP = 'jira-core-users';
export const JIRA_SERVICE_DESK_GROUP = 'jira-servicedesk-users';
export const SITE_ADMINS_GROUP = 'site-admins';

const GROUPS_ENDPOINT = '/admin/rest/um/1/group/search';

const usernamesEndpoint = (groupName, startIndex) =>
`/admin/rest/um/1/group/user/direct?groupname=${groupName}` +
`&activeFilter=active&start-index=${startIndex}&max-results=${PAGINATION}`;

const CACHE_TIMEOUT = 100000; // 100 seconds
const cache = new Map();

const resolveGroupnameErrors = async (response) => {
  let resolvedErrorResponse = null;
  if (response.status === 404) {
    const result = await response.json();
    // if this request returns with 404 error "Group does not exist", return an empty array
    if (result.errors) {
      result.errors.forEach(error => {
        if (error.message && error.message.indexOf('does not exist') !== -1) {
          resolvedErrorResponse = [];
        }
      });
    }
  }

  if (resolvedErrorResponse === null) {
    // if unhandled error, throw
    throw new Error(`Unable to retrieve active jira users. Status: ${response.status}`);
  } else {
    return resolvedErrorResponse;
  }
};

/**
 * Recursively compile usernames for adding to group
 *
 * @param groupName UM group that grants access to products (e.g. jira-software-users)
 * @param startIndex counter for current loop of user group
 */
const getJiraActiveUsernamesList = async (groupName, startIndex = 0) => {
  const response = await fetch(usernamesEndpoint(groupName, startIndex), {
    credentials: 'same-origin',
    dataType: 'json',
  });

  // if this request fails, resolve errors
  if (!(response.status >= 200 && response.status < 300)) {
    return resolveGroupnameErrors(response);
  }

  const result = await response.json();

  return result.length
    ? [
      ...result,
    // Only fetch more if there are likely to be more to fetch
      ...(result.length >= PAGINATION
      ? await getJiraActiveUsernamesList(groupName, startIndex + PAGINATION)
      : []),
    ]
    : [];
};

/**
 * Retrieves all the active users from a given selection
 * @param validGroups array of valid group names to retrieve users from
 * for the 'everyone' and 'specific-users' options
 * @returns {Function}
 */
export default (validGroups) => {
  /**
   * Retrieve the active groups on the instance that are valid for retrieval
   * @returns Array of active group names in valid groups array
   */
  const getActiveGroups = async () => {
    const response = await fetch(GROUPS_ENDPOINT, {
      credentials: 'same-origin',
      dataType: 'json',
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`Unable to retrieve groups. Status: ${response.status}`);
    }

    const groups = await response.json();
    return groups
      .filter(group => group.active && validGroups.includes(group.name))
      .map(group => group.name);
  };

  const getUsersInGroup = async (group) => {
    let users;
    if (group === 'site-admins') {
      users = getJiraActiveUsernamesList(SITE_ADMINS_GROUP);
    } else {
      const groups = await getActiveGroups();
      const userLists = await Promise.all(
        groups.map(groupName => getJiraActiveUsernamesList(groupName))
      );

      const usernames = new Set();

      users = []
        .concat(...userLists)
        // Only include unique users.
        // The callback returns true when adding a new username to the set,
        // and false if it's already in there.
        .filter(user => !(usernames.has(user.name) || !usernames.add(user.name)))
        .sort((a, b) => a['display-name'].localeCompare(b['display-name']));
    }
    return users;
  };

  /**
   * Loop over all jira groups, compile user list, and return a sorted list of user items
   */
  return async (group = 'everyone', useCache = true) => {
    // Fetching the set of users for the specific users list is the same set as 'everyone'
    const fetchGroup = group === 'specific-users' ? 'everyone' : group;

    if (useCache) {
      // Avoid fetching twice.
      if (cache.has(fetchGroup)) {
        const data = cache.get(fetchGroup);
        if (Date.now() - data.timestamp < CACHE_TIMEOUT) {
          return await data.promise;
        }
        cache.delete(fetchGroup);
      }
    }

    const p = getUsersInGroup(fetchGroup);
    if (useCache) {
      cache.set(fetchGroup, {
        timestamp: Date.now(),
        promise: p,
      });
    }
    return await p;
  };
};
