import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import optOutFeature, {
  jiraPreferencesEndpoint, retrieveIsOptOutEnabled,
  xflowEnabledKey,
  xflowEnabledProperty,
  xflowNamespace,
} from '../../../../src/common/services/optOutFeature';

import { getEnvAPIUrl } from '../../../../src/common/utils/envDetection';
import { TENANT_INFO_URL } from '../../../../src/common/services/tenantContext';
import retrieveCurrentUserIsAdmin from '../../../../src/common/services/retrieveCurrentUserIsAdmin';

jest.mock('../../../../src/common/services/retrieveCurrentUserIsAdmin');

const EXPECTED_CLOUD_ID = 'I-m-a-cloud-id';
const apiUrl = getEnvAPIUrl({
  location: { hostname: 'example.atlassian.net' },
});
describe('optOutFeature', () => {
  beforeEach(() => {
    fetchMock.getOnce(TENANT_INFO_URL, { cloudId: EXPECTED_CLOUD_ID });
    fetchMock.catch(417);
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return a resolved promise with no value if both endpoints return a 204 response', async () => {
    fetchMock.mock(`${jiraPreferencesEndpoint}/${xflowEnabledProperty}`, 204);
    fetchMock.mock(
      `${apiUrl}/site/${EXPECTED_CLOUD_ID}/setting/${xflowNamespace}/${xflowEnabledKey}`,
      204
    );
    const result = await optOutFeature();
    expect(result).toEqual(true);
  });

  it('should return a rejected promise if the site admin service endpoint returns a 400 response', async () => {
    fetchMock.mock(`${jiraPreferencesEndpoint}/${xflowEnabledProperty}`, 204);
    fetchMock.mock(
      `${apiUrl}/site/${EXPECTED_CLOUD_ID}/setting/${xflowNamespace}/${xflowEnabledKey}`,
      400
    );
    try {
      await optOutFeature();
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to set opt-out preferences in Site Admin Service. Status: 400')
      );
    }
  });

  it('should return a rejected promise if the jira preferences endpoint returns a 400 response', async () => {
    fetchMock.mock(`${jiraPreferencesEndpoint}/${xflowEnabledProperty}`, 400);
    fetchMock.mock(
      `${apiUrl}/site/${EXPECTED_CLOUD_ID}/setting/${xflowNamespace}/${xflowEnabledKey}`,
      204
    );
    try {
      await optOutFeature();
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to set opt-out preferences in Jira preferences. Status: 400')
      );
    }
  });

  describe('retrieveIsOptOutEnabled', () => {
    afterEach(() => {
      retrieveCurrentUserIsAdmin.mockReset();
    });

    it('retrieveCurrentUserIsAdmin should be mocked', () => {
      expect(jest.isMockFunction(retrieveCurrentUserIsAdmin)).toBe(true);
    });

    it('should return false if isCrossSell=false and not call retrieveCurrentUserIsAdmin', async () => {
      const res = await retrieveIsOptOutEnabled({ isCrossSell: false });
      expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(0);
      expect(res).toBe(false);
    });

    it('should return false if isCrossSell=true, isAdmin=false and not call retrieveCurrentUserIsAdmin', async () => {
      const res = await retrieveIsOptOutEnabled({ isCrossSell: true, isAdmin: false });
      expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(0);
      expect(res).toBe(false);
    });

    it('should return true if isCrossSell=true, isAdmin=true and not call retrieveCurrentUserIsAdmin', async () => {
      const res = await retrieveIsOptOutEnabled({ isCrossSell: true, isAdmin: true });
      expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(0);
      expect(res).toBe(true);
    });

    it('should return false if isCrossSell=true, isAdmin=undefined and retrieveCurrentUserIsAdmin returns false', async () => {
      retrieveCurrentUserIsAdmin.mockImplementation(() => false);

      const res = await retrieveIsOptOutEnabled({ isCrossSell: true });
      expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(1);
      expect(res).toBe(false);
    });

    it('should return true if isCrossSell=true, isAdmin=undefined and retrieveCurrentUserIsAdmin returns true', async () => {
      retrieveCurrentUserIsAdmin.mockImplementation(() => true);

      const res = await retrieveIsOptOutEnabled({ isCrossSell: true });
      expect(retrieveCurrentUserIsAdmin.mock.calls).toHaveLength(1);
      expect(res).toBe(true);
    });
  });
});
