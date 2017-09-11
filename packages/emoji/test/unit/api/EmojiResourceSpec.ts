import * as URLSearchParams from 'url-search-params';
import * as fetchMock from 'fetch-mock/src/client';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { OnProviderChange, SecurityOptions, ServiceConfig } from '@atlaskit/util-service-support';

import { waitUntil } from '@atlaskit/util-common-test';

import { EmojiDescription, EmojiSearchResult, EmojiServiceResponse, MediaApiRepresentation, SearchSort } from '../../../src/types';
import { selectedToneStorageKey } from '../../../src/constants';
import SiteEmojiResource from '../../../src/api/media/SiteEmojiResource';
import EmojiResource, {
    EmojiProvider,
    EmojiResourceConfig,
    supportsUploadFeature,
    UploadingEmojiProvider,
} from '../../../src/api/EmojiResource';
import EmojiRepository from '../../../src/api/EmojiRepository';

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
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    checkEmoji(emoji, actual[idx], idx);
  });
};

const checkEmoji = (expected: EmojiDescription, actual: EmojiDescription | undefined, idx?: number) => {
  expect(actual, 'Emoji is defined').to.not.equal(undefined);
  if (actual) {
    expect(actual.id, `emoji #${idx}`).to.equal(expected.id);
    expect(actual.shortName, `emoji #${idx}`).to.equal(expected.shortName);
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

/**
 * Extend the EmojiResource to provide access to its underlying EmojiRepository.
 */
class EmojiResourceWithEmojiRepositoryOverride extends EmojiResource {
  constructor(config: EmojiResourceConfig, emojiRepository: EmojiRepository) {
    super(config);
    // replace the usageTracker that was just constructed
    this.emojiRepository = emojiRepository;
  }
}

describe('EmojiResource', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#test data', () => {
    it('expected test data', () => {
      expect(standardEmojis.length > 0, 'More than 1 Standard Emoji').to.equal(true);
      expect(atlassianEmojis.length > 0, 'More than 1 Atlassian Emoji').to.equal(true);
    });
  });

  describe('#filter', () => {
    it('no providers', () => {
      const config = {
        ...defaultApiConfig,
        providers: [],
      };
      try {
        // tslint:disable-next-line:no-unused-expression
        new EmojiResource(config);
        expect(true, 'EmojiResource construction should throw error').to.equal(false);
      } catch (e) {
        expect(true, 'EmojiResource threw error due to no providers').to.equal(true);
      }
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
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        expect(emojiResponse.emojis.length, 'Number of emoji').to.equal(providerData1.length);
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
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        expect(emojiResponse.emojis.length, 'One emoji found').to.equal(1);
        const expectedSelectedSkinEmoji = (thumbsupEmoji.skinVariations && thumbsupEmoji.skinVariations[skinTone - 1]) as EmojiDescription;
        expect(emojiResponse.emojis[0].id).to.equal(expectedSelectedSkinEmoji.id);
        const emoji = emojiResponse.emojis[0];
        expect(emoji.shortName, 'Tone button emoji shortName').to.equal(expectedSelectedSkinEmoji.shortName);
        expect(emoji.id, 'Tone button emoji id').to.equal(expectedSelectedSkinEmoji.id);
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
        expect(onChange.resultCalls.length, 'Result called').to.equal(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData1.length + providerData2.length);
        checkOrder([ ...providerData1, ...providerData2 ], emojis);
      });
      resource.subscribe(onChange);
      resource.filter('', { sort: SearchSort.None });
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
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData2.length);
        checkOrder(providerData2, emojis);
        // Complete 1st emoji set
        resolveProvider1(providerServiceData1);
        return onChange.waitForResult();
      }).then(() => {
        // After 2nd dataset is loaded, this is for the 1st data set
        expect(onChange.resultCalls.length, 'Result called').to.equal(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData1.length + providerData2.length);
        checkOrder([ ...providerData1, ...providerData2 ], emojis);
      });
      resource.subscribe(onChange);
      resource.filter('', { sort: SearchSort.None });
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
        expect(onChange.resultCalls.length, 'Result called').to.equal(1);
        const emojis = onChange.resultCalls[0].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(providerData2.length);
        checkOrder(providerData2, emojis);
        expect(onChange.errorCalls.length, 'Errors occurred').to.equal(1);
      });
      resource.subscribe(onChange);
      resource.filter('', { sort: SearchSort.None });
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
        resolveProvider1(providerServiceData1);
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
        response: providerServiceData1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: providerServiceData2,
      });

      const resource = new EmojiResource(config);
      const onChange = new MockOnProviderChange();
      const filteredPromise = onChange.waitForResults(2).then(() => {
        expect(onChange.resultCalls.length, 'Result called').to.equal(2);
        const emojis = onChange.resultCalls[1].emojis;
        expect(emojis.length, 'Number of emoji').to.equal(2);
        expect(emojis[0].shortName).to.equal(':grin:');
        expect(emojis[1].shortName).to.equal(':grinning:');
      });
      resource.subscribe(onChange);
      resource.filter('grin');
      return filteredPromise;
    });
  });

  describe('#recordSelection', () => {
    let mockEmojiRepository: EmojiRepository;
    let mockRecordUsage: sinon.SinonStub;

    beforeEach(() => {
      mockEmojiRepository = <EmojiRepository>{};
      mockRecordUsage = sinon.stub();
      mockEmojiRepository.used = mockRecordUsage;
    });

    it('should call record endpoint and emoji repository', () => {
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

      const resource = new EmojiResourceWithEmojiRepositoryOverride(defaultApiConfig, mockEmojiRepository);

      return resource.recordSelection(grinEmoji).then(() => {
        expect(fetchMock.called('record')).to.equal(true);
        expect(mockRecordUsage.calledWith(grinEmoji)).to.equal(true);
      });
    });

    it('should record usage on emoji repository even when no recordConfig configured', () => {
      const resource = new EmojiResourceWithEmojiRepositoryOverride({ providers: [provider1] }, mockEmojiRepository);
      return resource.recordSelection(grinEmoji).then(() => {
        expect(mockRecordUsage.calledWith(grinEmoji)).to.equal(true);
      });
    });
  });

  describe('#deleteSiteEmoji', () => {
    it('Should not attempt to delete if there is no media emoji resource', () => {
      fetchMock.mock({
        matcher: `begin:${siteUrl}`,
        response: {
          emojis: siteServiceEmojis().emojis,
          // no meta.mediaApiToken means no media resource created
        },
        times: 1,
      }).mock({
        matcher: `${siteUrl}/${mediaEmoji.id}`,
        response: 200,
      });

      const config = {
        ...defaultApiConfig,
        providers: [{
          url: siteUrl,
        }],
      };

      const resource = new EmojiResource(config);
      return resource.deleteSiteEmoji(mediaEmoji).then(success => expect(success).to.equal(false));
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
        expect(emoji).to.equal(undefined);
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
        expect(emoji, 'Emoji not found due to failed provider').to.equal(undefined);
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
          expect (fetchSiteEmojiCalls.length, 'Called fetch site emoji on server').to.equal(1);
          expect(emoji).to.deep.equal(missingMediaEmoji);
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
          expect (fetchSiteEmojiCalls.length, 'Called fetch site emoji on server').to.equal(1);
          expect(emoji).to.deep.equal(mediaEmoji);
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
          expect (fetchSiteEmojiCalls.length, 'No call fetch site emoji on server').to.equal(0);
          // media url not loaded - url pass through
          const { width, height, mediaPath } = mediaEmoji.representation as MediaApiRepresentation;
          expect(emoji).to.deep.equal({
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
        expect(emoji).to.equal(undefined);
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
        expect(emoji).to.equal(undefined);
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
        expect(emoji, 'Emoji not found due to failed provider').to.equal(undefined);
      });
      resolveProvider2(providerServiceData2);
      return done;
    });

    it('Two providers, ignore in failing provider', () => {
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
    private mockSiteEmojiResource?: SiteEmojiResource;

    constructor(mockSiteEmojiResource?: SiteEmojiResource, config?: EmojiResourceConfig) {
      super({
        providers: [provider1],
        allowUpload: true,
        ...config,
      });
      this.mockSiteEmojiResource = mockSiteEmojiResource;
    }

    protected initSiteEmojiResource(emojiResponse, provider) {
      this.siteEmojiResource = this.mockSiteEmojiResource;
      return Promise.resolve();
    }
  }

  describe('#isUploadSupported', () => {
    it('resource has custom emoji with media support and upload token', () => {
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      const hasUploadTokenStub = siteEmojiResource.hasUploadToken;
      hasUploadTokenStub.returns(Promise.resolve(true));
      const config: EmojiResourceConfig = { allowUpload: true } as EmojiResourceConfig;

      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource, config);

      return emojiResource.isUploadSupported().then(supported => {
        expect(supported, 'Upload is supported').to.equal(true);
      });
    });

    it('should not allow upload if no upload token', () => {
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      const hasUploadTokenStub = siteEmojiResource.hasUploadToken;
      hasUploadTokenStub.returns(Promise.resolve(false));
      const config: EmojiResourceConfig = { allowUpload: true } as EmojiResourceConfig;

      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource, config);
      return emojiResource.isUploadSupported().then(supported => {
        expect(supported, 'Upload is not supported').to.equal(false);
      });
    });

    it('resource has no media support', () => {
      const emojiResource = new TestUploadingEmojiResource();
      return emojiResource.isUploadSupported().then(supported => {
        expect(supported, 'Upload is not supported').to.equal(false);
      });
    });

    it('allowUpload is false', () => {
      const emojiResource = new TestUploadingEmojiResource(sinon.createStubInstance(SiteEmojiResource) as any, { allowUpload: false } as EmojiResourceConfig);
      return emojiResource.isUploadSupported().then(supported => {
        expect(supported, 'Upload is not supported').to.equal(false);
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
      return emojiResource.uploadCustomEmoji(upload).then(emoji => {
        expect(true, 'Promise should have been rejected').to.equal(false);
      }).catch(error => {
        expect(true, 'Promise should be rejected').to.equal(true);
      });
    });

    it('media support - upload successful', () => {
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      const hasUploadTokenStub = siteEmojiResource.hasUploadToken;
      hasUploadTokenStub.returns(Promise.resolve(true));
      const uploadEmojiStub = siteEmojiResource.uploadEmoji;
      uploadEmojiStub.returns(Promise.resolve(mediaEmoji));

      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource);

      return emojiResource.uploadCustomEmoji(upload).then(emoji => {
        expect(uploadEmojiStub.calledWith(upload), 'upload called on siteEmojiResource').to.equal(true);
        expect(emoji, 'Emoji uploaded').to.equal(mediaEmoji);
      });
    });

    it('media support - upload error', () => {
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      const hasUploadTokenStub = siteEmojiResource.hasUploadToken;
      hasUploadTokenStub.returns(Promise.resolve(true));
      const uploadEmojiStub = siteEmojiResource.uploadEmoji;
      uploadEmojiStub.returns(Promise.reject('bad things'));

      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource);
      return emojiResource.uploadCustomEmoji(upload).then(emoji => {
        expect(true, 'Promise should have been rejected').to.equal(false);
      }).catch(error => {
        expect(uploadEmojiStub.calledWith(upload), 'upload called on siteEmojiResource').to.equal(true);
        expect(true, 'Promise should be rejected').to.equal(true);
      });
    });
  });

  describe('#prepareForUpload', () => {
    it('no media support - no error', () => {
      const emojiResource = new TestUploadingEmojiResource();
      emojiResource.prepareForUpload();
      expect(true, 'executed without error').to.equal(true);
    });

    it('media support - token primed', () => {
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      const prepareForUploadStub = siteEmojiResource.prepareForUpload;
      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource);
      emojiResource.prepareForUpload();
      return waitUntil(() => prepareForUploadStub.called).then(() => {
        expect(prepareForUploadStub.called, 'upload called on siteEmojiResource').to.equal(true);
      });
    });
  });

  describe('#deleteSiteEmoji', () => {
    it('calls delete in SiteEmojiResource', () => {
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource);
      const deleteStub = siteEmojiResource.deleteEmoji;
      emojiResource.deleteSiteEmoji(mediaEmoji);
      return waitUntil(() => deleteStub.called).then(() => {
        expect(deleteStub.called, 'delete called on siteEmojiResource').to.equal(true);
      });
    });

    it('can find mediaEmoji by id if not yet deleted', () => {
      fetchMock.mock({
        matcher: `begin:${siteUrl}`,
        response: siteServiceEmojis(),
        times: 1,
      });

      const config = {
        providers: [{
          url: siteUrl,
        }],
      };
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      siteEmojiResource.deleteEmoji = () => Promise.resolve(true);
      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource, config);
      return alwaysPromise(emojiResource.findById(mediaEmoji.id!)).then(emoji =>
        expect(emoji).to.deep.equal(mediaEmoji)
      ).catch(() => expect(true).to.equal(false));
    });

    it('removes the deleted emoji from the emoji repository', () => {
      fetchMock.mock({
        matcher: `begin:${siteUrl}`,
        response: siteServiceEmojis(),
        times: 1,
      });

      const config = {
        providers: [{
          url: siteUrl,
        }],
      };
      const siteEmojiResource = sinon.createStubInstance(SiteEmojiResource) as any;
      siteEmojiResource.deleteEmoji = () => Promise.resolve(true);
      const emojiResource = new TestUploadingEmojiResource(siteEmojiResource, config);
      return emojiResource.deleteSiteEmoji(mediaEmoji).then(result => {
        expect(result).to.equal(true);
        const emojiPromise = alwaysPromise(emojiResource.findById(mediaEmoji.id!));
        return emojiPromise.then(emoji => expect(emoji).to.equal(undefined));
      }).catch(() => expect(true).to.equal(false));
    });
  });
});

