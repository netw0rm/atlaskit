import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';

import MediaEmojiResource from '../src/api/MediaEmojiResource';
import { EmojiDescription, ImageRepresentation, MediaApiToken, MediaApiRepresentation } from '../src/types';

import { blobResponse, defaultMediaApiToken, evilburnsEmoji, mediaEmoji, siteUrl } from './TestData';

const createMediaEmojiResource = (mediaApiToken?: MediaApiToken) => {
  mediaApiToken = mediaApiToken || defaultMediaApiToken();
  return new MediaEmojiResource(siteUrl, mediaApiToken);
};

const getMediaPath = (emoji: EmojiDescription): string => (
  (emoji.representation as MediaApiRepresentation).mediaPath
);

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
        matcher: `${siteUrl}/token/read`,
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
        matcher: `${siteUrl}/token/read`,
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
});
