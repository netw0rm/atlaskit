import 'es6-promise/auto';
import 'whatwg-fetch';

import { getAtlassianAccountId } from './tenantContext';
import { getEnvAPIUrl } from '../utils/envDetection';

export const makeStorageKey = (productKey) =>
  `xflow.already.requested.${productKey}`;

export const userPreferencesEndpoint = (atlassianAccountId) =>
  `${getEnvAPIUrl()}/user/${atlassianAccountId}/preference/global/xflow`;

/**
 * Set a flag that the user has already requested a trial
 */
export const setAlreadyRequestedFlag = async (productKey) => {
  const atlassianAccountId = await getAtlassianAccountId();
  const url = userPreferencesEndpoint(atlassianAccountId);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({
      key: makeStorageKey(productKey),
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
  const atlassianAccountId = await getAtlassianAccountId();
  const url = `${userPreferencesEndpoint(atlassianAccountId)}?key=${makeStorageKey(productKey)}`;

  const response = await fetch(url, {
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    return data.value;
  }
  return false;
};
