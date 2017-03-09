import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

import { requestService, ServiceConfig } from './SharedResourceUtils';
import debug from '../util/logger';

import {
  EmojiDescription,
  EmojiMeta,
  EmojiRepresentation,
  EmojiResponse,
  EmojiServiceDescription,
  EmojiServiceRepresentation,
  EmojiServiceResponse,
  ImageRepresentation,
  SpriteServiceRepresentation,
} from '../types';

import { isImageRepresentation, isSpriteServiceRepresentation } from '../type-helpers';

const emojiRequest = (provider: ServiceConfig): Promise<EmojiServiceResponse> => {
  const { url, securityProvider, refreshedSecurityProvider } = provider;
  const secOptions = securityProvider && securityProvider();
  return requestService(url, '', {}, {}, secOptions, refreshedSecurityProvider);
};

export const isMediaApi = (url: string, meta?: EmojiMeta): boolean =>
  !!(meta && meta.mediaApiToken && url.indexOf(meta.mediaApiToken.url) === 0);

export const denormaliseServiceRepresentation = (representation: EmojiServiceRepresentation, meta?: EmojiMeta): EmojiRepresentation => {
  if (isSpriteServiceRepresentation(representation) && meta && meta.spriteSheets) {
    const { height, width, x, y, xIndex, yIndex, spriteRef } = representation as SpriteServiceRepresentation;
    const spriteSheet = meta.spriteSheets[spriteRef];
    const mediaApi = isMediaApi(spriteSheet.url, meta);
    if (spriteSheet) {
      return {
        sprite: spriteSheet,
        height,
        width,
        x,
        y,
        xIndex,
        yIndex,
        mediaApi,
      };
    }
  } else if (isImageRepresentation(representation)) {
    const { height, width, imagePath } = representation as ImageRepresentation;
    const mediaApi = isMediaApi(imagePath, meta);
    return {
      height,
      width,
      imagePath,
      mediaApi,
    };
  }

  debug('failed conversion for representation', representation, meta);

  return undefined;
};

export const denormaliseSkinServiceRepresentation = (skins?: EmojiServiceRepresentation[], meta?: EmojiMeta): EmojiRepresentation[] => {
  if (!skins) {
    return [];
  }
  return skins.map(skin => denormaliseServiceRepresentation(skin, meta));
};

/**
 * Denormalised an emoji response (emojis + sprite references) into an array of
 * emoji with local sprite definitions.
 */
export const denormaliseEmojiServiceResponse = (emojiData: EmojiServiceResponse): EmojiResponse  => {
  const emojis: EmojiDescription[] = emojiData.emojis.map((emoji: EmojiServiceDescription): EmojiDescription => {
    const { id, name, shortcut, type, category, order } = emoji;
    const representation = denormaliseServiceRepresentation(emoji.representation, emojiData.meta);
    const skinVariations = denormaliseSkinServiceRepresentation(emoji.skinVariations, emojiData.meta);

    return {
      id,
      name,
      shortcut,
      type,
      category,
      order,
      representation,
      skinVariations,
    };
  });

  const mediaApiToken = emojiData.meta && emojiData.meta.mediaApiToken;

  return {
    emojis,
    mediaApiToken,
  };
};

/**
 * Emoji providers should return JSON in the format defined by EmojiServiceResponse.
 */
export default class EmojiLoader {

  private config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  /**
   * Returns a promise with an array of Emoji from all providers.
   */
  loadEmoji(): Promise<EmojiResponse> {
    const emojisPromise = emojiRequest(this.config);
    return emojisPromise.then(emojiServiceResponse => denormaliseEmojiServiceResponse(emojiServiceResponse));
  }
}
