import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import startProductTrial, {
  START_TRIAL_ENDPOINT,
} from '../../../src/jira-confluence/startConfluenceTrial';

describe('startConfluenceTrial', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return a resolved promise with no value if the endpoint returns a 202 response', async () => {
    fetchMock.mock(START_TRIAL_ENDPOINT, 202);
    const result = await startProductTrial();
    expect(result).toBe(undefined);
  });

  it('should return a rejected promise if the endpoint returns a 400 response', async () => {
    fetchMock.mock(START_TRIAL_ENDPOINT, 400);
    try {
      await startProductTrial();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to start confluence trial. Status: 400'));
    }
  });
});
