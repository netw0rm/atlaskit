import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import {
  getMeApiUrl,
  fetchCurrentUser,
  TENANT_INFO_URL,
} from '../../../../src/common/services/tenantContext';

import {
  userPreferencesEndpoint,
  makeStorageKey,
  setAlreadyRequestedFlag,
  getAlreadyRequestedFlag,
} from '../../../../src/common/services/alreadyRequestedFlag';

describe('alreadyRequestedFlag', () => {
  const TEST_PRODUCT_KEY = 'Foo';
  const MOCK_ATLASSIAN_ACCOUNT_ID = 'AccountID';
  const MOCK_CLOUD_ID = 'CloudID';

  beforeEach(() => {
    fetchMock.getOnce(getMeApiUrl, {
      account_id: MOCK_ATLASSIAN_ACCOUNT_ID,
    });

    fetchMock.getOnce(TENANT_INFO_URL, {
      cloudId: MOCK_CLOUD_ID,
    });

    fetchMock.catch(417);
  });

  afterEach(() => {
    fetchMock.restore();
    fetchCurrentUser.resetCache();
  });

  describe('getAlreadyRequestedFlag()', () => {
    function mockUserPreferencesGetEndpointWithResponse(response, productKey) {
      const matcher = `${userPreferencesEndpoint(MOCK_ATLASSIAN_ACCOUNT_ID)}?key=${makeStorageKey(productKey)}` +
        `&context=${MOCK_CLOUD_ID}`;
      fetchMock
        .getOnce(matcher, response);
      return matcher; // for assertions
    }

    it('should return a promise resolved with TRUE if the flag was previously set', async () => {
      const matcher = mockUserPreferencesGetEndpointWithResponse(
        [{ value: true }],
        TEST_PRODUCT_KEY
      );

      const result = await getAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(result).toEqual(true);
      expect(fetchMock.done(matcher)).toBe(true);
    });

    it('should return a promise resolved with FALSE if the flag was NOT previously set', async () => {
      const matcher = mockUserPreferencesGetEndpointWithResponse(
        [{ value: false }],
        TEST_PRODUCT_KEY
      );

      const result = await getAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(result).toEqual(false);
      expect(fetchMock.done(matcher)).toBe(true);
    });

    it('should return a promise resolved with FALSE if the endpoint returns an error', async () => {
      const matcher = mockUserPreferencesGetEndpointWithResponse(500, TEST_PRODUCT_KEY);

      const result = await getAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(result).toEqual(false);
      expect(fetchMock.done(matcher)).toBe(true);
    });
  });

  describe('setAlreadyRequestedFlag()', () => {
    function mockUserPreferencesPutEndpointWithResponse(response) {
      const matcher = userPreferencesEndpoint(MOCK_ATLASSIAN_ACCOUNT_ID);
      fetchMock
        .putOnce(matcher, response);
      return matcher; // for assertions
    }

    it('should properly call the expected endpoint', async () => {
      const matcher = mockUserPreferencesPutEndpointWithResponse(200);

      await setAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(fetchMock.done(matcher)).toBe(true);
      expect(fetchMock.lastCall(matcher)[1].body).toBe(JSON.stringify({
        key: makeStorageKey(TEST_PRODUCT_KEY),
        context: MOCK_CLOUD_ID,
        value: true,
      }));
    });

    it('should properly resolve to undef on success', async () => {
      const matcher = mockUserPreferencesPutEndpointWithResponse(200);

      const result = await setAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(result).toBeUndefined();
      expect(fetchMock.done(matcher)).toBe(true);
      expect(fetchMock.lastCall(matcher)[1].body).toBe(JSON.stringify({
        key: makeStorageKey(TEST_PRODUCT_KEY),
        context: MOCK_CLOUD_ID,
        value: true,
      }));
    });

    it('should properly reject on failure', async () => {
      const matcher = mockUserPreferencesPutEndpointWithResponse(400);
      expect.assertions(3);

      try {
        await setAlreadyRequestedFlag(TEST_PRODUCT_KEY);
      } catch (err) {
        expect(err).toEqual(new Error('Unable to set alreadyRequested flag. Status: 400'));
        expect(fetchMock.done(matcher)).toBe(true);
        expect(fetchMock.lastCall(matcher)[1].body).toBe(JSON.stringify({
          key: makeStorageKey(TEST_PRODUCT_KEY),
          context: MOCK_CLOUD_ID,
          value: true,
        }));
      }
    });
  });
});
