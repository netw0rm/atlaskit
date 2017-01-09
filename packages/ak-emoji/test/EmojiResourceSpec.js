import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import EmojiResource from '../src/api/EmojiResource';

const baseUrl = 'https://bogus/';
const p1Url = 'https://p1/';
const p2Url = 'https://p2/';

const defaultSecurityHeader = 'X-Bogus';

const header = code => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
});

const getSecurityHeader = call => call[0].headers.get(defaultSecurityHeader);

const defaultSecurityCode = '10804';

const defaultApiConfig = {
  url: baseUrl,
  securityProvider() {
    return header(defaultSecurityCode);
  },
};

const provider1 = {
  url: p1Url,
  securityProvider: () => header(defaultSecurityCode),
};

const provider2 = {
  url: p2Url,
};

const providerData1 = ['a', 'b', 'c'];
const providerData2 = [1, 2, 3];

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji, `emoji #${idx}`).to.equal(actual[idx]);
  });
}

describe('EmojiResource', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('#loadAllEmoji', () => {
    it('no providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [],
      };
      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        checkOrder([], emojis);
      });
    });

    it('single provider', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerData1,
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        checkOrder(providerData1, emojis);
      });
    });

    it('multiple providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerData1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerData2,
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        checkOrder([...providerData1, ...providerData2], emojis);
      });
    });

    it('multiple providers out of order response, returned in provider config order', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise((resolve) => {
          setTimeout(() => { resolve(providerData1); }, 5);
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerData2,
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        checkOrder([...providerData1, ...providerData2], emojis);
      });
    });

    it('multiple providers, one fails', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: 401,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerData2,
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        checkOrder(providerData2, emojis);
      });
    });

    it('401 error once retry', () => {
      const refreshedSecurityProvider = sinon.stub();
      refreshedSecurityProvider.returns(Promise.resolve(header(666)));

      const provider401 = {
        ...provider1,
        refreshedSecurityProvider,
      };

      const provider401Matcher = {
        name: 'authonce',
        matcher: `begin:${provider1.url}`,
      };

      const config = {
        ...defaultApiConfig,
        providers: [provider401, provider2],
      };

      fetchMock.mock({
        ...provider401Matcher,
        response: 401,
        times: 1,
      }).mock({
        ...provider401Matcher,
        response: providerData1,
        times: 1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerData2,
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        expect(refreshedSecurityProvider.callCount, 'refreshedSecurityProvider called once').to.equal(1);
        const calls = fetchMock.calls(provider401Matcher.name);
        expect(calls.length, 'number of calls to fetch').to.equal(2);
        expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
        expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');

        checkOrder([...providerData1, ...providerData2], emojis);
      });
    });

    it('401 error twice retry', () => {
      const refreshedSecurityProvider = sinon.stub();
      refreshedSecurityProvider.returns(Promise.resolve(header(666)));

      const provider401 = {
        ...provider1,
        refreshedSecurityProvider,
      };

      const provider401Matcher = {
        name: 'authonce',
        matcher: `begin:${provider1.url}`,
      };

      const config = {
        ...defaultApiConfig,
        providers: [provider401, provider2],
      };

      fetchMock.mock({
        ...provider401Matcher,
        response: 401,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerData2,
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojis) => {
        expect(refreshedSecurityProvider.callCount, 'refreshedSecurityProvider called once').to.equal(1);
        const calls = fetchMock.calls(provider401Matcher.name);
        expect(calls.length, 'number of calls to fetch').to.equal(2);
        expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
        expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');
        // provider 1 data not returned due to two 401's
        checkOrder(providerData2, emojis);
      });
    });
  });

  describe('#recordMentionSelection', () => {
    it('should call record endpoint', () => {
      const resource = new EmojiResource(defaultApiConfig);

      fetchMock.mock({
        name: 'record',
        matcher: `begin:${baseUrl}`,
        response: {
          body: '',
        },
      });

      return resource.recordEmojiSelection(':bacon:').then(() => {
        expect(fetchMock.called('record')).to.be.true;
      });
    });
  });
});
