import 'es6-promise/auto';
import 'whatwg-fetch';

const JIRA_ANALYTICS_ENDPOINT = '/rest/analytics/1.0/publish/bulk';
export default (adminName, usernames) => {
  const events = [{
    name: 'grow9999.event',
    properties: {},
    usernames,
  }];

  return fetch(JIRA_ANALYTICS_ENDPOINT, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(events),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          `Unable to determine if the user was a site administrator. Status: ${response.status}`
        );
      }
    });
};
