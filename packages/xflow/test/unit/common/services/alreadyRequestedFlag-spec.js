import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import {
  userPreferencesEndpoint,
  setAlreadyRequestedFlag,
  getAlreadyRequestedFlag,
} from '../../../../src/common/services/alreadyRequestedFlag';

describe('alreadyRequestedFlag', () => {
  const TEST_PRODUCT_KEY = 'Foo';

  afterEach(fetchMock.restore);

  describe('getAlreadyRequestedFlag()', () => {
    function mockUserPreferencesGetEndpointWithResponse(response, productKey) {
      const matcher = userPreferencesEndpoint(productKey);
      fetchMock
        .getOnce(matcher, response)
        .catch(400);
      return matcher; // for assertions
    }

    it('should return a promise resolved with TRUE if the flag was previously set', async () => {
      const matcher = mockUserPreferencesGetEndpointWithResponse({ value: true }, TEST_PRODUCT_KEY);

      const result = await getAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(result).toEqual(true);
      expect(fetchMock.done(matcher)).toBe(true);
    });

    it('should return a promise resolved with FALSE if the flag was NOT previously set', async () => {
      const matcher = mockUserPreferencesGetEndpointWithResponse(
        { value: false },
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
    function mockUserPreferencesPutEndpointWithResponse(response, productKey) {
      const matcher = userPreferencesEndpoint(productKey);
      fetchMock
        .putOnce(matcher, response)
        .catch(400);
      return matcher; // for assertions
    }

    it('should properly call the expected endpoint', async () => {
      const matcher = mockUserPreferencesPutEndpointWithResponse(200, TEST_PRODUCT_KEY);

      await setAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(fetchMock.done(matcher)).toBe(true);
    });

    it('should properly resolve to undef on success', async () => {
      const matcher = mockUserPreferencesPutEndpointWithResponse(200, TEST_PRODUCT_KEY);

      const result = await setAlreadyRequestedFlag(TEST_PRODUCT_KEY);

      expect(result).toBeUndefined();
      expect(fetchMock.done(matcher)).toBe(true);
    });

    it('should properly reject on failure', async () => {
      const matcher = mockUserPreferencesPutEndpointWithResponse(400, TEST_PRODUCT_KEY);
      expect.assertions(2);

      try {
        await setAlreadyRequestedFlag(TEST_PRODUCT_KEY);
      } catch (err) {
        expect(err).toEqual(new Error('Unable to set alreadyRequested flag. Status: 400'));
        expect(fetchMock.done(matcher)).toBe(true);
      }
    });
  });
});
