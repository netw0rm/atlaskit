import 'es6-promise/auto';
import 'whatwg-fetch';
import { fetchInstanceAdminsEndpoint } from './xflowService';
import { fetchCloudId } from './tenantContext';

export default async function retrieveAdminIds() {
  const cloudId = await fetchCloudId();
  const endpoint = fetchInstanceAdminsEndpoint(cloudId);
  const response = await fetch(endpoint, {
    credentials: 'include',
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Unable to retrieve instance admins. Status: ${response.status}`);
  }

  return response.json();
}
