/* eslint-disable jest/no-disabled-tests */
import 'es6-promise/auto';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import notifyUsersAccessGranted, {
  NOTIFY_ENDPOINT,
} from '../../../src/jira-confluence/notifyUsersAccessGranted';

import notifyUsersAccessGrantedResponse from './mock-data/notifyUsersAccessGranted.json';

chai.use(chaiAsPromised);

const TEST_ADMIN_DISPLAY_NAME = 'The Administrator';
const TEST_INSTANCE_NAME = 'acme.atlassian.net';
const TEST_USERNAME = 'admin%40acme.org';

const NEVER_CALL_ENDPOINT = 'NEVER_CALL_ENDPOINT';
const shouldNeverContactEndpoint = () => {
  fetchMock.mock(NOTIFY_ENDPOINT, {}, { name: NEVER_CALL_ENDPOINT });
};

describe('notifyUsersAccessGranted', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return a resolved promise with no value and it should never contact the endpoint', async () => {
    shouldNeverContactEndpoint();
    const result = await notifyUsersAccessGranted([]);
    expect(result).toBe(undefined);
    expect(fetchMock.done(NEVER_CALL_ENDPOINT)).toBe(false);
  });

  xit(
    'should return a resolved promise with no value if the endpoint returns a 200 response',
    async () => {
      fetchMock.mock(NOTIFY_ENDPOINT, notifyUsersAccessGrantedResponse);
      const result = await notifyUsersAccessGranted(['a']);
      expect(result).toBe(undefined);
    }
  );

  xit('should return a rejected promise if the endpoint returns a 400 response', () => {
    fetchMock.mock(NOTIFY_ENDPOINT, 400);
    return assert.isRejected(
      notifyUsersAccessGranted(TEST_ADMIN_DISPLAY_NAME, TEST_INSTANCE_NAME, TEST_USERNAME, ['a']),
      /400/
    );
  });
});
