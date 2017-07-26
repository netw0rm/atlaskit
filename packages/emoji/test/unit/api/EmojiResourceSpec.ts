import * as URLSearchParams from 'url-search-params';
import * as fetchMock from 'fetch-mock/src/client';
import * as sinon from 'sinon';
import { OnProviderChange, SecurityOptions, ServiceConfig } from '@atlaskit/util-service-support';

import { waitUntil } from '@atlaskit/util-common-test';

import { EmojiDescription, EmojiServiceResponse, MediaApiRepresentation } from '../../../src/types';
import { selectedToneStorageKey } from '../../../src/constants';
import MediaEmojiResource from '../../../src/api/media/MediaEmojiResource';
import EmojiResource, {
    EmojiProvider,
    EmojiResourceConfig,
    supportsUploadFeature,
    UploadingEmojiProvider,
} from '../../../src/api/EmojiResource';
import { EmojiSearchResult } from '../../../src/api/EmojiRepository';

import {
    atlassianEmojis,
    atlassianServiceEmojis,
    blobResponse,
    defaultMediaApiToken,
    evilburnsEmoji,
    fetchSiteEmojiUrl,
    filterToSearchable,
    grinEmoji,
    mediaEmoji,
    mediaEmojiImagePath,
    missingMediaEmoji,
    missingMediaEmojiId,
    missingMediaServiceEmoji,
    mockLocalStorage,
    siteServiceEmojis,
    siteUrl,
    standardEmojis,
    standardServiceEmojis,
    thumbsupEmoji,
} from '../../../src/support/test-data';

import { alwaysPromise } from '../_test-util';

// patch URLSearchParams API for jsdom tests
declare var global: any;
global.URLSearchParams = URLSearchParams;

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

const providerData1 = filterToSearchable(standardEmojis);
const providerData2 = filterToSearchable(atlassianEmojis);
const providerServiceData1 = standardServiceEmojis;
const providerServiceData2 = atlassianServiceEmojis;

const checkOrder = (expected: EmojiDescription[], actual: EmojiDescription[]) => {
  expect(actual).toHaveLength(expected.length);
  expected.forEach((emoji, idx) => {
    checkEmoji(emoji, actual[idx], idx);
  });
};

const checkEmoji = (expected: EmojiDescription, actual: EmojiDescription | undefined, idx?: number) => {
  expect(actual).not.toBe(undefined);
  if (actual) {
    expect(actual.id).toBe(expected.id);
    expect(actual.shortName).toBe(expected.shortName);
  }
};

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

