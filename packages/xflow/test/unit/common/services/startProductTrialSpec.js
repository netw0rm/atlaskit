import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import { startTrialEndpoint } from '../../../../src/common/services/xflowService';
import startProductTrial from '../../../../src/common/services/startProductTrial';
import { TENANT_INFO_URL } from '../../../../src/common/services/tenantContext';

describe('startProductTrial', () => {
  let confluenceStartTrial;
  const CLOUD_ID = 'SOME-CLOUD-ID';
  const PRODUCT_KEY = 'confluence.ondemand';

  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  beforeEach(() => {
    confluenceStartTrial = startProductTrial(PRODUCT_KEY);
  });

  it('should return a resolved promise with no value if the endpoint returns a 202 response', async () => {
    fetchMock.mock(TENANT_INFO_URL, { cloudId: CLOUD_ID });
    fetchMock.mock(startTrialEndpoint(CLOUD_ID), 202);
    const result = await confluenceStartTrial(PRODUCT_KEY);
    expect(result).toBe(undefined);
  });

  it('should return a rejected promise if the endpoint returns a 400 response', async () => {
    fetchMock.mock(TENANT_INFO_URL, { cloudId: CLOUD_ID });
    fetchMock.mock(startTrialEndpoint(CLOUD_ID), 400);
    try {
      await confluenceStartTrial();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to start confluence.ondemand trial. Status: 400'));
    }
  });
});
