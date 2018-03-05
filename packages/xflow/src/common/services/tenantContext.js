/** Utils to query infos about the current tenant = site
 */

import 'es6-promise/auto';
import 'whatwg-fetch';
import { getEnvAPIUrl } from '../utils/envDetection';

export const TENANT_INFO_URL = '/_edge/tenant_info';
export const getMeApiUrl = () => `${getEnvAPIUrl()}/me`;
export const getPermissionApiUrl = () => `${getEnvAPIUrl()}/permissions/permitted`;

function fetchSameOrigin(url, prefix = '', opts = {}) {
  return fetch(url, { credentials: 'same-origin', ...opts })
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

let currentUserPromiseCached = null;
export const fetchCurrentUser = async () => {
  if (!currentUserPromiseCached) {
    try {
      currentUserPromiseCached = await fetchSameOrigin(getMeApiUrl(), 'Me endpoint:');
    } catch (err) {
      err.message = `Unable to retrieve information about current user: ${err.message}`;
      throw err;
    }
  }

  return currentUserPromiseCached;
};

fetchCurrentUser.resetCache = () => {
  currentUserPromiseCached = null;
};

export const fetchCurrentUserDisplayName = () =>
  fetchCurrentUser().then(user => user.name || user.email || '');

export const fetchCurrentUserAvatarUrl = () =>
  fetchCurrentUser().then(user => user.picture);

export const getAtlassianAccountId = () =>
  fetchCurrentUser().then(user => user.account_id);

export const getInstanceName = () => window.location.hostname;

let cachedCloudId = null;
export const fetchCloudId = async () => {
  if (!cachedCloudId) {
    try {
      const response = await fetchSameOrigin(TENANT_INFO_URL, 'Tenant Info:');
      cachedCloudId = response.cloudId;
    } catch (err) {
      err.message = `Unable to retrieve cloud id: ${err.message}`;
      throw err;
    }
  }

  return cachedCloudId;
};

fetchCloudId.resetCache = () => {
  cachedCloudId = null;
};

let canUserAddProductPromiseCached = null;
export const canUserAddProduct = async () => {
  if (!canUserAddProductPromiseCached) {
    const cloudId = await fetchCloudId();

    try {
      const response = await fetchSameOrigin(getPermissionApiUrl(), 'Permissions permitted endpoint:', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permissionId: 'addProduct',
          resourceId: `ari:cloud:platform::site/${cloudId}`,
        }),
      });
      canUserAddProductPromiseCached = response.permitted;
    } catch (err) {
      err.message = `Unable to retrieve addProduct permission: ${err.message}`;
      throw err;
    }
  }

  return canUserAddProductPromiseCached;
};

canUserAddProduct.resetCache = () => {
  canUserAddProductPromiseCached = null;
};
