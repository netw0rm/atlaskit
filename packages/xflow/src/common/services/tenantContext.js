/** Utils to query infos about the current tenant = site
 */

import 'es6-promise/auto';
import 'whatwg-fetch';

const SITE_ADMINS_GROUP_NAME = 'site-admins';

export const JIRA_CLOUD_ID_URL = '/rest/product-fabric/1.0/cloud/id';
export const CONFLUENCE_CLOUD_ID_URL = '/wiki/rest/product-fabric/1.0/cloud/id';
export const JIRA_CURRENT_USER_AND_GROUPS_URL = '/rest/api/2/myself?expand=groups';
const DEFAULT_AVATAR_URL = 'https://i2.wp.com/avatar-cdn.atlassian.com/default/96?ssl=1';
const AVATAR_REGEXP = /^https:\/\/avatar-cdn.atlassian.com\/[A-Za-z0-9]+/;

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
  currentUserPromiseCached = currentUserPromiseCached || fetch(
      JIRA_CURRENT_USER_AND_GROUPS_URL,
      { credentials: 'same-origin' }
    )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `Unable to retrieve information about current user. Status: ${response.status}`
        );
      }

      return response.json();
    });

  return currentUserPromiseCached;
}
fetchCurrentUser.resetCache = () => {
  currentUserPromiseCached = null;
};

export const fetchCurrentUserDisplayName = () =>
  fetchCurrentUser().then(user => user.displayName);

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
  let response = await fetch(JIRA_CLOUD_ID_URL, {
    credentials: 'same-origin',
  });
  if (!response.ok) {
    response = await fetch(CONFLUENCE_CLOUD_ID_URL, {
      credentials: 'same-origin',
    });
  }
  if (!response.ok) {
    throw new Error(`Unable to retrieve cloud id. Status: ${response.status}`);
  }

  const { cloudId } = await response.json();
  return cloudId;
};
