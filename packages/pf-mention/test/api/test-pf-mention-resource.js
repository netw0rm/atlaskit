import Promise from 'babel-runtime/core-js/promise';
// 'fetch-mock' needs a Promise polyfill
/* eslint-disable import/imports-first */
if (!window.Promise) {
  window.Promise = Promise;
}
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import MentionResource from '../../src/api/pf-mention-resource';
import { resultC, resultCraig } from '../_mention-data';
/* eslint-enable import/imports-first */

const baseUrl = 'https://bogus/';

const apiConfig = {
  url: baseUrl,
  securityProvider() {
    return 10804;
  },
  // containerId: 2595975,
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

fetchMock
  .mock(/\/mentions\/search\?.*query=craig(&|$)/, {
    body: JSON.stringify({
      mentions: resultCraig,
    }),
  })
  .mock(/\/mentions\/search\?.*query=c(&|$)/, {
    body: JSON.stringify({
      mentions: resultC,
    }),
  })
  .mock(/\/mentions\/search\?.*query=delay(&|$)/, {
    // "delay" is like "c", but delayed
    body: JSON.stringify({
      mentions: resultC,
    }),
  })
  .mock(/\/mentions\/search\?.*query=broken(&|$)/, 500);

describe('MentionResource', function () {
  const defaultFetch = global.fetch;
  const delayMatch = /\/mentions\/search\?.*query=delay(&|$)/;

  before(function () {
    global.fetch = function (input, init) {
      let url = input;
      if (typeof url === 'object') {
        // Request object, not url string
        url = url.url;
      }
      if (delayMatch.test(url)) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            defaultFetch(input, init).then(
              (response) => { resolve(response); },
              (reason) => { reject(reason); }
            );
          }, 100);
        });
      }
      return defaultFetch(input, init);
    };
  });

  after(function () {
    global.fetch = defaultFetch;
  });

  describe('#subscribe', function () {
    it('subscribe should receive updates', function (done) {
      const resource = new MentionResource(apiConfig);
      resource.subscribe('test1', function (mentions) {
        expect(mentions.length).to.equal(resultCraig.length);
        done();
      });
      resource.filter('craig');
    });
    it('multiple subscriptions should receive updates', function (done) {
      const resource = new MentionResource(apiConfig);
      let count = 0;
      resource.subscribe('test1', function (mentions) {
        expect(mentions.length).to.equal(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.subscribe('test2', function (mentions) {
        expect(mentions.length).to.equal(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.filter('craig');
    });
  });
  describe('#unsubscribe', function () {
    it('subscriber should no longer called', function (done) {
      const resource = new MentionResource(apiConfig);
      const listener = sinon.spy();
      resource.subscribe('test1', listener);
      resource.unsubscribe('test1');
      resource.filter('craig');
      // Not desirable...
      setTimeout(function () {
        expect(listener).to.not.be.called;
        done();
      }, 500);
    });
  });
  describe('#filter', function () {
    it('in order responses', function (done) {
      const resource = new MentionResource(apiConfig);
      const results = [];
      const expected = [resultC, resultCraig];
      resource.subscribe('test1', function (mentions) {
        results.push(mentions);
        if (results.length === 2) {
          checkOrder(expected, results);
          done();
        }
      });
      resource.filter('c');
      setTimeout(() => {
        resource.filter('craig');
      }, 100);
    });
    it('out of order responses', function (done) {
      const resource = new MentionResource(apiConfig);
      const results = [];
      const expected = [resultCraig];
      resource.subscribe('test1', function (mentions) {
        results.push(mentions);
        if (results.length === 1) {
          checkOrder(expected, results);
          done();
        }
        if (results.length > 1) {
          assert.fail('More than one response was unexpected.');
        }
      });
      resource.filter('delay');
      setTimeout(() => {
        resource.filter('craig');
      }, 50);
    });
    it('error response', function (done) {
      const resource = new MentionResource(apiConfig);
      resource.subscribe('test1', function () {
        assert.fail('Should not be called');
      }, function () {
        done();
      });
      resource.filter('broken');
    });
  });
});
