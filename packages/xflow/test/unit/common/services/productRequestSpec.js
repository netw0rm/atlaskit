import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import * as tenantContext from '../../../../src/common/services/tenantContext';
import { productRequestEndpoint } from '../../../../src/common/services/xflowService';
import productRequest from '../../../../src/common/services/productRequest';

const mockRequestTrialEastEndpointWithResponse = (response) => {
  fetchMock.mock(
    productRequestEndpoint(),
    { body: response },
    {
      method: 'POST',
      name: 'REQUEST_TRIAL',
    }
  );
};

describe('productRequest', () => {
  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  beforeEach(() => {
    tenantContext.fetchCloudId = jest.fn().mockReturnValue(Promise.resolve('some-cloud-id'));
    tenantContext.getInstanceName = jest.fn().mockReturnValue('example.atlassian.net');
    tenantContext.fetchCurrentUserAvatarUrl = jest.fn().mockReturnValue(Promise.resolve('some-avatar-url'));
    tenantContext.fetchCurrentUserDisplayName = jest.fn().mockReturnValue(Promise.resolve('Example User'));
  });

  it('should return a resolved promise with no value if the endpoint returns a 200 response', async () => {
    const xflowResponse = { message: 'request received' };
    mockRequestTrialEastEndpointWithResponse(xflowResponse);
    const requestConfluenceTrial = productRequest('confluence.ondemand');
    const result = await requestConfluenceTrial('Please let me innovate');
    expect(result).toEqual(xflowResponse);
    expect(fetchMock.done('REQUEST_TRIAL')).toBe(true);

    const jsonBody = JSON.parse(fetchMock.calls('REQUEST_TRIAL')[0][1].body);
    expect(jsonBody).toEqual(
      expect.objectContaining({
        cloud_id: 'some-cloud-id',
        cloud_instance: 'example.atlassian.net',
        product_key: 'confluence.ondemand',
        requested_access_by_avatar: 'some-avatar-url',
        requested_access_by_name: 'Example User',
        requested_access_comment_text: 'Please let me innovate',
      })
    );
  });

  it('should return a rejected promise if productRequestEndpoint returns a 500 response', async () => {
    fetchMock.mock(productRequestEndpoint(), 500);
    expect.assertions(1);
    const requestConfluenceTrial = productRequest('confluence.ondemand');

    try {
      await requestConfluenceTrial('never to be seen comment');
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to request product: Unable to request product from end user. Status: 500')
      );
    }
  });
});
