import 'es6-promise/auto';
import 'whatwg-fetch';
import getMeta from './getMeta';

const SITE_ADMINS_GROUP_NAME = 'site-admins';

export const JIRA_CLOUD_ID_URL = '/rest/product-fabric/1.0/cloud/id';
export const CONFLUENCE_CLOUD_ID_URL = '/wiki/rest/product-fabric/1.0/cloud/id';
const DEFAULT_AVATAR_URL = 'https://i2.wp.com/avatar-cdn.atlassian.com/default/96?ssl=1';
const AVATAR_REGEXP = /^https:\/\/avatar-cdn.atlassian.com\/[A-Za-z0-9]+/;
export const getCurrentUsername = () => getMeta('ajs-remote-user') || getMeta('remote-username');

/**
 * Gets the largest avatar url
 * @param avatarUrls avatar urls, usually from queryUsername response
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

/**
 * Query the user endpoint and retrieve information relating to the specified username.
 *
 * Returns a promise with data. If a problem occurs, reject the promise.
 */
export const queryUsername = username =>
  fetch(
    `/rest/api/latest/user?expand=groups&username=${encodeURIComponent(
      username || getCurrentUsername()
    )}`,
    {
      credentials: 'same-origin',
    }
  ).then((response) => {
    if (response.status !== 200) {
      throw new Error(
        `Unable to determine if the user was a site administrator. Status: ${response.status}`
      );
    } else {
      return response.json();
    }
  });

export const isUserTrusted = username =>
  queryUsername(username || getCurrentUsername()).then((data) => {
    let isSiteAdmin;
    try {
      isSiteAdmin = data.groups.items.some(group => group.name === SITE_ADMINS_GROUP_NAME);
    } catch (e) {
      isSiteAdmin = false;
    }
    return isSiteAdmin;
  });

export const getUserDisplayName = username =>
  queryUsername(username || getCurrentUsername()).then(data => data.displayName || '');

export const getInstanceName = () => window.location.hostname;

/**
 * Attempt to fetch cloud id from JIRA, then Confluence, otherwise throw an error
 */
export const getCloudId = async () => {
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
