import 'es6-promise/auto';
import 'whatwg-fetch';

import retrieveCurrentUserIsAdmin from '../../../../src/common/services/retrieveCurrentUserIsAdmin';
import retrieveCanManageSubscriptions from '../../../../src/common/services/retrieveCanManageSubscriptions';

jest.mock('../../../../src/common/services/retrieveCurrentUserIsAdmin');

describe('retrieveCanManageSubscriptions', () => {
  afterEach(() => {
    retrieveCurrentUserIsAdmin.mockReset();
  });

  it('retrieveCurrentUserIsAdmin should be mocked', () => {
    expect(jest.isMockFunction(retrieveCurrentUserIsAdmin)).toBe(true);
  });

  it('should return false if isAdmin=false and not call retrieveCurrentUserIsAdmin', async () => {
    const res = await retrieveCanManageSubscriptions({ isAdmin: false });
    expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(0);
    expect(res).toBe(false);
  });

  it('should return true if isAdmin=true and not call retrieveCurrentUserIsAdmin', async () => {
    const res = await retrieveCanManageSubscriptions({ isAdmin: true });
    expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(0);
    expect(res).toBe(true);
  });

  it('should return false if sAdmin=undefined and retrieveCurrentUserIsAdmin returns false', async () => {
    retrieveCurrentUserIsAdmin.mockImplementation(() => false);

    const res = await retrieveCanManageSubscriptions();
    expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(1);
    expect(res).toBe(false);
  });

  it('should return true if isAdmin=undefined and retrieveCurrentUserIsAdmin returns true', async () => {
    retrieveCurrentUserIsAdmin.mockImplementation(() => true);

    const res = await retrieveCanManageSubscriptions();
    expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(1);
    expect(res).toBe(true);
  });
});
