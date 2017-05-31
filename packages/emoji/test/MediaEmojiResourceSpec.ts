import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as sinon from 'sinon';

import MediaEmojiResource, { TokenManager } from '../src/api/MediaEmojiResource';
import { EmojiDescription, ImageRepresentation, MediaApiToken, MediaApiRepresentation } from '../src/types';

import {
    blobResponse,
    defaultMediaApiToken,
    expiresAt,
    evilburnsEmoji,
    mediaEmoji,
    siteServiceConfig,
    siteUrl
} from './TestData';

const createMediaEmojiResource = (mediaApiToken?: MediaApiToken) => {
  mediaApiToken = mediaApiToken || defaultMediaApiToken();
  return new MediaEmojiResource(siteServiceConfig, mediaApiToken);
};

const getMediaPath = (emoji: EmojiDescription): string => (
  (emoji.representation as MediaApiRepresentation).mediaPath
);

const tokenReadUrl = `${siteUrl}/token/read`;
const tokenUploadUrl = `${siteUrl}/token/upload`;

class TestMediaEmojiResource extends MediaEmojiResource {
  constructor(tokenManager: TokenManager) {
    super(siteServiceConfig, defaultMediaApiToken());
    this.tokenManager = tokenManager;
  }
}

describe('MediaEmojiResource', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#getMediaEmojiAsImageEmoji', () => {
    it('not media emoji', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(evilburnsEmoji).then(emoji => {
        expect(emoji).to.deep.equal(evilburnsEmoji);
      });
    });

    it('media emoji', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: blobResponse(blob),
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        const { width, height } = mediaEmoji.representation as MediaApiRepresentation;
        const { imagePath } = emoji.representation as ImageRepresentation;

        const expectedEmoji = {
          ...mediaEmoji,
          representation: {
            width,
            height,
            imagePath, // check this separately
          }
        };
        expect(imagePath.indexOf('data:')).to.equal(0);
        expect(emoji).to.deep.equal(expectedEmoji);
      });
    });

    it('media emoji expired token', () => {
      const mediaApiToken = {
        ...defaultMediaApiToken(),
        expiresAt: Math.floor(Date.now() / 1000) - 60, // seconds since Epoch UTC
      };

      const mediaEmojiResource = createMediaEmojiResource(mediaApiToken);
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: blobResponse(blob),
      }).mock({
        matcher: tokenReadUrl,
        response: defaultMediaApiToken(),
        name: 'token-refresh',
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        const { width, height } = mediaEmoji.representation as MediaApiRepresentation;
        const { imagePath } = emoji.representation as ImageRepresentation;
        const expectedEmoji = {
          ...mediaEmoji,
          representation: {
            width,
            height,
            imagePath, // check this separately
          }
        };

        expect(fetchMock.called('token-refresh'), 'token refresh called').to.equal(true);
        expect(imagePath.indexOf('data:')).to.equal(0);
        expect(emoji).to.deep.equal(expectedEmoji);
      });
    });

    it('media emoji bad token', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      const blob = new Blob();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: 403,
        times: 1,
      }).mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: blobResponse(blob),
      }).mock({
        matcher: tokenReadUrl,
        response: defaultMediaApiToken(),
        name: 'token-refresh',
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        const { width, height } = mediaEmoji.representation as MediaApiRepresentation;
        const { imagePath } = emoji.representation as ImageRepresentation;
        const expectedEmoji = {
          ...mediaEmoji,
          representation: {
            width,
            height,
            imagePath, // check this separately
          }
        };

        expect(fetchMock.called('token-refresh'), 'token refresh called').to.equal(true);
        expect(imagePath && imagePath.indexOf('data:')).to.equal(0);
        expect(emoji).to.deep.equal(expectedEmoji);
      });
    });

    it('media fails to load', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: 404,
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        // returns original
        expect(emoji).to.deep.equal(mediaEmoji);
      });
    });

    it('media fails to load (rejection)', () => {
      const mediaEmojiResource = createMediaEmojiResource();
      fetchMock.mock({
        matcher: `begin:${getMediaPath(mediaEmoji)}`,
        response: {
          throws: new Error(),
        },
      });
      return mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji).then(emoji => {
        // returns original
        expect(emoji).to.deep.equal(mediaEmoji);
      });
    });
  });

  describe('#uploadEmoji', () => {
    it('successful upload', () => {
      // stub media api
      expect(true, 'todo').to.equal(false);
    });

    it('upload error', () => {
      expect(true, 'todo').to.equal(false);
    });

    it('media progress events', () => {
      expect(true, 'todo').to.equal(false);
    });
  });

  describe('#prepareForUpload', () => {
    it('prepareForUpload initiates request for new token from server', () => {
      const tokenManagerStub = sinon.createStubInstance(TokenManager) as any;
      const getTokenStub = tokenManagerStub.getToken;
      const mediaEmojiResource = new TestMediaEmojiResource(tokenManagerStub);
      mediaEmojiResource.prepareForUpload();
      expect(getTokenStub.called, 'getToken called').to.equal(true);
    });
  });
});

