import 'es6-promise/auto';
import 'whatwg-fetch';

// This endpoint is Jira specific, will not work for non-Jira -> x flows
export const userPreferencesEndpoint = (productKey) =>
  `/rest/api/2/mypreferences?key=xflow.already.requested.${productKey}`;

/**
 * Set a flag that the user has already requested a trial
 */
export const setAlreadyRequestedFlag = async (productKey) => {
  const response = await fetch(userPreferencesEndpoint(productKey), {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify({
      value: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to set alreadyRequested flag. Status: ${response.status}`);
  }
};

/**
 * Attempt to retrieve the already requested flag
 *
 * Return true if they've requested already, false if they haven't or there's an error
 */
export const getAlreadyRequestedFlag = async (productKey) => {
  const response = await fetch(userPreferencesEndpoint(productKey), {
    credentials: 'same-origin',
  });

  if (response.ok) {
    const data = await response.json();
    return data.value;
  }
  return false;
};
