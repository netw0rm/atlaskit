import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import {
  isUserTrusted,
  getUserDisplayName,
  getCloudId,
  JIRA_CLOUD_ID_URL,
  CONFLUENCE_CLOUD_ID_URL,
} from '../../../../src/common/services/tenantContext';
import jiraAdminResponse from '../mock-data/isUserTrustedJiraAdmin.json';
import nonAdminResponse from '../mock-data/isUserTrustedNonAdmin.json';
import siteAdminResponse from '../mock-data/isUserTrustedSiteAdmin.json';
import queryUsernameResponse from '../mock-data/queryUsername.json';

const TEST_USERNAME = 'admin%40acme.org';

const mockEndpointWithResponse = (response) => {
  const url = `/rest/api/latest/user?expand=groups&username=${encodeURIComponent(TEST_USERNAME)}`;
  fetchMock.mock(url, response, { method: 'GET' });
};

const mockEndpointWithFailureStatus = (status) => {
  const url = `/rest/api/latest/user?expand=groups&username=${encodeURIComponent(TEST_USERNAME)}`;
  fetchMock.mock(url, status);
};

describe('tenantContext', () => {
  describe('getCloudId', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('should return the expected cloud id from Jira', async () => {
      const EXPECTED_CLOUD_ID = 'not-an-instance-name';
      fetchMock.mock(JIRA_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID }, { method: 'GET' });
      const result = await getCloudId();
      return expect(result).toBe(EXPECTED_CLOUD_ID);
    });

    it('should return the expected cloud id from Confluence if Jira fails', async () => {
      const EXPECTED_CLOUD_ID = 'instance-without-jira';
      fetchMock.mock(JIRA_CLOUD_ID_URL, 500);
      fetchMock.mock(CONFLUENCE_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID }, { method: 'GET' });
      const result = await getCloudId();
      return expect(result).toBe(EXPECTED_CLOUD_ID);
    });

    it('will reject with an error if both endpoints return a 500', async () => {
      expect.assertions(1);
      fetchMock.mock(JIRA_CLOUD_ID_URL, 500);
      fetchMock.mock(CONFLUENCE_CLOUD_ID_URL, 500);
      try {
        await getCloudId();
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve cloud id. Status: 500')
        );
      }
    });
  });

  describe('getUserDisplayName', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('should return the expected display name', async () => {
      const EXPECTED_DISPLAY_NAME = 'Alex Smith';
      mockEndpointWithResponse(queryUsernameResponse);
      const result = await getUserDisplayName(TEST_USERNAME);
      return expect(result).toBe(EXPECTED_DISPLAY_NAME);
    });

    it('will reject with an error if the endpoint returns a 404', async () => {
      expect.assertions(1);
      mockEndpointWithFailureStatus(404);
      try {
        await getUserDisplayName(TEST_USERNAME);
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve information about a user. Status: 404')
        );
      }
    });

    it('will reject with an error if the endpoint returns a 500', async () => {
      expect.assertions(1);
      mockEndpointWithFailureStatus(500);
      try {
        await getUserDisplayName(TEST_USERNAME);
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve information about a user. Status: 500')
        );
      }
    });
  });

  describe('isUserTrusted', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('will return false if they are only a Jira administrator', async () => {
      mockEndpointWithResponse(jiraAdminResponse);
      const result = await isUserTrusted(TEST_USERNAME);
      return expect(result).toBe(false);
    });

    it('will return false if they are a non-administrator', async () => {
      mockEndpointWithResponse(nonAdminResponse);
      const result = await isUserTrusted(TEST_USERNAME);
      return expect(result).toBe(false);
    });

    it('will return true if they are a site administrator', async () => {
      mockEndpointWithResponse(siteAdminResponse);
      const result = await isUserTrusted(TEST_USERNAME);
      return expect(result).toBe(true);
    });

    it('will reject with an error if the endpoint returns a 404', async () => {
      expect.assertions(1);
      mockEndpointWithFailureStatus(404);
      try {
        await isUserTrusted(TEST_USERNAME);
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve information about a user. Status: 404')
        );
      }
    });

    it('will reject with an error if the endpoint returns a 500', async () => {
      expect.assertions(1);
      mockEndpointWithFailureStatus(500);
      try {
        await isUserTrusted(TEST_USERNAME);
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve information about a user. Status: 500')
        );
      }
    });
  });
});