describe('TokenManager', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#addToken', () => {
    it('added token immediately available from getToken read', () => {
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      const addedToken = defaultMediaApiToken();
      tokenManager.addToken('read', addedToken);
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals added token').to.deep.equal(addedToken);
      });
    });
  });

  describe('#getToken', () => {
    it('get initial read token refreshed from server', () => {
      const expectedToken = defaultMediaApiToken();
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken,
        },
        name: 'token-read',
      });
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals added token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once').to.equal(1);
      });
    });

    it('second get read returns current token', () => {
      const expectedToken = defaultMediaApiToken();
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken,
        },
        name: 'token-read',
      });
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals new token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once').to.equal(1);
        return tokenManager.getToken('read');
      }).then(token => {
        expect(token, 'Returned token equals same token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once (i.e. not again)').to.equal(1);
      });
    });

    it('second get with force read returns new token', () => {
      const expectedToken1 = defaultMediaApiToken();
      const expectedToken2 = {
        ...defaultMediaApiToken(),
        expiresAt: expiresAt(500),
        clientId: 'forced-refresh',
      };
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken1,
        },
        name: 'token-read-1',
        times: 1,
      }).mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken2,
        },
        name: 'token-read-2',
      });

      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });

      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals new token').to.deep.equal(expectedToken1);
        expect(fetchMock.calls('token-read-1').length, 'Called server once').to.equal(1);
        return tokenManager.getToken('read', true);
      }).then(token => {
        expect(token, 'Returned token equals new token').to.deep.equal(expectedToken2);
        expect(fetchMock.calls('token-read-2').length, 'Called server again').to.equal(1);
      });
    });

    it('get expired read token refreshes from server', () => {
      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });

      const addedToken = {
        ...defaultMediaApiToken(),
        expiresAt: expiresAt(-60),
      };

      const expectedToken = defaultMediaApiToken();
      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedToken,
        },
        name: 'token-read',
      });

      tokenManager.addToken('read', addedToken);
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned token equals added token').to.deep.equal(expectedToken);
        expect(fetchMock.calls('token-read').length, 'Called server once').to.equal(1);
      });
    });

    it('read / upload tokens are separate tokens', () => {
      const expectedReadToken = {
        ...defaultMediaApiToken(),
        clientId: 'read',
      };
      const expectedUploadToken = {
        ...defaultMediaApiToken(),
        clientId: 'upload',
      };

      fetchMock.mock({
        matcher: tokenReadUrl,
        response: {
          body: expectedReadToken,
        },
        name: 'token-read',
      }).mock({
        matcher: tokenUploadUrl,
        response: {
          body: expectedUploadToken,
        },
        name: 'token-upload',
      });

      const tokenManager = new TokenManager({
        url: siteServiceConfig.url,
      });
      return tokenManager.getToken('read').then(token => {
        expect(token, 'Returned read token equals new read token').to.deep.equal(expectedReadToken);
        expect(fetchMock.calls('token-read').length, 'Called server once for read token').to.equal(1);
        return tokenManager.getToken('upload');
      }).then(token => {
        expect(token, 'Returned upload token equals upload token').to.deep.equal(expectedUploadToken);
        expect(fetchMock.calls('token-upload').length, 'Called server once for upload token').to.equal(1);
      });
    });
  });
});
