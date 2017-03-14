import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';

import { EmojiDescription } from '../src/types';
import { SecurityOptions, ServiceConfig } from '../src/api/SharedResourceUtils';
import { OnProviderChange } from '../src/api/SharedResources';
import EmojiResource, { EmojiResourceConfig } from '../src/api/EmojiResource';
import { EmojiSearchResult } from '../src/api/EmojiService';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { areyoukiddingmeEmoji, atlassianEmojis, grinEmoji, standardEmojis } = emojiTestData.emojiTestData;

const baseUrl = 'https://bogus/';
const p1Url = 'https://p1/';
const p2Url = 'https://p2/';

const defaultSecurityHeader = 'X-Bogus';

const header = (code: string | number): SecurityOptions => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
});

const defaultSecurityCode = '10804';

const provider1: ServiceConfig = {
  url: p1Url,
  securityProvider: () => header(defaultSecurityCode),
};

const provider2: ServiceConfig = {
  url: p2Url,
};

const defaultApiConfig: EmojiResourceConfig = {
  recordConfig: {
    url: baseUrl,
    securityProvider() {
      return header(defaultSecurityCode);
    },
  },
  providers: [provider1],
};

const fetchResponse = data => ({ emojis: data });

function checkOrder(expected: EmojiDescription[], actual: EmojiDescription[]) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    checkEmoji(emoji, actual[idx], idx);
  });
}

function checkEmoji(expected: EmojiDescription, actual: EmojiDescription | undefined, idx?: number) {
  expect(actual, 'Emoji is defined').to.not.equal(undefined);
  if (actual) {
    expect(actual.id, `emoji #${idx}`).to.equal(expected.id);
    expect(actual.shortcut, `emoji #${idx}`).to.equal(expected.shortcut);
  }
}

class MockOnProviderChange implements OnProviderChange<EmojiSearchResult, any, undefined> {
  resultCalls: EmojiSearchResult[] = [];
  errorCalls: any[] = [];
  notReadyCalls: number = 0;

  private toResolve: Function[] = [];
  private toResolveOnResult: Function[] = [];

  private resolvePromises(): void {
    const currentToResolve = this.toResolve;
    this.toResolve = [];
    currentToResolve.forEach(resolve => { resolve(); });
  }

  private resolvePromisesOnResult(result: EmojiSearchResult): void {
    const currentToResolveOnResult = this.toResolveOnResult;
    this.toResolveOnResult = [];
    currentToResolveOnResult.forEach(resolve => { resolve(result); });
  }

  result(result: EmojiSearchResult): void {
    this.resultCalls.push(result);
    this.resolvePromises();
    this.resolvePromisesOnResult(result);
  }

  error?(error: any): void {
    this.errorCalls.push(error);
    this.resolvePromises();
  }

  notReady?(): void {
    this.notReadyCalls++;
    this.resolvePromises();
  }

  waitForAnyCall(): Promise<any> {
    return new Promise<any>(resolve => {
      this.toResolve.push(resolve);
    });
  }

  waitForResult(): Promise<EmojiSearchResult> {
    return new Promise<EmojiSearchResult>(resolve => {
      this.toResolveOnResult.push(resolve);
    });
  }

  waitForResults(num: number): Promise<EmojiSearchResult> {
    return new Promise<EmojiSearchResult>(resolve => {
      const minCountResolver = (response) => {
        if (this.resultCalls.length >= num) {
          resolve(response);
        } else {
          this.toResolveOnResult.push(minCountResolver);
        }
      };
      this.toResolveOnResult.push(minCountResolver);
    });
  }
}

let providerData1;
let providerData2;

