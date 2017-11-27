import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import {
  isCurrentUserSiteAdmin,
  fetchCloudId,
  fetchCurrentUser,
  JIRA_CLOUD_ID_URL,
  CONFLUENCE_CLOUD_ID_URL,
  JIRA_CURRENT_USER_AND_GROUPS_URL,
  CONFLUENCE_CURRENT_USER_URL,
  CONFLUENCE_USER_GROUPS_URL,
} from '../../../../src/common/services/tenantContext';
import jiraAdminResponse from '../mock-data/fetchUserAndGroupsJiraAdmin.json';
import nonAdminResponse from '../mock-data/fetchUserAndGroupsNonAdmin.json';
import siteAdminResponse from '../mock-data/fetchUserAndGroupsSiteAdmin.json';

describe('tenantContext', () => {
  const DUMMY_HTML_SINCE_NO_ENDPOINT = '<html>some html...'; // real case when a url is not recognized -> returns home page

  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);
  afterEach(() => fetchCurrentUser.resetCache());

  describe('fetchCurrentUser()', () => {
    const EXPECTED_USER = {
      displayName: 'foo',
      accountId: '12345',
      groups: {
        items: [
          {
            name: 'site-admins',
            self: 'https://foo',
          },
        ],
      },
    };

    describe('when in a JIRA-only instance', () => {
      it('should return the current user', async () => {
        fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, EXPECTED_USER);
        fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
        const result = await fetchCurrentUser();
        return expect(result).toEqual(EXPECTED_USER);
      });
    });

    describe('when in a Confluence-only instance', () => {
      it('should return the current user', async () => {
        fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
        fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, {
          displayName: 'foo',
          accountId: '12345',
          // no groups
        });
        fetchMock.getOnce(CONFLUENCE_USER_GROUPS_URL(EXPECTED_USER.accountId), {
          results: [
            {
              name: 'site-admins',
              self: 'https://foo',
            },
          ],
        });
        const result = await fetchCurrentUser();
        return expect(result).toEqual(EXPECTED_USER);
      });
    });

    describe('when in a Confluence + Jira instance', () => {
      it('should return the current user', async () => {
        fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, EXPECTED_USER);
        fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, {
          displayName: 'foo',
          accountId: '12345',
          // no groups
        });
        fetchMock.getOnce(CONFLUENCE_USER_GROUPS_URL(EXPECTED_USER.accountId), {
          results: [
            {
              name: 'site-admins',
              self: 'https://foo',
            },
          ],
        });
        const result = await fetchCurrentUser();
        return expect(result).toEqual(EXPECTED_USER);
      });
    });

    it('should reject with an error if both endpoints return a 500', async () => {
      expect.assertions(1);
      fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, 500);
      fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, 500);
      try {
        await fetchCurrentUser();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve information about current user:')).toBe(true);
      }
    });

    it('should reject with an error if both endpoints are not recognized', async () => {
      expect.assertions(1);
      fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      try {
        await fetchCurrentUser();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve information about current user:')).toBe(true);
      }
    });
  });

  describe('fetchCloudId()', () => {
    const EXPECTED_CLOUD_ID = 'I-m-a-cloud-id';

    describe('when in a JIRA-only instance', () => {
      it('should return the expected cloud id', async () => {
        fetchMock.getOnce(JIRA_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID });
        fetchMock.getOnce(CONFLUENCE_CLOUD_ID_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
        const result = await fetchCloudId();
        return expect(result).toBe(EXPECTED_CLOUD_ID);
      });
    });

    describe('when in a Confluence-only instance', () => {
      it('should return the expected cloud id', async () => {
        fetchMock.getOnce(JIRA_CLOUD_ID_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
        fetchMock.getOnce(CONFLUENCE_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID });
        const result = await fetchCloudId();
        return expect(result).toBe(EXPECTED_CLOUD_ID);
      });
    });

    describe('when in a Confluence + Jira instance', () => {
      it('should return the expected cloud id', async () => {
        fetchMock.getOnce(JIRA_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID });
        fetchMock.getOnce(CONFLUENCE_CLOUD_ID_URL, { cloudId: EXPECTED_CLOUD_ID });
        const result = await fetchCloudId();
        return expect(result).toBe(EXPECTED_CLOUD_ID);
      });
    });

    it('should reject with an error if both endpoints return a 500', async () => {
      expect.assertions(1);
      fetchMock.getOnce(JIRA_CLOUD_ID_URL, 500);
      fetchMock.getOnce(CONFLUENCE_CLOUD_ID_URL, 500);
      try {
        await fetchCloudId();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve cloud id')).toBe(true);
      }
    });

    it('should reject with an error if both endpoints are not recognized', async () => {
      expect.assertions(1);
      fetchMock.getOnce(JIRA_CLOUD_ID_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      fetchMock.getOnce(CONFLUENCE_CLOUD_ID_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      try {
        await fetchCloudId();
      } catch (err) {
        expect(err.message.startsWith('Unable to retrieve cloud id')).toBe(true);
      }
    });
  });

  describe('isCurrentUserSiteAdmin', () => {
    it('will return false if he/she is only a Jira administrator', async () => {
      fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, jiraAdminResponse);
      fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      const result = await isCurrentUserSiteAdmin();
      return expect(result).toBe(false);
    });

    it('will return false if she/he is not an admin', async () => {
      fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, nonAdminResponse);
      fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      const result = await isCurrentUserSiteAdmin();
      return expect(result).toBe(false);
    });

    it('will return true if she/he is a site admin', async () => {
      fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, siteAdminResponse);
      fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, DUMMY_HTML_SINCE_NO_ENDPOINT);
      const result = await isCurrentUserSiteAdmin();
      return expect(result).toBe(true);
    });

    it('will reject with an error if all endpoint have an error', async () => {
      expect.assertions(1);
      fetchMock.getOnce(CONFLUENCE_CURRENT_USER_URL, 500);
      fetchMock.getOnce(JIRA_CURRENT_USER_AND_GROUPS_URL, 500);
      try {
        await isCurrentUserSiteAdmin();
      } catch (err) {
        expect(err.message.startsWith('Unable to check current user site admin rights:')).toBe(true);
      }
    });
  });
});
