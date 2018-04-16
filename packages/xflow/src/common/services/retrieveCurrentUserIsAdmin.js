import 'es6-promise/auto';
import 'whatwg-fetch';
import '@atlaskit/polyfills/array-prototype-includes';

import retrieveAdminIds from './retrieveAdminIds';
import { getAtlassianAccountId } from './tenantContext';

export default async function retrieveCurrentUserIsAdmin() {
  const [adminIds, aaid] = await Promise.all([
    retrieveAdminIds(),
    getAtlassianAccountId(),
  ]);

  return adminIds.includes(aaid);
}
