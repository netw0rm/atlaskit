import { API_URL, API_DEV_URL, getEnvAPIUrl } from '../../../../src/common/utils/envDetection';

describe('envDetection', () => {
  describe('getEnvAPIUrl', () => {
    it('should return the staging API URL if the hostname is localhost', () => {
      const mockWindow = {
        location: {
          hostname: 'localhost',
        },
      };
      expect(getEnvAPIUrl(mockWindow)).toEqual(API_DEV_URL);
    });

    it('should return the production API URL if the hostname ends with jira-dev.com', () => {
      const mockWindow = {
        location: {
          hostname: 'xflow.jira-dev.com',
        },
      };
      expect(getEnvAPIUrl(mockWindow)).toEqual(API_URL);
    });

    it('should return the production API URL if the hostname ends with atlassian.net', () => {
      const mockWindow = {
        location: {
          hostname: 'xflow.atlassian.net',
        },
      };
      expect(getEnvAPIUrl(mockWindow)).toEqual(API_URL);
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
