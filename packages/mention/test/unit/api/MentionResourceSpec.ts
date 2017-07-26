import * as fetchMock from 'fetch-mock/src/client';

import { MentionDescription } from '../../../src/types';
import MentionResource, { HttpError, MentionResourceConfig, SecurityOptions } from '../../../src/api/MentionResource';
import { resultC, resultCraig } from '../_mention-search-results';

const baseUrl = 'https://bogus/mentions';

const defaultSecurityHeader = 'X-Bogus';

const header = (code: string | number): SecurityOptions => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
});

const getSecurityHeader = call => call[0].headers.get(defaultSecurityHeader);

const defaultSecurityCode = '10804';

const apiConfig: MentionResourceConfig = {
  url: baseUrl,
  securityProvider() {
    return header(defaultSecurityCode);
  },
};

function checkOrder(expected, actual) {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    expect(actual[i].length).toBe(expected[i].length);
    if (expected[i].length) {
      for (let j = 0; j < expected[i].length; j++) {
        expect(actual[i][j].id).toBe(expected[i][j].id);
      }
    }
  }
}

describe('MentionResource', () => {
  beforeEach(() => {
    fetchMock
      .mock(/\/mentions\/search\?.*query=craig(&|$)/, {
        body: {
          mentions: resultCraig,
        },
      })
      .mock(/\/mentions\/search\?.*query=c(&|$)/, {
        body: {
          mentions: resultC,
        },
      })
      .mock(/\/mentions\/search\?.*query=delay(&|$)/, new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            // "delay" is like "c", but delayed
            body: {
              mentions: resultC,
            },
          });
        }, 100);
      }))
      .mock(/\/mentions\/search\?.*query=broken(&|$)/, 500)
      .mock(/\/mentions\/record\?selectedUserId=\d+$/, {
        body: '',
      }, { name: 'record' });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#subscribe', () => {
    it('subscribe should receive updates', (done) => {
      const resource = new MentionResource(apiConfig);
      resource.subscribe('test1', (mentions) => {
        expect(mentions.length).toBe(resultCraig.length);
        done();
      });
      resource.filter('craig');
    });

    it('multiple subscriptions should receive updates', (done) => {
      const resource = new MentionResource(apiConfig);
      let count = 0;
      resource.subscribe('test1', (mentions) => {
        expect(mentions.length).toBe(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.subscribe('test2', (mentions) => {
        expect(mentions.length).toBe(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.filter('craig');
    });
  });

  describe('#unsubscribe', () => {
    it('subscriber should no longer called', () => {
      const resource = new MentionResource(apiConfig);
      const listener = jest.fn();
      resource.subscribe('test1', listener);
      resource.unsubscribe('test1');
      resource.filter('craig');
      // Not desirable...
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(listener).not.toHaveBeenCalled();
          } catch (err) {
            reject(err);
            return;
          }
          resolve();
        }, 50);
      });
    });
  });

  describe('#filter', () => {
    it('in order responses', (done) => {
      const resource = new MentionResource(apiConfig);
      const results: MentionDescription[][] = [];
      const expected = [resultC, [], resultCraig];
      resource.subscribe('test1', (mentions) => {
        results.push(mentions);
        // 1st: remote search for 'c'
        // 2nd: local index for 'craig'  => no results
        // 3rd: remote search for 'craig'

        if (results.length === 3) {
          checkOrder(expected, results);
          done();
        }
      });
      resource.filter('c');
      setTimeout(() => {
        resource.filter('craig');
      }, 10);
    });

    it('all results callback should receive all results', (done) => {
      const resource = new MentionResource(apiConfig);
      const results: MentionDescription[][] = [];
      const expected = [resultCraig, resultC];
      resource.subscribe('test1', undefined, undefined, undefined, (mentions) => {
        results.push(mentions);

        if (results.length === 2) {
          checkOrder(expected, results);
          done();
        }
      });
      resource.filter('delay');
      resource.filter('craig');
    });

    // Temporarily disabled due to failing on Mobile Safari 9.0.0.
    it.skip('out of order responses', (done) => { // eslint-disable-line
      const resource = new MentionResource(apiConfig);
      const results: MentionDescription[][] = [];
      const expected = [resultCraig];
      resource.subscribe('test1', (mentions) => {
        results.push(mentions);
        if (results.length === 1) {
          checkOrder(expected, results);
          done();
        }
        if (results.length > 1) {
          expect(results).toHaveLength(1);
        }
      });
      resource.filter('delay');
      setTimeout(() => {
        resource.filter('craig');
      }, 5);
    });

    it('error response', (done) => {
      const resource = new MentionResource(apiConfig);
      resource.subscribe('test1', () => {
        throw new Error('listener called');
      }, () => {
        done();
      });
      resource.filter('broken');
    });
  });

  describe('#filter auth issues', () => {
    it('401 error once retry', (done) => {
      const authUrl = 'https://authbogus/';
      const matcher = {
        name: 'authonce',
        matcher: `begin:${authUrl}`,
      };

      fetchMock.mock({ ...matcher, response: 401, times: 1 })
      .mock({ ...matcher,
        response: {
          body: {
            mentions: resultCraig,
          },
        },
        times: 1,
      });

      const refreshedSecurityProvider = jest.fn()
        .mockImplementation(() => Promise.resolve(header('666')));

      const retryConfig = {
        ...apiConfig,
        url: authUrl,
        refreshedSecurityProvider,
      };
      const resource = new MentionResource(retryConfig);
      resource.subscribe('test1', () => {
        try {
          expect(refreshedSecurityProvider).toHaveBeenCalledTimes(1);
          const calls = fetchMock.calls(matcher.name);
          expect(calls).toHaveLength(2);
          expect(getSecurityHeader(calls[0])).toBe(defaultSecurityCode);
          expect(getSecurityHeader(calls[1])).toBe('666');
          done();
        } catch (ex) {
          done(ex);
        }
      }, (err) => {
        throw new Error('listener error called');
      });
      resource.filter('test');
    });

    it('401 error twice retry', (done) => {
      const authUrl = 'https://authbogus/';
      const matcher = {
        name: 'authtwice',
        matcher: `begin:${authUrl}`,
      };

      fetchMock.mock({ ...matcher, response: 401 });

      const refreshedSecurityProvider = jest.fn()
        .mockImplementation(() => Promise.resolve(header(666)));

      const retryConfig = {
        ...apiConfig,
        url: authUrl,
        refreshedSecurityProvider,
      };
      const resource = new MentionResource(retryConfig);
      resource.subscribe('test1', () => {
        throw new Error('listener called');
      }, (err: Error) => {
        try {
          expect(refreshedSecurityProvider).toHaveBeenCalledTimes(1);
          expect(err).toBeInstanceOf(HttpError);
          expect((<HttpError>err).statusCode).toBe(401);
          const calls = fetchMock.calls(matcher.name);
          expect(calls.length).toBe(2);
          expect(getSecurityHeader(calls[0])).toBe(defaultSecurityCode);
          expect(getSecurityHeader(calls[1])).toBe('666');
          done();
        } catch (ex) {
          done(ex);
        }
      });
      resource.filter('test');
    });

    it('401 for search when documents from previous search are already indexed', (done) => {
      fetchMock.mock(/\/mentions\/search\?.*query=cz(&|$)/, 401);

      const resource = new MentionResource(apiConfig);
      let count = 0;
      resource.subscribe('test1', (mentions) => {
        count++;
        if (count === 1) {
          // the first call is for a remote search for 'c' and should return mentions.
          expect(mentions.length).toBe(resultC.length);
        } else if (count === 2) {
          // the second call is from a search against the local index for 'cz' and should return no matches
          expect(mentions.length).toBe(0);
        } else if (count > 2) {
          done(new Error('Result callback was called more than expected. Error callback was expected.'));
        }
      },
      (err) => {
        expect(err).toBeInstanceOf(HttpError);
        expect((<HttpError>err).statusCode).toBe(401);
        done();
      });

      resource.filter('c');  // this call should succeed and return mentions which get indexed locally
      setTimeout(() => {
        resource.filter('cz'); // this is the call that will result in a 401
      }, 10);
    });
  });

  describe('#recordMentionSelection', () => {
    it('should call record endpoint', (done) => {
      const resource = new MentionResource(apiConfig);

      resource.recordMentionSelection({
        id: '666',
      }).then(() => {
        expect(fetchMock.called('record')).toBe(true);
        done();
      });
    });
  });

  describe('#shouldHighlightMention', () => {
    it('should return false by default', () => {
      const resource = new MentionResource(apiConfig);
      expect(resource.shouldHighlightMention({ id: 'abcd-abcd-abcd' })).toBe(false);
    });

    it('should use config if available', () => {
      const resource = new MentionResource({
        ...apiConfig,
        shouldHighlightMention: mention => mention.id === 'abcd-abcd-abcd',
      });

      expect(resource.shouldHighlightMention({ id: 'abcd-abcd-abcd' })).toBe(true);
      expect(resource.shouldHighlightMention({ id: 'abcd-abcd' })).toBe(false);
    });
  });
});
