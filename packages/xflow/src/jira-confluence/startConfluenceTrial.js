import 'es6-promise/auto';
import 'whatwg-fetch';

export const START_TRIAL_ENDPOINT = '/admin/rest/billing/api/product/confluence.ondemand/activate';

/**
 * Start a Confluence trial and return a promise that
 * resolves if successful, and rejects if there was a problem
 */
export default async () => {
  const response = await fetch(START_TRIAL_ENDPOINT, {
    credentials: 'same-origin',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Unable to start confluence trial. Status: ${response.status}`);
  }
};