describe('#toneSelectionStorage', () => {
  let originalLocalStorage;

  let mockStorage: Storage;
  let mockGetItem: sinon.SinonStub;
  let mockSetItem: sinon.SinonStub;


  beforeEach(() => {
    originalLocalStorage = global.window.localStorage;

    mockGetItem = sinon.stub();
    mockSetItem = sinon.stub();
    mockStorage = <Storage> {};
    mockStorage.getItem = mockGetItem;
    mockStorage.setItem = mockSetItem;

    global.window.localStorage = mockStorage;
  });

  afterEach(() => {
    global.window.localStorage = originalLocalStorage;
  });

  it('retrieves previously stored tone selection upon construction', () => {
    // tslint:disable-next-line:no-unused-expression
    new EmojiResource(defaultApiConfig);

    expect(mockGetItem.calledWith(selectedToneStorageKey)).to.equal(true);
  });

  it('calling setSelectedTone calls setItem in localStorage', () => {
    const resource = new EmojiResource(defaultApiConfig);
    const tone = 3;
    resource.setSelectedTone(tone);
    expect(mockSetItem.calledWith(selectedToneStorageKey, tone));
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
    deleteSiteEmoji = emoji => Promise.resolve(false);
    filter = (query, options) => {};
    subscribe = onChange => {};
    unsubscribe = onChange => {};
    loadMediaEmoji = () => undefined;
    optimisticMediaRendering = () => false;
    getFrequentlyUsed = (options?) => Promise.resolve([]);
  }

  class TestUploadingEmojiProvider extends TestEmojiProvider implements UploadingEmojiProvider {
    isUploadSupported = () => Promise.resolve(true);
    uploadCustomEmoji = upload => Promise.resolve(evilburnsEmoji);
    prepareForUpload = () => {};
  }

  it('supportsUploadFeature for UploadingEmojiProvider is true', () => {
    expect(supportsUploadFeature(new TestUploadingEmojiProvider()), 'Supports upload feature').to.equal(true);
  });

  it('supportsUploadFeature for plain old EmojiProvider is false', () => {
    expect(supportsUploadFeature(new TestEmojiProvider()), 'Does not support upload feature').to.equal(false);
  });

});
