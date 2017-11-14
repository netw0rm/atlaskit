import 'es6-promise/auto';
import 'whatwg-fetch';

import {
  getAvatarUrl,
  getCloudId,
  getCurrentUsername,
  getInstanceName,
  getUserDisplayName,
  queryUsername,
} from './tenantContext';

export const PRODUCT_REQUEST_ENDPOINT_EAST =
  'https://api-private.atlassian.com/xflow/request-admins-for-product-trial';

async function getCurrentUserAvatarUrl() {
  const currentUser = getCurrentUsername();
  const userDetails = await queryUsername(currentUser);
  return getAvatarUrl(userDetails);
}

/**
 * This class will allow a user to request a product trial from site admins on the instance
 * @param productKey product key being activated
 * @returns {*} Response from xflow microservice /requesttrial endpoint
 */
export default (productKey) => async (comment) => {
  try {
    const avatar = await getCurrentUserAvatarUrl();
    const cloudId = await getCloudId();
    const displayName = await getUserDisplayName();
    const instanceName = getInstanceName();

    const response = await fetch(PRODUCT_REQUEST_ENDPOINT_EAST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credentials: 'include',
        cloud_id: cloudId,
        cloud_instance: instanceName,
        product_key: productKey,
        requested_access_by_avatar: avatar,
        requested_access_by_name: displayName,
        requested_access_comment_text: comment || '',
      }),
    });

    if (!response.ok) {
      throw new Error(
          `Unable to request product from end user. Status: ${response.status}`
        );
    }

    return await response.json();
  } catch (e) {
    throw new Error(`Unable to request product: ${e.message}`);
  }
};
