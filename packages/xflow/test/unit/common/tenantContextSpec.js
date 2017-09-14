import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import { isUserTrusted, getUserDisplayName } from '../../../src/common/tenantContext';
import jiraAdminResponse from './../jira-confluence/mock-data/isUserTrustedJiraAdmin.json';
import nonAdminResponse from './../jira-confluence/mock-data/isUserTrustedNonAdmin.json';
import siteAdminResponse from './../jira-confluence/mock-data/isUserTrustedSiteAdmin.json';
import queryUsernameResponse from './../jira-confluence/mock-data/queryUsername.json';

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
          new Error('Unable to determine if the user was a site administrator. Status: 404')
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
          new Error('Unable to determine if the user was a site administrator. Status: 500')
        );
      }
    });
  });

  describe('isUserTrusted', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('will return false if they are only a JIRA administrator', async () => {
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
          new Error('Unable to determine if the user was a site administrator. Status: 404')
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
          new Error('Unable to determine if the user was a site administrator. Status: 500')
        );
      }
    });
  });
});
