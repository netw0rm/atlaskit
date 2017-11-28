/** Utils to query infos about the current tenant = site
 */

import 'es6-promise/auto';
import 'whatwg-fetch';
import { promiseAny } from '../utils/promiseAny';

const SITE_ADMINS_GROUP_NAME = 'site-admins';

export const JIRA_CLOUD_ID_URL = '/rest/product-fabric/1.0/cloud/id';
export const CONFLUENCE_CLOUD_ID_URL = '/wiki/rest/product-fabric/1.0/cloud/id';
export const JIRA_CURRENT_USER_AND_GROUPS_URL = '/rest/api/2/myself?expand=groups';

// https://developer.atlassian.com/cloud/confluence/rest/#api-user-current-get
export const CONFLUENCE_CURRENT_USER_URL = '/wiki/rest/api/user/current';

// https://developer.atlassian.com/cloud/confluence/rest/#api-user-memberof-get
export const CONFLUENCE_USER_GROUPS_URL = accountId => `/wiki/rest/api/user/memberof?accountId=${accountId}`;

const DEFAULT_AVATAR_URL = 'https://i2.wp.com/avatar-cdn.atlassian.com/default/96?ssl=1';
const AVATAR_REGEXP = /^https:\/\/avatar-cdn.atlassian.com\/[A-Za-z0-9]+/;

function fetchSameOrigin(url, prefix = '') {
  return fetch(url, { credentials: 'same-origin' })
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json()
          .catch(err => {
            err.message = `${prefix}JSON parse error!`;
            throw err;
          });
      }

      let msg = `${prefix} fetch error`;
      if (response.status !== 200) {
        msg += `, status = ${response.status}`;
      } else if (!response.ok) {
        msg += ', !ok';
      }
      msg += '!';

      const err = new Error(msg);
      err.status = response.status;

      throw err;
    });
}

/**
 * Gets the largest avatar url
 * @param avatarUrls avatar urls, usually from fetchCurrentUser() response
 * @returns urls
 */
export const getAvatarUrl = ({ avatarUrls }) => {
  // Find the largest size key
  const key = Object.keys(avatarUrls || {}).pop();

  if (!key) {
    return DEFAULT_AVATAR_URL;
  }

  const baseUrl = (avatarUrls[key].match(AVATAR_REGEXP) || [])[0];
  const url = baseUrl ? `${baseUrl}?s=128` : avatarUrls[key];
  return url;
};

let currentUserPromiseCached = null;
export function fetchCurrentUser() {
  currentUserPromiseCached = currentUserPromiseCached || (() => promiseAny([
    // Jira allows fetching user + group in one go
    fetchSameOrigin(JIRA_CURRENT_USER_AND_GROUPS_URL, 'Jira endpoint:'),
    // Confluence needs 2 calls:
    // Note: the endpoint below is paginated, to a default of 200 entries.
    // We assume that 200 entries is enough to get the most interesting groups
    // and choose to not walk across pages.
    fetchSameOrigin(CONFLUENCE_CURRENT_USER_URL, 'Confluence endpoint #1:')
      .then(user => fetchSameOrigin(CONFLUENCE_USER_GROUPS_URL(user.accountId), 'Confluence endpoint #2:')
      // fuse user and her/his groups into the Jira format
        .then(groups => {
          user.groups = {};
          user.groups.items = groups.results;
          return user;
        })),
  ])
  .catch(err => {
    err.message = `Unable to retrieve information about current user: ${err.message}`;
    throw err;
  })
  )();

  return currentUserPromiseCached;
}
fetchCurrentUser.resetCache = () => {
  currentUserPromiseCached = null;
};

export const fetchCurrentUserDisplayName = () =>
  fetchCurrentUser().then(user => user.displayName || user.name || user.emailAddress || '');

export const fetchCurrentUserAvatarUrl = () =>
  fetchCurrentUser().then(getAvatarUrl);

export const isCurrentUserSiteAdmin = () =>
  fetchCurrentUser()
  .then(user => {
    let isSiteAdmin;
    try {
      isSiteAdmin = user.groups.items.some(group => group.name === SITE_ADMINS_GROUP_NAME);
    } catch (e) {
      isSiteAdmin = false;
    }
    return isSiteAdmin;
  })
  .catch(err => {
    err.message = `Unable to check current user site admin rights: ${err.message}`;
    throw err;
  });

export const getInstanceName = () => window.location.hostname;

/**
 * Attempt to fetch cloud id from JIRA, then Confluence, otherwise throw an error
 */
export const fetchCloudId = async () => {
  const response = await promiseAny([
    fetchSameOrigin(JIRA_CLOUD_ID_URL, 'Jira endpoint:'),
    fetchSameOrigin(CONFLUENCE_CLOUD_ID_URL, 'Confluence endpoint:'),
  ])
  .catch(err => {
    err.message = `Unable to retrieve cloud id: ${err.message}`;
    throw err;
  });

  return response.cloudId;
};
