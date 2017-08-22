import 'es6-promise/auto';
import 'whatwg-fetch';
import getMeta from './getMeta';

const SITE_ADMINS_GROUP_NAME = 'site-admins';

export const getCurrentUsername = () => getMeta('ajs-remote-user') || getMeta('remote-username');

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
