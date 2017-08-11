import 'es6-promise/auto';
import 'whatwg-fetch';

import { getCurrentUsername, queryUsername, getInstanceName } from './tenantContext';

export const NOTIFY_ENDPOINT = 'https://xflow.us-west-1.prod.atl-paas.net/accessgranted';
const DEFAULT_AVATAR_URL = 'https://i2.wp.com/avatar-cdn.atlassian.com/default/96?ssl=1';
const AVATAR_REGEXP = /^https:\/\/avatar-cdn.atlassian.com\/[A-Za-z0-9]+/;

function getAvatarUrl({ avatarUrls }) {
  // Find the largest size key
  const key = Object.keys(avatarUrls || {}).pop();

  if (!key) {
    return DEFAULT_AVATAR_URL;
  }

  const baseUrl = (avatarUrls[key].match(AVATAR_REGEXP) || [])[0];
  const url = baseUrl ? `${baseUrl}?s=128` : avatarUrls[key];
  return url;
}

function getAtlassianAccountId({ attributes: { attributes } }) {
  if (!attributes) return '';
  return attributes.find(attr => attr.name === 'atlassianid.openid.identity') || '';
}

export default async (users) => {
  if (users.length === 0) {
    return;
  }

  const adminUsername = getCurrentUsername();
  const admin = queryUsername(adminUsername);

  const instance = getInstanceName();

  const grantedAccessBy = {
    name: admin.displayName,
    avatar: getAvatarUrl(admin),
  };

  const grantedAccessTo = users.map(user => ({
    name: user.displayName,
    username: user.name,
    atlassianAccountId: getAtlassianAccountId(),
  }));

  const response = await fetch(NOTIFY_ENDPOINT, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instance,
      grantedAccessBy,
      grantedAccessTo,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Unable to notify users that they were granted access. Status: ${response.status}`
    );
  }
};
