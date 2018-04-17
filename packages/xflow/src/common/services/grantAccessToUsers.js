import 'es6-promise/auto';
import 'whatwg-fetch';
import notifyUsersAccessGranted from './notifyUsersAccessGranted';
import { grantAccessToProduct } from './xflowService';
import { fetchCloudId } from './tenantContext';

/**
 * Grants access to users to a particular product
 * @param productKey
 */
export default productKey => {
  async function grantAccess(userIds, shouldFireFirstUserAddedDuration) {
    const cloudId = await fetchCloudId();
    const response = await fetch(grantAccessToProduct(cloudId), {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({
        productKey,
        userIds,
        shouldFireFirstUserAddedDuration,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to grant access to ${productKey}. Status: ${response.status}`);
    }
  }
  return async (users, notifyUsers = true, shouldFireFirstUserAddedDuration = true) => {
    await grantAccess(users.map(user => user.id), shouldFireFirstUserAddedDuration);

    if (notifyUsers) {
      await notifyUsersAccessGranted(users, productKey);
    }
  };
};
