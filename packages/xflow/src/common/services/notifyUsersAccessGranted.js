import 'es6-promise/auto';
import 'whatwg-fetch';

import { fetchCurrentUser, getInstanceName, getAvatarUrl } from './tenantContext';
import { notifyAccessEndpoint } from './xflowService';

function getAtlassianAccountId({ attributes: { attributes } }) {
  if (!attributes) return '';
  const openIdAttr = attributes.find(attr => attr.name === 'atlassianid.openid.identity');

  return openIdAttr ? openIdAttr.values[0] : '';
}

async function notifyUsers(endpoint, instance, grantedAccessBy, grantedAccessTo, productKey) {
  const response = await fetch(endpoint, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product: productKey,
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

  return await response.json();
}

export default async (users, productKey) => {
  if (users.length === 0) {
    return {
      status: 'SENT',
      recipients: [],
    };
  }

  const admin = await fetchCurrentUser();
  const instance = getInstanceName();

  const grantedAccessBy = {
    name: admin.displayName,
    avatar: getAvatarUrl(admin),
  };

  const grantedAccessTo = users.map(user => ({
    name: user['display-name'],
    username: user.name,
    atlassianAccountId: getAtlassianAccountId(user),
  }));

  return await notifyUsers(
    notifyAccessEndpoint(),
    instance,
    grantedAccessBy,
    grantedAccessTo,
    productKey
  );
};
