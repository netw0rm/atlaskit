import 'es6-promise/auto';
import 'whatwg-fetch';

export const startTrialEndpoint = (productKey) => `/admin/rest/billing/api/product/${productKey}/activate`;

/**
 * Start a product trial and return a promise that
 * resolves if successful, and rejects if there was a problem
 * @param productKey product key of the product to be activated
 */
export default (productKey) => async () => {
  const response = await fetch(startTrialEndpoint(productKey), {
    credentials: 'same-origin',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Unable to start ${productKey} trial. Status: ${response.status}`);
  }
};
