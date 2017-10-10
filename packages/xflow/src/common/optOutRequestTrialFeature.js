import 'es6-promise/auto';
import 'whatwg-fetch';

const xflowEnabledProperty = 'xflow.request.trial.enabled';
export const optOutEndpoint = '/rest/growth/1/store/global';

export default async () => {
  const response = await fetch(optOutEndpoint, {
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
    throw new Error(`Unable to complete opt-out request at this time. Status: ${response.status}`);
  }

  return true;
};
