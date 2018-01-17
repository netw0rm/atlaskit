import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import optOutFeature, {
  optOutEndpoint,
} from '../../../../src/common/services/optOutFeature';

describe('optOutFeature', () => {
  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  it('should return a resolved promise with no value if the endpoint returns a 204 response', async () => {
    fetchMock.mock(optOutEndpoint, 204);
    const result = await optOutFeature();
    expect(result).toEqual(true);
  });

  it('should return a rejected promise if the endpoint returns a 400 response', async () => {
    fetchMock.mock(optOutEndpoint, 400);
    try {
      await optOutFeature();
    } catch (e) {
      expect(e).toEqual(new Error('Unable to complete opt-out request at this time. Status: 400'));
    }
  });
});
