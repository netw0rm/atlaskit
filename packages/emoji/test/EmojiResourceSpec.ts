import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as sinon from 'sinon';

import EmojiResource, { denormaliseEmojis, EmojiProviderConfig, EmojiResourceConfig, SecurityOptions } from '../src/api/EmojiResource';
import { SpriteRepresentation } from '../src/types';

const baseUrl = 'https://bogus/';
const p1Url = 'https://p1/';
const p2Url = 'https://p2/';

const defaultSecurityHeader = 'X-Bogus';

const header = (code: string | number): SecurityOptions => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
});

const getSecurityHeader = call => call[0].headers.get(defaultSecurityHeader);

const defaultSecurityCode = '10804';

const defaultApiConfig: EmojiResourceConfig = {
  url: baseUrl,
  securityProvider() {
    return header(defaultSecurityCode);
  },
  providers: [],
};

const provider1: EmojiProviderConfig = {
  url: p1Url,
  securityProvider: () => header(defaultSecurityCode),
};

const provider2: EmojiProviderConfig = {
  url: p2Url,
};

const providerData1 = [
  { id: 'a' },
  { id: 'b' },
  { id: 'c' },
];
const providerData2 = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const fetchResponse = data => ({ emojis: data });

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji.id, `emoji #${idx}`).to.equal(actual[idx].id);
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
      return resource.loadAllEmoji().then((emojiResponse) => {
        checkOrder([], emojiResponse.emojis);
      });
    });

    it('single provider', () => {
      const config = {
        ...defaultApiConfig,
        providers: [provider1],
      };
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojiResponse) => {
        checkOrder(providerData1, emojiResponse.emojis);
      });
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
      return resource.loadAllEmoji().then((emojiResponse) => {
        checkOrder([...providerData1, ...providerData2], emojiResponse.emojis);
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
          setTimeout(() => { resolve(fetchResponse(providerData1)); }, 5);
        }),
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojiResponse) => {
        checkOrder([...providerData1, ...providerData2], emojiResponse.emojis);
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
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojiResponse) => {
        checkOrder(providerData2, emojiResponse.emojis);
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
        response: fetchResponse(providerData1),
        times: 1,
      }).mock({
        matcher: `begin:${provider2.url}`,
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojiResponse) => {
        expect(refreshedSecurityProvider.callCount, 'refreshedSecurityProvider called once').to.equal(1);
        const calls = fetchMock.calls(provider401Matcher.name);
        expect(calls.length, 'number of calls to fetch').to.equal(2);
        expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
        expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');

        checkOrder([...providerData1, ...providerData2], emojiResponse.emojis);
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
        response: fetchResponse(providerData2),
      });

      const resource = new EmojiResource(config);
      return resource.loadAllEmoji().then((emojiResponse) => {
        expect(refreshedSecurityProvider.callCount, 'refreshedSecurityProvider called once').to.equal(1);
        const calls = fetchMock.calls(provider401Matcher.name);
        expect(calls.length, 'number of calls to fetch').to.equal(2);
        expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
        expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');
        // provider 1 data not returned due to two 401's
        checkOrder(providerData2, emojiResponse.emojis);
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

      return resource.recordEmojiSelection({ id: ':bacon:' }).then(() => {
        expect(fetchMock.called('record')).to.equal(true);
      });
    });
  });

  describe('#denormaliseEmojis', () => {
    const emojiFields = ['id', 'name', 'shortcut', 'type', 'category', 'order'];

    const checkFields = (actual, expected, fields) => {
      fields.forEach((field) => {
        expect(actual[field], field).to.equal(expected[field]);
      });
    };

    it('denormaliseEmojis emoji with sprite', () => {
      const spriteRef = 'http://spriteref/test.png';
      const emoji = {
        id: '1f600',
        name: 'grinning face',
        shortcut: 'grinning',
        type: 'STANDARD',
        category: 'PEOPLE',
        order: 1,
        skinVariations: [
          {
            spriteRef,
            x: 666,
            y: 777,
            height: 42,
            width: 43,
            xIndex: 6,
            yIndex: 23,
          },
        ],
        representation: {
          spriteRef,
          x: 216,
          y: 2304,
          height: 72,
          width: 75,
          xIndex: 3,
          yIndex: 32,
        },
      };
      const spriteSheet = {
        url: spriteRef,
        row: 41,
        column: 56,
        height: 2952,
        width: 4032,
      };
      const emojiResponse = denormaliseEmojis({
        emojis: [emoji],
        meta: {
          spriteSheets: {
            [spriteRef]: spriteSheet,
          },
        },
      });
      const emojis = emojiResponse.emojis;
      expect(emojis.length).to.equal(1);
      const e = emojis[0];
      checkFields(e, emoji, emojiFields);
      const spriteFields = ['x', 'y', 'height', 'width', 'xIndex', 'yIndex'];
      checkFields(e.representation, emoji.representation, spriteFields);
      const spriteSheetFields = ['url', 'row', 'column', 'height', 'width'];
      const representation = e.representation as SpriteRepresentation;
      checkFields(representation && representation.sprite, spriteSheet, spriteSheetFields);
      expect(e.skinVariations && e.skinVariations.length).to.equal(1);
      if (e.skinVariations) {
        const skin0 = e.skinVariations[0] as SpriteRepresentation;
        checkFields(skin0, emoji.skinVariations[0], spriteFields);
        checkFields(skin0.sprite, spriteSheet, spriteSheetFields);
      }
    });

    it('denormaliseEmojis emoji with image', () => {
      const emoji = {
        id: '13d29267-ff9e-4892-a484-1a1eef3b5ca3',
        name: 'standup.png',
        shortcut: 'standup.png',
        type: 'SITE',
        category: 'CUSTOM',
        order: -1,
        skinVariations: [
          {
            imagePath: 'https://something/something2.png',
            height: 666,
            width: 666,
          },
        ],
        representation: {
          imagePath: 'https://something/something.png',
          height: 64,
          width: 64,
        },
      };
      const emojiResponse = denormaliseEmojis({
        emojis: [emoji],
      });
      const emojis = emojiResponse.emojis;
      expect(emojis.length).to.equal(1);
      const e = emojis[0];
      checkFields(e, emoji, emojiFields);
      checkFields(e.representation, emoji.representation, ['imagePath', 'height', 'width']);
      expect(e.skinVariations && e.skinVariations.length).to.equal(1);
      checkFields(e.skinVariations && e.skinVariations[0], emoji.skinVariations[0], ['imagePath', 'height', 'width']);
    });
  });
});
