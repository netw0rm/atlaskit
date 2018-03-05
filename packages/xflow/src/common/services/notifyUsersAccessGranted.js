import 'es6-promise/auto';
import 'whatwg-fetch';

import { fetchCurrentUser, getInstanceName, fetchCloudId } from './tenantContext';
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

  const [admin, cloudId] = await Promise.all([fetchCurrentUser(), fetchCloudId()]);

  const instance = getInstanceName();

  const grantedAccessBy = {
    name: admin.name,
    avatar: admin.picture,
  };

  const grantedAccessTo = users.map(user => ({
    name: user['display-name'],
    username: user.name,
    atlassianAccountId: getAtlassianAccountId(user),
  }));

  return await notifyUsers(
    notifyAccessEndpoint(cloudId),
    instance,
    grantedAccessBy,
    grantedAccessTo,
    productKey
  );
};
