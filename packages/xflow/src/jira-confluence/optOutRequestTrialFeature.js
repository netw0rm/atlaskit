import 'es6-promise/auto';
import 'whatwg-fetch';

const xflowEnabledProperty = 'xflow.non.admin.request.enabled.jira.confluence';

export default async selectedOption => {
  const response = await fetch(`/jira/rest/api/2/application-properties/${xflowEnabledProperty}`, {
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

  return response.json();
};
