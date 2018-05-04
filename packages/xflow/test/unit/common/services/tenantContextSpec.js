import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import {
  canUserAddProduct,
  fetchCloudId,
  fetchCurrentUser,
  TENANT_INFO_URL,
  getMeApiUrl,
  getPermissionApiUrl,
} from '../../../../src/common/services/tenantContext';

describe('tenantContext', () => {
  const DUMMY_HTML_SINCE_NO_ENDPOINT = '<html>some html...'; // real case when a url is not recognized -> returns home page

  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);
  afterEach(() => fetchCurrentUser.resetCache());
  afterEach(() => fetchCloudId.resetCache());

  describe('fetchCurrentUser()', () => {
    const EXPECTED_USER = {
      name: 'mockUsersName',
      account_id: 'mockAccountId',
      picture: 'mockPicture',
    };

    it('should return the current user', async () => {
      fetchMock.getOnce(getMeApiUrl(), EXPECTED_USER);
      const result = await fetchCurrentUser();
      return expect(result).toEqual(EXPECTED_USER);
    });

    it('should return a cached response', async () => {
      fetchMock.getOnce(getMeApiUrl(), EXPECTED_USER);

      const result = await fetchCurrentUser();
      const anotherResult = await fetchCurrentUser();

      return expect(anotherResult).toEqual(result);
    });

    it('should reject with an error if endpoint returns a 500', async () => {
      expect.assertions(1);
      fetchMock.getOnce(getMeApiUrl(), 500);
      try {
        await fetchCurrentUser();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve information about current user:')).toBe(true);
      }
    });

    it('should reject with an error if endpoints is not recognized', async () => {
      expect.assertions(1);
      fetchMock.getOnce(getMeApiUrl(), DUMMY_HTML_SINCE_NO_ENDPOINT);
      try {
        await fetchCurrentUser();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve information about current user:')).toBe(true);
      }
    });
  });

  describe('fetchCloudId()', () => {
    const EXPECTED_CLOUD_ID = 'I-m-a-cloud-id';

    it('should return the expected cloud id', async () => {
      fetchMock.getOnce(TENANT_INFO_URL, { cloudId: EXPECTED_CLOUD_ID });
      const result = await fetchCloudId();
      return expect(result).toBe(EXPECTED_CLOUD_ID);
    });

    it('should return a cached response', async () => {
      fetchMock.getOnce(TENANT_INFO_URL, { cloudId: EXPECTED_CLOUD_ID });
      const result = await fetchCloudId();
      const anotherResult = await fetchCloudId();

      return expect(anotherResult).toBe(result);
    });

    it('should reject with an error if the endpoint return a 500', async () => {
      expect.assertions(1);
      fetchMock.getOnce(TENANT_INFO_URL, 500);
      try {
        await fetchCloudId();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve cloud id')).toBe(true);
      }
    });

    it('should reject with an error if the endpoint is not recognized', async () => {
      expect.assertions(1);
      fetchMock.getOnce(TENANT_INFO_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      try {
        await fetchCloudId();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve cloud id')).toBe(true);
      }
    });
  });

  describe('canUserAddProduct', () => {
    let EXPECTED_OPTS = null;

    beforeEach(() => {
      const EXPECTED_CLOUD_ID = 'I-m-a-cloud-id';
      fetchMock.getOnce(TENANT_INFO_URL, { cloudId: EXPECTED_CLOUD_ID });

      EXPECTED_OPTS = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'core',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permissionId: 'addProduct',
          resourceId: `ari:cloud:platform::site/${EXPECTED_CLOUD_ID}`,
        }),
      };
    });

    afterEach(() => {
      canUserAddProduct.resetCache();
    });

    it('will return false if the endpoint succeeds and returns permitted as false', async () => {
      fetchMock.postOnce(getPermissionApiUrl(), { permitted: false }, EXPECTED_OPTS);

      const result = await canUserAddProduct();
      return expect(result).toBe(false);
    });

    it('will return true if the endpoint succeeds and returns permitted as true', async () => {
      fetchMock.postOnce(getPermissionApiUrl(), { permitted: true }, EXPECTED_OPTS);

      const result = await canUserAddProduct();
      return expect(result).toBe(true);
    });

    it('will reject with an error if the endpoint has an error', async () => {
      expect.assertions(1);
      fetchMock.postOnce(getPermissionApiUrl(), 500, EXPECTED_OPTS);

      try {
        await canUserAddProduct();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve addProduct permission:')).toBe(true);
      }
    });
  });
});
