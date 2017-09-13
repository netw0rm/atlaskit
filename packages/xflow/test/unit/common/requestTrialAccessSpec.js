import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import * as tenantContext from '../../../src/common/tenantContext';

import requestTrialAccess, {
  REQUEST_TRIAL_ENDPOINT_EAST,
} from '../../../src/common/requestTrialAccess';

const mockRequestTrialEastEndpointWithResponse = (response) => {
  fetchMock.mock(
    REQUEST_TRIAL_ENDPOINT_EAST,
    { body: response },
    {
      method: 'POST',
      name: 'REQUEST_TRIAL',
    }
  );
};

describe('requestTrialAccess', () => {
  beforeEach(() => {
    fetchMock.restore();
    tenantContext.getAvatarUrl = jest.fn().mockReturnValue('some-avatar-url');
    tenantContext.getCloudId = jest.fn().mockReturnValue(Promise.resolve('some-cloud-id'));
    tenantContext.getCurrentUsername = jest.fn().mockReturnValue('exampleUser');
    tenantContext.getInstanceName = jest.fn().mockReturnValue('example.atlassian.net');
    tenantContext.getUserDisplayName = jest.fn().mockReturnValue('example user');
    tenantContext.queryUsername = jest.fn().mockReturnValue(Promise.resolve({}));
  });

  it('should return a resolved promise with no value if the endpoint returns a 200 response', async () => {
    const xflowResponse = { message: 'request received' };
    mockRequestTrialEastEndpointWithResponse(xflowResponse);
    const requestConfluenceTrialAccess = requestTrialAccess('confluence.ondemand');
    const result = await requestConfluenceTrialAccess('Please let me innovate');
    expect(result).toEqual(xflowResponse);
    expect(fetchMock.done('REQUEST_TRIAL')).toBe(true);

    const jsonBody = JSON.parse(fetchMock.calls('REQUEST_TRIAL')[0][1].body);
    expect(jsonBody).toEqual(
      expect.objectContaining({
        cloud_id: 'some-cloud-id',
        cloud_instance: 'example.atlassian.net',
        product_key: 'confluence.ondemand',
        requested_access_by_avatar: 'some-avatar-url',
        requested_access_by_name: 'example user',
        requested_access_comment_text: 'Please let me innovate',
      })
    );
  });

  it('should return a rejected promise if REQUEST_TRIAL_ENDPOINT_EAST returns a 500 response', async () => {
    fetchMock.mock(REQUEST_TRIAL_ENDPOINT_EAST, 500);
    expect.assertions(1);
    const requestConfluenceTrialAccess = requestTrialAccess('confluence.ondemand');

    try {
      await requestConfluenceTrialAccess('never to be seen comment');
    } catch (e) {
      expect(e).toEqual(
        new Error('Unable to request trial: Unable to request trial from end user. Status: 500')
      );
    }
  });
});
