import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import optOutRequestTrialFeature, {
  optOutEndpoint,
} from '../../../src/common/optOutRequestTrialFeature';

describe('optOutRequestTrialFeature', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return a resolved promise with no value if the endpoint returns a 204 response', async () => {
    fetchMock.mock(optOutEndpoint, 204);
    const result = await optOutRequestTrialFeature();
    expect(result).toEqual(true);
  });

  it('should return a rejected promise if the endpoint returns a 400 response', async () => {
    fetchMock.mock(optOutEndpoint, 400);
    try {
      await optOutRequestTrialFeature();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to complete opt-out request at this time. Status: 400'));
    }
  });
});
