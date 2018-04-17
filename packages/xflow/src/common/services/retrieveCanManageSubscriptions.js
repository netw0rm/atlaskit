import 'es6-promise/auto';
import retrieveCurrentUserIsAdmin from './retrieveCurrentUserIsAdmin';

/**
 * Check if user can manage subscriptions (only admin can)
 * @param isAdmin Pass this param if isAdmin role already resolved
 *        to avoid additional fetch requests
 * @returns {Promise<bool>}
 */
export default async function retrieveCanManageSubscriptions({ isAdmin } = {}) {
  return isAdmin !== undefined
    ? isAdmin
    : await retrieveCurrentUserIsAdmin();
}
