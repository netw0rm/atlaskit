import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import * as notifyUsersAccessGranted from '../../../../src/common/services/notifyUsersAccessGranted';

import instanceUsers from '../mock-data/instanceUsers.json';

import grantAccessToUsers from '../../../../src/common/services/grantAccessToUsers';

import { TENANT_INFO_URL, fetchCloudId } from '../../../../src/common/services/tenantContext';
import { grantAccessToProduct } from '../../../../src/common/services/xflowService';

const CLOUD_ID = 'INSTANCE_CLOUD_ID';
const PRODUCT_KEY = 'confluence.ondemand';

const mockFetchCloudIdWithSuccess = () => {
  fetchMock.mock(
    TENANT_INFO_URL,
    { cloudId: CLOUD_ID },
    {
      method: 'GET',
      name: 'CloudId',
    }
  );
};

const mockFetchCloudIdWithFailure = status => {
  fetchMock.mock(TENANT_INFO_URL, status);
};

const mockGrantAccessToUsersWithSuccess = () => {
  fetchMock.mock(grantAccessToProduct(CLOUD_ID), 200, {
    method: 'PUT',
    name: 'GrantAccessToUsers',
  });
};

const mockGrantAccessToUsersWithFailure = status => {
  fetchMock.mock(grantAccessToProduct(CLOUD_ID), status);
};

describe('grantAccessToUsers', () => {
  let confluenceGrantAccessToUsers;

  beforeEach(() => {
    confluenceGrantAccessToUsers = grantAccessToUsers(PRODUCT_KEY);
    fetchMock.catch(417);
  });
  afterEach(() => {
    fetchMock.restore();
    fetchCloudId.resetCache();
  });

  it('will give access to the users from a specific product', async () => {
    mockFetchCloudIdWithSuccess();
    mockGrantAccessToUsersWithSuccess();

    await confluenceGrantAccessToUsers(instanceUsers, false);

    expect(fetchMock.done('CloudId')).toBe(true);

    const grantAccessToUsersCalledWith = JSON.parse(
      fetchMock.calls('GrantAccessToUsers')[0][1].body
    );
    expect(grantAccessToUsersCalledWith).toEqual(
      expect.objectContaining({
        productKey: PRODUCT_KEY,
        userIds: instanceUsers.map(user => user.id),
        shouldFireFirstUserAddedDuration: true,
      })
    );
  });

  it('will notify the users being given access to the product specified', async () => {
    mockFetchCloudIdWithSuccess();
    mockGrantAccessToUsersWithSuccess();

    notifyUsersAccessGranted.default = jest.fn().mockReturnValue(Promise.resolve());

    await confluenceGrantAccessToUsers(instanceUsers);

    expect(notifyUsersAccessGranted.default).toHaveBeenCalledWith(instanceUsers, PRODUCT_KEY);
  });

  it('will reject with an error if the notifying users fails', async () => {
    expect.assertions(1);
    mockFetchCloudIdWithSuccess();
    mockGrantAccessToUsersWithSuccess();

    notifyUsersAccessGranted.default = jest
      .fn()
      .mockReturnValue(Promise.reject(new Error('Failed to notify Users')));

    try {
      await confluenceGrantAccessToUsers(instanceUsers);
    } catch (e) {
      expect(e).toEqual(new Error('Failed to notify Users'));
    }
  });

  it('will reject with an error if the fetchCloudId returns a 404', async () => {
    expect.assertions(1);
    mockFetchCloudIdWithFailure(404);
    mockGrantAccessToUsersWithSuccess();
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to retrieve cloud id: Tenant Info: fetch error, status = 404!')
      );
    }
  });

  it('will reject with an error if the fetchCloudId returns a 500', async () => {
    expect.assertions(1);
    mockFetchCloudIdWithFailure(500);
    mockGrantAccessToUsersWithSuccess();
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to retrieve cloud id: Tenant Info: fetch error, status = 500!')
      );
    }
  });

  it('will reject with an error if the grantAccessToUsers endpoint returns a 404', async () => {
    expect.assertions(1);
    mockFetchCloudIdWithSuccess();
    mockGrantAccessToUsersWithFailure(404);
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to grant access to confluence.ondemand. Status: 404'));
    }
  });

  it('will reject with an error if the grantAccessToUsers endpoint returns a 500', async () => {
    expect.assertions(1);
    mockFetchCloudIdWithSuccess();
    mockGrantAccessToUsersWithFailure(500);
    try {
      await confluenceGrantAccessToUsers([], false);
    } catch (e) {
      expect(e).toEqual(new Error('Unable to grant access to confluence.ondemand. Status: 500'));
    }
  });
});
