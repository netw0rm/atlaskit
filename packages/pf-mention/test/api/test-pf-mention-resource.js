import MentionResource from '../../src/api/pf-mention-resource';

import { resultC, resultCraig } from '../../src/data';

import 'isomorphic-fetch'; // for Safari & Mobile Chrome
import fetchMock from 'fetch-mock';

const baseUrl = 'https://bogus/';

const apiConfig = {
  url: baseUrl,
  application: 'HIPCHAT',
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
  .mock(/\/mentions\/search\?.*query=craig&.*/, {
    body: JSON.stringify({
      mentions: resultCraig,
    }),
  })
  .mock(/\/mentions\/search\?.*query=c&.*/, {
    body: JSON.stringify({
      mentions: resultC,
    }),
  })
  .mock(/\/mentions\/search\?.*query=delay&.*/, {
    // "delay" is like "c", but delayed
    body: JSON.stringify({
      mentions: resultC,
    }),
  })
  .mock(/\/mentions\/search\?.*query=broken&.*/, 500);

describe('MentionResource', function () {
  const defaultFetch = global.fetch;
  const delayMatch = /\/mentions\/search\?.*query=delay&.*/;

  before(function () {
    global.fetch = function (input, init) {
      if (typeof input === 'string') {
        if (delayMatch.test(input)) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              defaultFetch(input, init).then(
                (response) => { resolve(response); },
                (reason) => { reject(reason); }
              );
            }, 100);
          });
        }
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
      resource.subscribe(function (mentions) {
        expect(mentions.length).to.equal(resultCraig.length);
        done();
      });
      resource.filter('craig');
    });
    it('multiple subscriptions should receive updates', function (done) {
      const resource = new MentionResource(apiConfig);
      let count = 0;
      resource.subscribe(function (mentions) {
        expect(mentions.length).to.equal(resultCraig.length);
        count++;
        if (count === 2) {
          done();
        }
      });
      resource.subscribe(function (mentions) {
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
      resource.subscribe(listener);
      resource.unsubscribe(listener);
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
      resource.subscribe(function (mentions) {
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
    it('out of order responses', function () {
      const resource = new MentionResource(apiConfig);
      const results = [];
      const expected = [resultCraig];
      resource.subscribe(function (mentions) {
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
      resource.subscribe(function () {
        assert.fail('Should not be called');
      }, function () {
        done();
      });
      resource.filter('broken');
    });
  });
});
