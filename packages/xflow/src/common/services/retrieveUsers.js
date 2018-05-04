import 'es6-promise/auto';
import 'whatwg-fetch';
import { fetchInstanceUsersEndpoint } from './xflowService';
import { fetchCloudId } from './tenantContext';

export default async function retrieveUsers() {
  const cloudId = await fetchCloudId();
  const endpoint = fetchInstanceUsersEndpoint(cloudId);
  const response = await fetch(endpoint, {
    credentials: 'include',
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Unable to retrieve instance users. Status: ${response.status}`);
  }

  return response.json();
}
