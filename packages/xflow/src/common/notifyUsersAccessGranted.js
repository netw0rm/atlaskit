import 'es6-promise/auto';
import 'whatwg-fetch';

import { getCurrentUsername, queryUsername, getInstanceName, getAvatarUrl } from './../common/tenantContext';

export const NOTIFY_ENDPOINT_EAST = 'https://api-private.atlassian.com/xflow/notify-users-of-product-access';

function getAtlassianAccountId({ attributes: { attributes } }) {
  if (!attributes) return '';
  const openIdAttr = attributes.find(attr => attr.name === 'atlassianid.openid.identity');

  return openIdAttr ? openIdAttr.values[0] : '';
}

async function notifyUsers(endpoint, instance, grantedAccessBy, grantedAccessTo, productKey) {
  const response = await fetch(endpoint, {
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

  const adminUsername = getCurrentUsername();
  const admin = await queryUsername(adminUsername);
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
    NOTIFY_ENDPOINT_EAST,
    instance,
    grantedAccessBy,
    grantedAccessTo,
    productKey
  );
};
