/** Utils to query infos about the current tenant = site
 */

import 'es6-promise/auto';
import 'whatwg-fetch';
import pAny from 'p-any';

const SITE_ADMINS_GROUP_NAME = 'site-admins';

export const JIRA_CLOUD_ID_URL = '/rest/product-fabric/1.0/cloud/id';
export const CONFLUENCE_CLOUD_ID_URL = '/wiki/rest/product-fabric/1.0/cloud/id';
export const JIRA_CURRENT_USER_AND_GROUPS_URL = '/rest/api/2/myself?expand=groups';
export const CONFLUENCE_CURRENT_USER_URL = '/wiki/rest/api/user/current';
export const CONFLUENCE_USER_GROUPS_URL = accountId => `/wiki/rest/api/user/memberof?accountId=${accountId}`;

const DEFAULT_AVATAR_URL = 'https://i2.wp.com/avatar-cdn.atlassian.com/default/96?ssl=1';
const AVATAR_REGEXP = /^https:\/\/avatar-cdn.atlassian.com\/[A-Za-z0-9]+/;

function fetchSameOrigin(url, prefix = '') {
  return fetch(url, { credentials: 'same-origin' })
    .then(response => {
      if (response.ok && response.status === 200) return response.text();

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
    })
    .then(responseText => {
      try {
        return JSON.parse(responseText);
      } catch (err) {
        err.message = `${prefix}JSON parse error!`;
        throw err;
      }
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
  // WIP only works in JIRA context (not confluence)
  currentUserPromiseCached = currentUserPromiseCached || (() => pAny([
    // Jira allows fetching user + group in one go
    fetchSameOrigin(JIRA_CURRENT_USER_AND_GROUPS_URL, 'Jira endpoint:'),
    // Confluence needs 2 calls:
    fetchSameOrigin(CONFLUENCE_CURRENT_USER_URL, 'Confluence endpoint #1:')
      .then(user => fetchSameOrigin(CONFLUENCE_USER_GROUPS_URL(user.accountId), 'Confluence endpoint #2:')
      // fuse user and her/his groups into the Jira format
        .then(groups => {
          user.groups = {};
          user.groups.items = groups.results;
          return user;
        })),
  ])
  .catch(aggregateErr => {
    aggregateErr.message = 'Unable to retrieve information about current user: ';
    aggregateErr.message += [...aggregateErr].map(err => err.message).join(', ');

    throw aggregateErr;
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
  });

export const getInstanceName = () => window.location.hostname;

/**
 * Attempt to fetch cloud id from JIRA, then Confluence, otherwise throw an error
 */
export const fetchCloudId = async () => {
  const response = await pAny([
    fetchSameOrigin(JIRA_CLOUD_ID_URL, 'Jira endpoint:'),
    fetchSameOrigin(CONFLUENCE_CLOUD_ID_URL, 'Confluence endpoint:'),
  ])
  .catch(aggregateErr => {
    aggregateErr.message = 'Unable to retrieve cloud id: ';
    aggregateErr.message += [...aggregateErr].map(err => err.message).join(', ');

    throw aggregateErr;
  });

  return response.cloudId;
};
