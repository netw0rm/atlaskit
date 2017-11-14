import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import {
  isCurrentUserSiteAdmin,
  fetchCloudId,
  fetchCurrentUser,
  JIRA_CLOUD_ID_URL,
  CONFLUENCE_CLOUD_ID_URL,
} from '../../../../src/common/services/tenantContext';
import jiraAdminResponse from '../mock-data/fetchUserAndGroupsJiraAdmin.json';
import nonAdminResponse from '../mock-data/fetchUserAndGroupsNonAdmin.json';
import siteAdminResponse from '../mock-data/fetchUserAndGroupsSiteAdmin.json';

const mockEndpointWithResponse = (response) => {
  const url = '/rest/api/2/myself?expand=groups';
  fetchMock.mock(url, response, { method: 'GET' });
};

const mockEndpointWithFailureStatus = (status) => {
  const url = '/rest/api/2/myself?expand=groups';
  fetchMock.mock(url, status);
};

describe('tenantContext', () => {
  afterEach(fetchMock.restore);
  afterEach(() => fetchCurrentUser.resetCache());

  describe('fetchCloudId()', () => {
    it('should return the expected cloud id from Jira', async () => {
      const EXPECTED_CLOUD_ID = 'not-an-instance-name';
      fetchMock.mock(JIRA_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID }, { method: 'GET' });
      const result = await fetchCloudId();
      return expect(result).toBe(EXPECTED_CLOUD_ID);
    });

    it('should return the expected cloud id from Confluence if Jira fails', async () => {
      const EXPECTED_CLOUD_ID = 'instance-without-jira';
      fetchMock.mock(JIRA_CLOUD_ID_URL, 500);
      fetchMock.mock(CONFLUENCE_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID }, { method: 'GET' });
      const result = await fetchCloudId();
      return expect(result).toBe(EXPECTED_CLOUD_ID);
    });

    it('will reject with an error if both endpoints return a 500', async () => {
      expect.assertions(1);
      fetchMock.mock(JIRA_CLOUD_ID_URL, 500);
      fetchMock.mock(CONFLUENCE_CLOUD_ID_URL, 500);
      try {
        await fetchCloudId();
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve cloud id. Status: 500')
        );
      }
    });
  });

  describe('isCurrentUserSiteAdmin', () => {
    it('will return false if he/she is only a Jira administrator', async () => {
      mockEndpointWithResponse(jiraAdminResponse);
      const result = await isCurrentUserSiteAdmin();
      return expect(result).toBe(false);
    });

    it('will return false if she/he is not an admin', async () => {
      mockEndpointWithResponse(nonAdminResponse);
      const result = await isCurrentUserSiteAdmin();
      return expect(result).toBe(false);
    });

    it('will return true if she/he is a site admin', async () => {
      mockEndpointWithResponse(siteAdminResponse);
      const result = await isCurrentUserSiteAdmin();
      return expect(result).toBe(true);
    });

    it('will reject with an error if the endpoint returns a 404', async () => {
      expect.assertions(1);
      mockEndpointWithFailureStatus(404);
      try {
        await isCurrentUserSiteAdmin();
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve information about current user. Status: 404')
        );
      }
    });

    it('will reject with an error if the endpoint returns a 500', async () => {
      expect.assertions(1);
      mockEndpointWithFailureStatus(500);
      try {
        await isCurrentUserSiteAdmin();
      } catch (e) {
        expect(e).toEqual(
          new Error('Unable to retrieve information about current user. Status: 500')
        );
      }
    });
  });
});
