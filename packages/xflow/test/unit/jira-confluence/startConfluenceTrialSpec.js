import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import startProductTrial from '../../../src/jira-confluence/startConfluenceTrial';

import { startTrialEndpoint } from '../../../src/common/startProductTrial';

describe('startConfluenceTrial', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return a resolved promise with no value if the endpoint returns a 202 response', async () => {
    fetchMock.mock(startTrialEndpoint('confluence.ondemand'), 202);
    const result = await startProductTrial();
    expect(result).toBe(undefined);
  });

  it('should return a rejected promise if the endpoint returns a 400 response', async () => {
    fetchMock.mock(startTrialEndpoint('confluence.ondemand'), 400);
    try {
      await startProductTrial();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to start confluence.ondemand trial. Status: 400'));
    }
  });
});
