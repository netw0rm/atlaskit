import 'es6-promise/auto';
import 'whatwg-fetch';

export const GLOBAL_ANALYTICS_ENDPOINT = 'https://mgas.prod.public.atl-paas.net/v1/events';
const NOTIFY_EVENT_NAME = 'grow4785.confluence.access.granted';
const JIRA_PRODUCT = 'jira';

export const createPayload = (adminDisplayName, instanceName, userId, usernames) => {
  const now = Date.now();
  const events = usernames.map(username => ({
    name: NOTIFY_EVENT_NAME,
    server: instanceName,
    product: JIRA_PRODUCT,
    user: userId,
    serverTime: now,
    properties: {
      granted_to_user: username,
      send_notification: true,
      adminDisplayName,
    },
  }));
  return { events };
};

export default async (adminDisplayName, instanceName, userId, usernames) => {
  if (usernames.length === 0) {
    return null;
  }

  const response = await fetch(GLOBAL_ANALYTICS_ENDPOINT, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPayload(adminDisplayName, instanceName, userId, usernames)),
  });

  if (!response.ok) {
    throw new Error(
      `Unable to notify users that they were granted access. Status: ${response.status}`
    );
  }
  return null;
};
