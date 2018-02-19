import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import optOutFeature, {
  jiraPreferencesEndpoint,
  xflowEnabledKey,
  xflowEnabledProperty,
  xflowNamespace,
} from '../../../../src/common/services/optOutFeature';
import { getEnvAPIUrl } from '../../../../src/common/utils/envDetection';
import { TENANT_INFO_URL } from '../../../../src/common/services/tenantContext';

const EXPECTED_CLOUD_ID = 'I-m-a-cloud-id';
const apiUrl = getEnvAPIUrl({
  location: { hostname: 'example.atlassian.net' },
});
describe('optOutFeature', () => {
  beforeEach(() => {
    fetchMock.getOnce(TENANT_INFO_URL, { cloudId: EXPECTED_CLOUD_ID });
    fetchMock.catch(417);
  });
  afterEach(fetchMock.restore);

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
});
