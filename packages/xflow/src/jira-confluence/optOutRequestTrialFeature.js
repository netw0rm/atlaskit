import 'es6-promise/auto';
import 'whatwg-fetch';

const xflowEnabledProperty = 'xflow.non.admin.request.enabled.jira.confluence';
export const optOutEndpoint = `/rest/api/2/application-properties/${xflowEnabledProperty}`;

export default async () => {
  const response = await fetch(optOutEndpoint, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: xflowEnabledProperty,
      value: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to complete opt-out request at this time. Status: ${response.status}`);
  }

  return response.json();
};
