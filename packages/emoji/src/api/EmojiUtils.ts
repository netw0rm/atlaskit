import { KeyValues, RequestServiceOptions, ServiceConfig, utils as serviceUtils } from '@atlaskit/util-service-support';
import {
  AlternateRepresentations,
  EmojiDescription,
  EmojiDescriptionWithVariations,
  EmojiVariationDescription,
  EmojiMeta,
  EmojiRepresentation,
  EmojiResponse,
  EmojiServiceDescription,
  EmojiServiceDescriptionWithVariations,
  EmojiServiceRepresentation,
  EmojiServiceResponse,
  SpriteServiceRepresentation,
} from '../types';
import { isImageRepresentation, isSpriteServiceRepresentation } from '../type-helpers';
import debug from '../util/logger';

export interface EmojiLoaderConfig extends ServiceConfig {
  getRatio?: () => number;
}

export const emojiRequest = (provider: EmojiLoaderConfig, options?: RequestServiceOptions): Promise<EmojiServiceResponse> => {
  const { getRatio = getPixelRatio, ...serviceConfig } = provider;
  const scaleQueryParams: KeyValues = calculateScale(getRatio);
  const { queryParams = {}, ...otherOptions } = options || {};
  const requestOptions = {
    ...otherOptions,
    queryParams: {
      ...scaleQueryParams,
      ...queryParams,
    },
  };
  return serviceUtils.requestService<EmojiServiceResponse>(serviceConfig, requestOptions);
};

const calculateScale = (getRatio: () => number): KeyValues => {
  // Retina display
  if (getRatio() > 1) {
    return { scale: 'XHDPI', altScale: 'XXXHDPI' };
  }
  // Default set used for desktop
  return { altScale: 'XXHDPI' };
};

const getPixelRatio = (): number => {
  return window.devicePixelRatio;
};

export const getAltRepresentation = (reps: AlternateRepresentations): EmojiServiceRepresentation => {
  return reps['XXXHDPI'] || reps['XXHDPI'];
};

export const isMediaApiUrl = (url: string, meta?: EmojiMeta): boolean =>
  !!(meta && meta.mediaApiToken && url.indexOf(meta.mediaApiToken.url) === 0);

export const denormaliseServiceRepresentation = (representation: EmojiServiceRepresentation, meta?: EmojiMeta): EmojiRepresentation => {
  if (isSpriteServiceRepresentation(representation) && meta && meta.spriteSheets) {
    const { height, width, x, y, xIndex, yIndex, spriteRef } = representation as SpriteServiceRepresentation;
    const spriteSheet = meta.spriteSheets[spriteRef];
    if (spriteSheet) {
      return {
        sprite: spriteSheet,
        height,
        width,
        x,
        y,
        xIndex,
        yIndex,
      };
    }
  } else if (isImageRepresentation(representation)) {
    const { height, width, imagePath } = representation;
    if (isMediaApiUrl(imagePath, meta)) {
      // Convert to MediaApiRepresentation
      return {
        height,
        width,
        mediaPath: imagePath,
      };
    }
    return {
      height,
      width,
      imagePath,
    };
  }

  debug('failed conversion for representation', representation, meta);

  return undefined;
};

export const denormaliseServiceAlternativeRepresentation = (altReps?: AlternateRepresentations, meta?: EmojiMeta): EmojiRepresentation => {
  return altReps ? denormaliseServiceRepresentation(getAltRepresentation(altReps), meta) : undefined;
};

export const denormaliseSkinEmoji = (emoji: EmojiServiceDescriptionWithVariations, meta?: EmojiMeta): EmojiDescriptionWithVariations[] => {
  if (!emoji.skinVariations) {
    return [];
  }

  const skinEmoji: EmojiServiceDescription[] = emoji.skinVariations;
  const baseId = emoji.id;

  return skinEmoji.map((skin): EmojiVariationDescription => {
    const { representation, altRepresentations, ...other } = skin;
    return {
      baseId: baseId,
      representation: denormaliseServiceRepresentation(representation, meta),
      altRepresentation: denormaliseServiceAlternativeRepresentation(altRepresentations, meta),
      ...other
    };
  });
};

/**
 * Denormalised an emoji response (emojis + sprite references) into an array of
 * emoji with local sprite definitions.
 */
export const denormaliseEmojiServiceResponse = (emojiData: EmojiServiceResponse): EmojiResponse  => {
  const emojis: EmojiDescription[] = emojiData.emojis.map((emoji: EmojiServiceDescriptionWithVariations): EmojiDescriptionWithVariations => {
    const newRepresentation = denormaliseServiceRepresentation(emoji.representation, emojiData.meta);
    const newAlternateRepresentation = denormaliseServiceAlternativeRepresentation(emoji.altRepresentations, emojiData.meta);
    const newSkinVariations = denormaliseSkinEmoji(emoji, emojiData.meta);

    // create trimmedServiceDesc which is emoi with no representation or skinVariations
    const { representation, skinVariations, altRepresentations, ...trimmedServiceDesc } = emoji;

    return {
      ...trimmedServiceDesc,
      representation: newRepresentation,
      altRepresentation: newAlternateRepresentation,
      skinVariations: newSkinVariations
    };
  });

  const mediaApiToken = emojiData.meta && emojiData.meta.mediaApiToken;

  return {
    emojis,
    mediaApiToken,
  };
};
