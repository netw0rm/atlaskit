import 'es6-promise/auto';
import 'whatwg-fetch';

import { startTrialEndpoint } from './xflowService';
import { fetchCloudId } from './tenantContext';

/**
 * Start a product trial and return a promise that
 * resolves if successful, and rejects if there was a problem
 * @param productKey product key of the product to be activated
 */
export default productKey => async () => {
  const cloudId = await fetchCloudId();
  const response = await fetch(startTrialEndpoint(cloudId), {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_key: productKey,
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to start ${productKey} trial. Status: ${response.status}`);
  }
};
