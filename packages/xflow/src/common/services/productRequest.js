import 'es6-promise/auto';
import 'whatwg-fetch';

import {
  fetchCloudId,
  getInstanceName,
  fetchCurrentUserAvatarUrl,
  fetchCurrentUserDisplayName,
} from './tenantContext';

import { productRequestEndpoint } from './xflowService';

/**
 * This class will allow a user to request a product trial from site admins on the instance
 * @param productKey product key being activated
 * @returns {*} Response from xflow microservice /requesttrial endpoint
 */
export default (productKey) => async (comment) => {
  try {
    const cloudId = await fetchCloudId();
    const instanceName = getInstanceName();
    const avatar = await fetchCurrentUserAvatarUrl();
    const displayName = await fetchCurrentUserDisplayName();

    const response = await fetch(productRequestEndpoint(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
