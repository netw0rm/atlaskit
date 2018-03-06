import { API_URL, getEnvAPIUrl } from '../../../../src/common/utils/envDetection';

describe('envDetection', () => {
  describe('getEnvAPIUrl', () => {
    it('should return the API URL if no session storage URL override exists', () => {
      expect(getEnvAPIUrl({})).toEqual(API_URL);
    });

    it('should return the session storage URL override if present', () => {
      const SESSION_STORAGE_VALUE = 'foo';
      const mockSessionStorage = {
        getItem: () => SESSION_STORAGE_VALUE,
      };
      expect(getEnvAPIUrl({}, mockSessionStorage)).toEqual(SESSION_STORAGE_VALUE);
    });
  });
});