describe('EmojiResource', () => {
  beforeEach(() => {
    providerData1 = standardEmojis();
    providerData2 = atlassianEmojis();
  });

  afterEach(() => {
    fetchMock.restore();
    providerData1 = undefined;
    providerData2 = undefined;
  });

  describe('#test data', () => {
    it('expected test data', () => {
      expect(providerData1.length > 0, 'More than 1 Standard Emoji').to.equal(true);
      expect(providerData2.length > 0, 'More than 1 Atlassian Emoji').to.equal(true);
    });
  });

  describe('#filter', () => {
    it('no providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [],
      };
      try {
        new EmojiResource(config);
        expect(true, 'EmojiResource construction should throw error').to.equal(false);
      } catch (e) {
        expect(true, 'EmojiResource threw error due to no providers').to.equal(true);
      }
    });

    it('single provider all emoji', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      });

      const config = {
        ...defaultApiConfig,
        providers: [provider1],
      };

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResult().then(emojiResponse => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        expect(emojiResponse.emojis.length, 'Number of emoji').to.equal(providerData1.length);
        checkOrder(providerData1, emojiResponse.emojis);
      });
      resource.subscribe(onChange);
      resource.filter('');
      return filteredPromise;
    });

    it('multiple providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResults(2).then(() => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData1.length + providerData2.length);
        checkOrder([ ...providerData1, ...providerData2 ], emojis);
      });
      resource.subscribe(onChange);
      resource.filter('');
      return filteredPromise;
    });

    it('multiple providers out of order response, returned in provider config order', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };

      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise((resolve) => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromiseChain = onChange.waitForResult().then(() => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData2.length);
        checkOrder(providerData2, emojis);
        // Complete 1st emoji set
        resolveProvider1(fetchResponse(providerData1));
        return onChange.waitForResult();
      }).then(() => {
        // After 2nd dataset is loaded, this is for the 1st data set
        expect(onChange.resultCalls.length, 'Result called').to.equal(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData1.length + providerData2.length);
        checkOrder([ ...providerData1, ...providerData2 ], emojis);
      });
      resource.subscribe(onChange);
      resource.filter('');
      return filteredPromiseChain;
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
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResult().then(() => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData2.length);
        checkOrder(providerData2, emojis);
        expect(onChange.errorCalls.length, 'Errors occurred').to.equal(1);
      });
      resource.subscribe(onChange);
      resource.filter('');
      return filteredPromise;
    });

    it('single provider slow', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise((resolve) => {
          resolveProvider1 = resolve;
        })
      });

      const resource = new EmojiResource(defaultApiConfig);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForAnyCall().then(() => {
        expect(onChange.notReadyCalls, 'Not ready called').to.equal(1);
        // Complete 1st emoji set
        resolveProvider1(fetchResponse(providerData1));
        return onChange.waitForResult();
      }).then(() => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData1.length);
        checkOrder(providerData1, emojis);
      });
      resource.subscribe(onChange);
      resource.filter('');
      return filteredPromise;
    });

    it('multiple providers filtered', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResults(2).then(() => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(2);
        expect(emojis[0].shortcut).to.equal('grinning');
        expect(emojis[1].shortcut).to.equal('grin');
      });
      resource.subscribe(onChange);
      resource.filter('grin');
      return filteredPromise;
    });
  });

  describe('#recordMentionSelection', () => {
    it('should call record endpoint', () => {
      fetchMock.mock({
        name: 'record',
        matcher: `begin:${baseUrl}`,
        response: {
          body: '',
        },
        method: 'POST',
      }).mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      });

      const resource = new EmojiResource(defaultApiConfig);

      return resource.recordSelection({ id: ':bacon:' }).then(() => {
        expect(fetchMock.called('record')).to.equal(true);
      });
    });
  });

  describe('#findById', () => {
    it('Before loaded, promise eventually resolved; one provider', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);

      const emojiPromise = resource.findById({ id: '1f601' }); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji(), emoji);
      });
      resolveProvider1(fetchResponse(providerData1));
      return done;
    });

    it('Two providers, found first', () => {
      let resolveProvider1;
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findById({ id: '1f601' }); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji(), emoji);
      });
      resolveProvider1(fetchResponse(providerData1));
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, found second', () => {
      let resolveProvider1;
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findById({ id: 'atlassian-areyoukiddingme' }); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(areyoukiddingmeEmoji(), emoji);
      });
      resolveProvider1(fetchResponse(providerData1));
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, not found', () => {
      let resolveProvider1;
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findById({ id: 'bogus' }); // does not exist
      const done = emojiPromise.then(emoji => {
        expect(emoji).to.equal(undefined);
      });
      resolveProvider1(fetchResponse(providerData1));
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, search after loaded', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findById({ id: 'atlassian-areyoukiddingme' }); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(areyoukiddingmeEmoji(), emoji);
      });
      return done;
    });

    it('Two providers, not found in failing provider', () => {
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: 500,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findById({ id: '1f601' }); // grin
      const done = emojiPromise.then(emoji => {
        expect(emoji, 'Emoji not found due to failed provider').to.equal(undefined);
      });
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, ingore in failing provider', () => {
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: 500,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findById({ id: 'atlassian-areyoukiddingme' }); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(areyoukiddingmeEmoji(), emoji);
      });
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });
  });

  describe('#findByShortcut', () => {
    it('Before loaded, promise eventually resolved; one provider', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);
      const emojiPromise = resource.findByShortcut('grin'); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji(), emoji);
      });
      resolveProvider1(fetchResponse(providerData1));
      return done;
    });

    it('Two providers, found first', () => {
      let resolveProvider1;
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findByShortcut('grin'); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji(), emoji);
      });
      resolveProvider1(fetchResponse(providerData1));
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, found second', () => {
      let resolveProvider1;
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findByShortcut('areyoukiddingme'); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(areyoukiddingmeEmoji(), emoji);
      });
      resolveProvider1(fetchResponse(providerData1));
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, not found', () => {
      let resolveProvider1;
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findByShortcut('bogus'); // does not exist
      const done = emojiPromise.then(emoji => {
        expect(emoji).to.equal(undefined);
      });
      resolveProvider1(fetchResponse(providerData1));
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, search after loaded', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findByShortcut('areyoukiddingme'); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(areyoukiddingmeEmoji(), emoji);
      });
      return done;
    });

    it('Two providers, not found in failing provider', () => {
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: 500,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findByShortcut('grin'); // grin
      const done = emojiPromise.then(emoji => {
        expect(emoji, 'Emoji not found due to failed provider').to.equal(undefined);
      });
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });

    it('Two providers, ingore in failing provider', () => {
      let resolveProvider2;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: 500,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: new Promise(resolve => {
          resolveProvider2 = resolve;
        }),
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = resource.findByShortcut('areyoukiddingme'); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(areyoukiddingmeEmoji(), emoji);
      });
      resolveProvider2(fetchResponse(providerData2));
      return done;
    });
  });
});
