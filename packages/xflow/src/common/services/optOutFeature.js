import 'es6-promise/auto';
import 'whatwg-fetch';
import { fetchCloudId } from './tenantContext';
import { getEnvAPIUrl } from '../utils/envDetection';

export const xflowNamespace = 'xflow';
export const xflowEnabledProperty = 'xflow.product.suggestions.enabled';
export const xflowEnabledKey = 'product-suggestions-enabled';

export const jiraPreferencesEndpoint = '/rest/api/2/application-properties';

async function updateSiteAdminService() {
  const cloudId = await fetchCloudId();
  const siteAdminServiceEndpoint = `${getEnvAPIUrl()}/site/${cloudId}/setting/${xflowNamespace}/${xflowEnabledKey}`;

  const response = await fetch(siteAdminServiceEndpoint, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'product-suggestions-enabled': false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to set opt-out preferences in Site Admin Service. Status: ${response.status}`);
  }

  return true;
}

async function updateJiraPreferences() {
  const response = await fetch(`${jiraPreferencesEndpoint}/${xflowEnabledProperty}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: xflowEnabledProperty,
      value: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to set opt-out preferences in Jira preferences. Status: ${response.status}`);
  }

  return true;
}

export default async () => {
  await updateSiteAdminService();
  await updateJiraPreferences();

  return true;
};
