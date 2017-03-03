import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import { assert } from 'chai';

import MentionResource from '../../src/api/MentionResource';
import { resultC, resultCraig } from '../_mention-data';

const baseUrl = 'https://bogus/';

const defaultSecurityHeader = 'X-Bogus';

const header = code => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
});

const getSecurityHeader = call => call[0].headers.get(defaultSecurityHeader);

const defaultSecurityCode = '10804';

const apiConfig = {
  url: baseUrl,
  securityProvider() {
    return header(defaultSecurityCode);
  },
};

function checkOrder(expected, actual) {
  expect(actual.length, 'Number of responses').to.equal(expected.length);
  for (let i = 0; i < expected.length; i++) {
    expect(actual[i].length, `Mentions in response #${i}`).to.equal(expected[i].length);
    if (expected[i].length) {
      for (let j = 0; j < expected[i].length; j++) {
        expect(actual[i][j].id, `Mentions #${j} in response #${i}`).to.equal(expected[i][j].id);
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
        expect(mentions.length).to.equal(resultCraig.length);
        done();
      });
      resource.filter('craig');
    });

    it('multiple subscriptions should receive updates', (done) => {
      const resource = new MentionResource(apiConfig);
      let count = 0;
      resource.subscribe('test1', (mentions) => {
        expect(mentions.length).to.equal(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.subscribe('test2', (mentions) => {
        expect(mentions.length).to.equal(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.filter('craig');
    });
  });

  describe('#unsubscribe', () => {
    it('subscriber should no longer called', (done) => {
      const resource = new MentionResource(apiConfig);
      const listener = sinon.spy();
      resource.subscribe('test1', listener);
      resource.unsubscribe('test1');
      resource.filter('craig');
      // Not desirable...
      setTimeout(() => {
        expect(listener.called).to.equal(false);
        done();
      }, 50);
    });
  });

  describe('#filter', () => {
    it('in order responses', (done) => {
      const resource = new MentionResource(apiConfig);
      const results = [];
      const expected = [resultC, resultCraig];
      resource.subscribe('test1', (mentions) => {
        results.push(mentions);
        if (results.length === 2) {
          checkOrder(expected, results);
          done();
        }
      });
      resource.filter('c');
      setTimeout(() => {
        resource.filter('craig');
      }, 10);
    });

    // Temporarily disabled due to failing on Mobile Safari 9.0.0.
    it.skip('out of order responses', (done) => { // eslint-disable-line
      const resource = new MentionResource(apiConfig);
      const results = [];
      const expected = [resultCraig];
      resource.subscribe('test1', (mentions) => {
        results.push(mentions);
        if (results.length === 1) {
          checkOrder(expected, results);
          done();
        }
        if (results.length > 1) {
          assert.fail(results.length, 1, 'More than one response was unexpected.');
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
        assert.fail('listener called', 'listener not called');
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

      const refreshedSecurityProvider = sinon.stub();
      refreshedSecurityProvider.returns(Promise.resolve(header('666')));

      const retryConfig = {
        ...apiConfig,
        url: authUrl,
        refreshedSecurityProvider,
      };
      const resource = new MentionResource(retryConfig);
      resource.subscribe('test1', () => {
        try {
          expect(refreshedSecurityProvider.callCount,
'refreshedSecurityProvider called once').to.equal(1);
          const calls = fetchMock.calls(matcher.name);
          expect(calls.length, 'number of calls to fetch').to.equal(2);
          expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
          expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');
          done();
        } catch (ex) {
          done(ex);
        }
      }, (err) => {
        assert.fail('listener error called', 'listener error not called');
        done(err);
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

      const refreshedSecurityProvider = sinon.stub();
      refreshedSecurityProvider.returns(Promise.resolve(header(666)));

      const retryConfig = {
        ...apiConfig,
        url: authUrl,
        refreshedSecurityProvider,
      };
      const resource = new MentionResource(retryConfig);
      resource.subscribe('test1', () => {
        assert.fail('listener called', 'listener not called');
      }, (err) => {
        try {
          expect(refreshedSecurityProvider.callCount,
'refreshedSecurityProvider called once').to.equal(1);
          expect(err.code, 'response code').to.be.equal(401);
          const calls = fetchMock.calls(matcher.name);
          expect(calls.length, 'number of calls to fetch').to.equal(2);
          expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
          expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');
          done();
        } catch (ex) {
          done(ex);
        }
      });
      resource.filter('test');
    });
  });

  describe('#recordMentionSelection', () => {
    it('should call record endpoint', (done) => {
      const resource = new MentionResource(apiConfig);

      resource.recordMentionSelection({
        id: 666,
      }).then(() => {
        expect(fetchMock.called('record')).to.equal(true);
        done();
      });
    });
  });

  describe('#shouldHighlightMention', () => {
    it('should return false by default', () => {
      const resource = new MentionResource(apiConfig);
      expect(resource.shouldHighlightMention({ id: 'abcd-abcd-abcd' })).to.equal(false);
    });

    it('should use config if available', () => {
      const resource = new MentionResource({
        ...apiConfig,
        shouldHighlightMention: mention => mention.id === 'abcd-abcd-abcd',
      });

      expect(resource.shouldHighlightMention({ id: 'abcd-abcd-abcd' })).to.equal(true);
      expect(resource.shouldHighlightMention({ id: 'abcd-abcd' })).to.equal(false);
    });
  });
});