describe('EmojiResource', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('#test data', () => {
    it('expected test data', () => {
      expect(standardEmojis.length).toBeGreaterThan(0);
      expect(atlassianEmojis.length).toBeGreaterThan(0);
    });
  });

  describe('#filter', () => {
    it('no providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [],
      };

      expect(() => new EmojiResource(config)).toThrow();
    });

    it('single provider all emoji', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerServiceData1,
      });

      const config = {
        ...defaultApiConfig,
        providers: [provider1],
      };

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResult().then(emojiResponse => {
        expect(onChange.resultCalls).toHaveLength(1);
        expect(emojiResponse.emojis).toHaveLength(providerData1.length);
        checkOrder(providerData1, emojiResponse.emojis);
      });
      resource.subscribe(onChange);
      resource.filter('');
      return filteredPromise;
    });

    it('single provider all emoji with skin tone search option', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerServiceData1,
      });

      const config = {
        ...defaultApiConfig,
        providers: [provider1],
      };

      const skinTone = 2;
      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResult().then(emojiResponse => {
        expect(onChange.resultCalls).toHaveLength(1);
        expect(emojiResponse.emojis).toHaveLength(1);
        const expectedSelectedSkinEmoji = (thumbsupEmoji.skinVariations && thumbsupEmoji.skinVariations[skinTone - 1]) as EmojiDescription;
        expect(emojiResponse.emojis[0].id).toBe(expectedSelectedSkinEmoji.id);
        const emoji = emojiResponse.emojis[0];
        expect(emoji.shortName).toBe(expectedSelectedSkinEmoji.shortName);
        expect(emoji.id).toBe(expectedSelectedSkinEmoji.id);
      });
      resource.subscribe(onChange);
      resource.filter('thumbsup', { skinTone });
      return filteredPromise;
    });

    it('multiple providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1, provider2],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerServiceData1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerServiceData2,
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResults(2).then(() => {
        expect(onChange.resultCalls).toHaveLength(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis).toHaveLength(providerData1.length + providerData2.length);
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
        response: providerServiceData2,
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromiseChain = onChange.waitForResult().then(() => {
        expect(onChange.resultCalls).toHaveLength(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis).toHaveLength(providerData2.length);
        checkOrder(providerData2, emojis);
        // Complete 1st emoji set
        resolveProvider1(providerServiceData1);
        return onChange.waitForResult();
      }).then(() => {
        // After 2nd dataset is loaded, this is for the 1st data set
        expect(onChange.resultCalls).toHaveLength(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis).toHaveLength(providerData1.length + providerData2.length);
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
        response: providerServiceData2,
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResult().then(() => {
        expect(onChange.resultCalls).toHaveLength(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis).toHaveLength(providerData2.length);
        checkOrder(providerData2, emojis);
        expect(onChange.errorCalls).toHaveLength(1);
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
        expect(onChange.notReadyCalls).toBe(1);
        // Complete 1st emoji set
        resolveProvider1(providerServiceData1);
        return onChange.waitForResult();
      }).then(() => {
        expect(onChange.resultCalls).toHaveLength(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis).toHaveLength(providerData1.length);
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
        response: providerServiceData1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerServiceData2,
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResults(2).then(() => {
        expect(onChange.resultCalls).toHaveLength(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis).toHaveLength(2);
        expect(emojis[0].shortName).toBe(':grin:');
        expect(emojis[1].shortName).toBe(':grinning:');
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
        response: providerServiceData1,
      });

      const resource = new EmojiResource(defaultApiConfig);

      return resource.recordSelection({ shortName: ':bacon:', id: '123bacon' }).then(() => {
        expect(fetchMock.called('record')).toBe(true);
      });
    });
  });

  describe('#findByEmojiId', () => {
    it('Before loaded, promise eventually resolved; one provider', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);

      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: '1f601' })); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      return done;
    });

    it('one provider, no id', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);

      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':grin:' }));
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      return done;
    });

    it('one provider, unknown id, shortName fallback', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);

      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':grin:', id: 'unknownid' }));
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
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
      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: '1f601' })); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2(providerServiceData2);
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
      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: 'atlassian-evilburns' })); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(evilburnsEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2(providerServiceData2);
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
      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: 'bogus' })); // does not exist
      const done = emojiPromise.then(emoji => {
        expect(emoji).toBe(undefined);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2(providerServiceData2);
      return done;
    });

    it('Two providers, search after loaded', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerServiceData1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerServiceData2,
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: 'atlassian-evilburns' })); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(evilburnsEmoji, emoji);
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
      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: '1f601' })); // grin
      const done = emojiPromise.then(emoji => {
        expect(emoji).toBe(undefined);
      });
      resolveProvider2(providerServiceData2);
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
      const emojiPromise = alwaysPromise(resource.findByEmojiId({ shortName: ':wontbeused:', id: 'atlassian-evilburns' })); // grin
      const done = emojiPromise.then(emoji => {
        checkEmoji(evilburnsEmoji, emoji);
      });
      resolveProvider2(providerServiceData2);
      return done;
    });

    it('not found by id - found on server', () => {
      const serviceResponse: EmojiServiceResponse = {
        emojis: [missingMediaServiceEmoji],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        }
      };

      fetchMock.mock({
        matcher: fetchSiteEmojiUrl(missingMediaEmojiId),
        response: serviceResponse,
        name: 'fetch-site-emoji',
      }).mock({
        matcher: `begin:${siteUrl}`,
        response: siteServiceEmojis(),
        times: 1,
      }).mock({
        matcher: mediaEmojiImagePath,
        response: blobResponse(new Blob()),
      });

      const config = {
        ...defaultApiConfig,
        providers: [{
          url: siteUrl,
        }],
      };

      const resource = new EmojiResource(config);

      return alwaysPromise(resource.findByEmojiId(missingMediaEmojiId))
        .then(emoji => {
          const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
          expect(fetchSiteEmojiCalls).toHaveLength(1);
          expect(emoji).toEqual(missingMediaEmoji);
        });
    });

    it('not found by id - not found on server - try by shortName', () => {
      const serviceResponse: EmojiServiceResponse = {
        emojis: [],
        meta: {
          mediaApiToken: defaultMediaApiToken(),
        }
      };

      fetchMock.mock({
        matcher: fetchSiteEmojiUrl(missingMediaEmojiId),
        response: serviceResponse,
        name: 'fetch-site-emoji',
      }).mock({
        matcher: `begin:${siteUrl}`,
        response: siteServiceEmojis(),
        times: 1,
      }).mock({
        matcher: mediaEmojiImagePath,
        response: blobResponse(new Blob()),
      });

      const config = {
        ...defaultApiConfig,
        providers: [{
          url: siteUrl,
        }],
      };

      const resource = new EmojiResource(config);

      const emojiId = {
        ...missingMediaEmojiId,
        shortName: ':media:', // fallback - match existing by shortName (but different id)
      };

      return alwaysPromise(resource.findByEmojiId(emojiId))
        .then(emoji => {
          const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
          expect(fetchSiteEmojiCalls).toHaveLength(1);
          expect(emoji).toEqual(mediaEmoji);
        });
    });

    it('not found by id - no media resource - try by shortName', () => {
      fetchMock.mock({
        matcher: fetchSiteEmojiUrl(missingMediaEmojiId),
        response: 400,
        name: 'fetch-site-emoji',
      }).mock({
        matcher: `begin:${siteUrl}`,
        response: {
          emojis: siteServiceEmojis().emojis,
          // no meta.mediaApiToken means not media resource created
        },
        times: 1,
      }).mock({
        matcher: mediaEmojiImagePath,
        response: blobResponse(new Blob()),
      });

      const config = {
        ...defaultApiConfig,
        providers: [{
          url: siteUrl,
        }],
      };

      const resource = new EmojiResource(config);

      const emojiId = {
        ...missingMediaEmojiId,
        shortName: ':media:', // fallback - match existing by shortName (but different id)
      };

      return alwaysPromise(resource.findByEmojiId(emojiId))
        .then(emoji => {
          const fetchSiteEmojiCalls = fetchMock.calls('fetch-site-emoji');
          expect(fetchSiteEmojiCalls).toHaveLength(0);
          // media url not loaded - url pass through
          const { width, height, mediaPath } = mediaEmoji.representation as MediaApiRepresentation;
          expect(emoji).toEqual({
            ...mediaEmoji,
            representation: {
              imagePath: mediaPath,
              width,
              height,
            }
          });
        });
    });
  });

  describe('#findById', () => {
    it('unknown id', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);

      const emojiPromise = alwaysPromise(resource.findById('unknownid'));
      const done = emojiPromise.then(emoji => {
        expect(emoji).toBe(undefined);
      });
      resolveProvider1(providerServiceData1);
      return done;
    });

    it('valid emoji id', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);

      const emojiPromise = alwaysPromise(resource.findById('1f601'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      return done;
    });
  });

  describe('#findByShortName', () => {
    it('Before loaded, promise eventually resolved; one provider', () => {
      let resolveProvider1;

      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: new Promise(resolve => {
          resolveProvider1 = resolve;
        }),
      });

      const resource = new EmojiResource(defaultApiConfig);
      const emojiPromise = alwaysPromise(resource.findByShortName(':grin:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
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
      const emojiPromise = alwaysPromise(resource.findByShortName(':grin:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(grinEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2(providerServiceData2);
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
      const emojiPromise = alwaysPromise(resource.findByShortName(':evilburns:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(evilburnsEmoji, emoji);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2(providerServiceData2);
      return done;
    });

    it('Two providers, duplicate shortName - use from second provider. 1, then 2 resolved.', () => {
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

      const p2grin = {
        ...grinEmoji,
        id: 'atlassian-grin',
      };
      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = alwaysPromise(resource.findByShortName(':grin:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(p2grin, emoji);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2({
        emojis: [
          ...providerServiceData2.emojis,
          p2grin,
        ],
        meta: providerServiceData2.meta,
      });
      return done;
    });

    it('Two providers, duplicate shortName - use from second provider. 2, then 1 resolved.', () => {
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

      const p2grin = {
        ...grinEmoji,
        id: 'atlassian-grin',
      };
      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = alwaysPromise(resource.findByShortName(':grin:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(p2grin, emoji);
      });
      resolveProvider2({
        emojis: [
          ...providerServiceData2.emojis,
          p2grin,
        ],
        meta: providerServiceData2.meta,
      });
      resolveProvider1(providerServiceData1);
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
      const emojiPromise = alwaysPromise(resource.findByShortName(':bogus:'));
      const done = emojiPromise.then(emoji => {
        expect(emoji).toBe(undefined);
      });
      resolveProvider1(providerServiceData1);
      resolveProvider2(providerServiceData2);
      return done;
    });

    it('Two providers, search after loaded', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: providerServiceData1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerServiceData2,
      });

      const resource = new EmojiResource({
        ...defaultApiConfig,
        providers: [provider1, provider2],
      });
      const emojiPromise = alwaysPromise(resource.findByShortName(':evilburns:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(evilburnsEmoji, emoji);
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
      const emojiPromise = alwaysPromise(resource.findByShortName(':grin:'));
      const done = emojiPromise.then(emoji => {
        expect(emoji).toBe(undefined);
      });
      resolveProvider2(providerServiceData2);
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
      const emojiPromise = alwaysPromise(resource.findByShortName(':evilburns:'));
      const done = emojiPromise.then(emoji => {
        checkEmoji(evilburnsEmoji, emoji);
      });
      resolveProvider2(providerServiceData2);
      return done;
    });
  });
});

describe('UploadingEmojiResource', () => {

  beforeEach(() => {
    fetchMock.mock({
      matcher: `begin:${provider1.url}`,
      response: providerServiceData1,
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  class TestUploadingEmojiResource extends EmojiResource {
    private mockMediaEmojiResource?: MediaEmojiResource;

    constructor(mockMediaEmojiResource?: MediaEmojiResource, config?: EmojiResourceConfig) {
      super({
        providers: [provider1],
        allowUpload: true,
        ...config,
      });
      this.mockMediaEmojiResource = mockMediaEmojiResource;
    }

    protected initMediaEmojiResource(emojiResponse, provider) {
      this.mediaEmojiResource = this.mockMediaEmojiResource;
      return Promise.resolve();
    }
  }

  describe('#isUploadSupported', () => {
    it('resource has custom emoji with media support', () => {
      const emojiResource = new TestUploadingEmojiResource(sinon.createStubInstance(MediaEmojiResource) as any);
      return emojiResource.isUploadSupported().then(supported => {
        expect(supported).toBe(true);
      });
    });

    it('resource has no media support', () => {
      const emojiResource = new TestUploadingEmojiResource();
      return emojiResource.isUploadSupported().then(supported => {
        expect(supported).toBe(false);
      });
    });

    it('allowUpload is false', () => {
      const emojiResource = new TestUploadingEmojiResource(sinon.createStubInstance(MediaEmojiResource) as any, { allowUpload: false } as EmojiResourceConfig);
      return emojiResource.isUploadSupported().then(supported => {
        expect(supported).toBe(false);
      });
    });
  });

  describe('#uploadCustomEmoji', () => {
    const upload = {
      name: 'cheese',
      shortName: ':cheese:',
      filename: 'cheese.png',
      dataURL: 'data:blah',
      width: 32,
      height: 32,
    };

    it('no media support - throw error', () => {
      const emojiResource = new TestUploadingEmojiResource();
      return expect(emojiResource.uploadCustomEmoji(upload)).rejects.toBeDefined();
    });

    it('media support - upload successful', () => {
      const mediaEmojiResource = sinon.createStubInstance(MediaEmojiResource) as any;
      const uploadEmojiStub = mediaEmojiResource.uploadEmoji;
      uploadEmojiStub.returns(Promise.resolve(mediaEmoji));
      const emojiResource = new TestUploadingEmojiResource(mediaEmojiResource);
      return emojiResource.uploadCustomEmoji(upload).then(emoji => {
        expect(uploadEmojiStub.calledWith(upload)).toBe(true);
        expect(emoji).toBe(mediaEmoji);
      });
    });

    it('media support - upload error', () => {
      const mediaEmojiResource = sinon.createStubInstance(MediaEmojiResource) as any;
      const uploadEmojiStub = mediaEmojiResource.uploadEmoji;
      uploadEmojiStub.returns(Promise.reject('bad things'));
      const emojiResource = new TestUploadingEmojiResource(mediaEmojiResource);

      return expect(emojiResource.uploadCustomEmoji(upload)).rejects.toBeDefined().then(() => {
        expect(uploadEmojiStub.calledWith(upload)).toBe(true);
      });
    });
  });

  describe('#prepareForUpload', () => {
    it('no media support - no error', () => {
      expect(() => {
        const emojiResource = new TestUploadingEmojiResource();
        emojiResource.prepareForUpload();
      }).not.toThrow();
    });

    it('media support - token primed', () => {
      const mediaEmojiResource = sinon.createStubInstance(MediaEmojiResource) as any;
      const prepareForUploadStub = mediaEmojiResource.prepareForUpload;
      const emojiResource = new TestUploadingEmojiResource(mediaEmojiResource);
      emojiResource.prepareForUpload();
      return waitUntil(() => prepareForUploadStub.called).then(() => {
        expect(prepareForUploadStub.called).toBe(true);
      });
    });
  });
});

describe('#toneSelectionStorage', () => {
  const localStorage = global.window.localStorage;
  beforeEach(() => {
    global.window.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    global.window.localStorage.clear();
    global.window.localStorage = localStorage;
  });

  it('retrieves previously stored tone selection upon construction', () => {
    const getSpy = sinon.spy(global.window.localStorage, 'getItem');
    const provider = new EmojiResource(defaultApiConfig);
    // Linter throws an error if nothing done with EmojiResource
    provider.filter();
    expect(getSpy.callCount).toBe(1);
  });

  it('calling setSelectedTone calls setItem in localStorage', () => {
    const setSpy = sinon.spy(global.window.localStorage, 'setItem');
    const resource = new EmojiResource(defaultApiConfig);
    resource.setSelectedTone(1);
    expect(setSpy.callCount).toBe(1);
    expect(setSpy.getCall(0).args[0]).toBe(selectedToneStorageKey);
    expect(setSpy.getCall(0).args[1]).toBe('1');
  });
});

describe('helpers', () => {
  class TestEmojiProvider implements EmojiProvider {
    getAsciiMap = () => Promise.resolve(new Map([[grinEmoji.ascii![0], grinEmoji]]));
    findByShortName = shortName => Promise.resolve(evilburnsEmoji);
    findByEmojiId = emojiId => Promise.resolve(evilburnsEmoji);
    findById = emojiIdStr => Promise.resolve(evilburnsEmoji);
    findInCategory = categoryId => Promise.resolve([]);
    getSelectedTone = () => -1;
    setSelectedTone = tone => {};
    filter = (query, options) => {};
    subscribe = onChange => {};
    unsubscribe = onChange => {};
    loadMediaEmoji = () => undefined;
    optimisticMediaRendering = () => false;
  }

  class TestUploadingEmojiProvider extends TestEmojiProvider implements UploadingEmojiProvider {
    isUploadSupported = () => Promise.resolve(true);
    uploadCustomEmoji = upload => Promise.resolve(evilburnsEmoji);
    prepareForUpload = () => {};
  }

  it('supportsUploadFeature for UploadingEmojiProvider is true', () => {
    expect(supportsUploadFeature(new TestUploadingEmojiProvider())).toBe(true);
  });

  it('supportsUploadFeature for plain old EmojiProvider is false', () => {
    expect(supportsUploadFeature(new TestEmojiProvider())).toBe(false);
  });

});
