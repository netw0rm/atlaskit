import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import startProductTrial, { START_TRIAL_ENDPOINT } from '../../../src/jira-confluence/startConfluenceTrial';

chai.use(chaiAsPromised);

describe('startConfluenceTrial', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return a resolved promise with no value if the endpoint returns a 202 response', () => {
    fetchMock.mock(START_TRIAL_ENDPOINT, 202);
    return assert.eventually.equal(startProductTrial(), null);
  });

  it('should return a rejected promise if the endpoint returns a 400 response', () => {
    fetchMock.mock(START_TRIAL_ENDPOINT, 400);
    return assert.isRejected(startProductTrial(), /400/);
  });
});
