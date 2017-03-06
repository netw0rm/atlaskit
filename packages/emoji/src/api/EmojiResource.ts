import * as URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

import debug from '../util/logger';

import {
  EmojiDescription,
  EmojiId,
  EmojiMeta,
  EmojiRepresentation,
  EmojiResponse,
  EmojiServiceDescription,
  EmojiServiceRepresentation,
  EmojiServiceResponse,
  ImageRepresentation,
  isImageRepresentation,
  isSpriteServiceRepresentation,
  MediaApiToken,
  SpriteServiceRepresentation,
} from '../types';

export interface KeyValues {
  [index: string]: any;
}

export interface SecurityOptions {
  params?: KeyValues;
  headers?: KeyValues;
}

/**
 * Returns a promise to a SecurityOptions that has just been forcibly refreshed with a
 * new token. Will be used for single retry per request if a 401 is returned.
 */
export interface RefreshSecurityProvider {
  (): Promise<SecurityOptions>;
}

/**
 * Returns the current SecurityOptions for the mentions service.
 */
export interface SecurityProvider {
  (): SecurityOptions;
}

export interface EmojiProviderConfig {
  url: string; /* url for this specific emoji configuration */
  securityProvider?: SecurityProvider;
  refreshedSecurityProvider?: RefreshSecurityProvider;
}

export interface EmojiResourceConfig {
  /** the base url of the emoji service */
  url: string;
  securityProvider?: SecurityProvider;
  refreshedSecurityProvider?: RefreshSecurityProvider;

  providers: EmojiProviderConfig[];
}

const buildUrl = (baseUrl: string, path: string | undefined, data: KeyValues, secOptions: SecurityOptions | undefined) => {
  const searchParam = new URLSearchParams();
  for (const key in data) { // eslint-disable-line no-restricted-syntax
    if ({}.hasOwnProperty.call(data, key)) {
      searchParam.append(key, data[key]);
    }
  }
  if (secOptions && secOptions.params) {
    for (const key in secOptions.params) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(secOptions.params, key)) {
        const values = secOptions.params[key];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            searchParam.append(key, values[i]);
          }
        } else {
          searchParam.append(key, values);
        }
      }
    }
  }
  let seperator = '';
  if (path && baseUrl.substr(-1) !== '/') {
    seperator = '/';
  }
  return `${baseUrl}${seperator}${path}?${searchParam.toString()}`;
};

const buildHeaders = (secOptions?: SecurityOptions) => {
  const headers = new Headers();
  if (secOptions && secOptions.headers) {
    for (const key in secOptions.headers) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(secOptions.headers, key)) {
        const values = secOptions.headers[key];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            headers.append(key, values[i]);
          }
        } else {
          headers.append(key, values);
        }
      }
    }
  }

  return headers;
};

/**
 * @returns Promise containing the json response
 */
const requestService = (baseUrl: string, path: string | undefined, data: KeyValues, opts: KeyValues,
                        secOptions: SecurityOptions | undefined, refreshedSecurityProvider?: RefreshSecurityProvider) : Promise<any> => {
  const url = buildUrl(baseUrl, path, data, secOptions);
  const headers = buildHeaders(secOptions);
  const options = {
    ...opts,
    ...{ headers },
  };
  return fetch(new Request(url, options))
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401 && refreshedSecurityProvider) {
        // auth issue - try once
        debug('401 attempting a forced refresh from securityProvider');
        return refreshedSecurityProvider().then(newSecOptions => (
          requestService(baseUrl, path, data, opts, newSecOptions)
        ));
      }
      return Promise.reject({
        code: response.status,
        reason: response.statusText,
      });
    });
};

const nonRejectingPromise = (promise: Promise<any>, rejectValue: any): Promise<any> => (
  promise.catch((err) => {
    debug('Promise failed, resolving with default value instead. Err:', err);
    return Promise.resolve(rejectValue);
  })
);

const emojiRequest = (provider: EmojiProviderConfig): Promise<EmojiServiceResponse> => {
  const { url, securityProvider, refreshedSecurityProvider } = provider;
  const secOptions = securityProvider && securityProvider();
  const emojiPromise = requestService(url, '', {}, {}, secOptions, refreshedSecurityProvider);
  return nonRejectingPromise(emojiPromise, { emojis: [] });
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

  debug('failed conversation for representation', representation, meta);

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
 * emoji will local sprite definitions.
 */
export const denormaliseEmojis = (emojiData: EmojiServiceResponse): EmojiResponse  => {
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
export default class EmojiResource {

  private config: EmojiResourceConfig;

  constructor(config: EmojiResourceConfig) {
    this.config = config;
  }

  /**
   * Returns a promise with an array of Emoji from all providers.
   */
  loadAllEmoji(): Promise<EmojiResponse> {
    const emojiPromises: Promise<EmojiServiceResponse>[] = [];
    if (this.config.providers) {
      this.config.providers.forEach((provider) => {
        emojiPromises.push(emojiRequest(provider));
      });
    }
    debug('EmojiResource.loadAllEmoji waiting for', emojiPromises.length, 'promises');
    return Promise.all(emojiPromises).then((emojiSets) => {
      let allEmoji: EmojiDescription[] = [];
      let mediaApiToken: MediaApiToken | undefined;
      emojiSets.forEach((emojiServiceResponse) => {
        const emojiResponse: EmojiResponse = denormaliseEmojis(emojiServiceResponse);
        allEmoji = allEmoji.concat(emojiResponse.emojis);
        if (emojiResponse.mediaApiToken) {
          mediaApiToken = emojiResponse.mediaApiToken;
        }
      });
      return Promise.resolve({
        emojis: allEmoji,
        mediaApiToken,
      });
    });
  }

  recordEmojiSelection(id: EmojiId) {
    const { securityProvider, refreshedSecurityProvider } = this.config;
    const secOptions = securityProvider && securityProvider();
    const data = {
      emoji: id,
    };
    const options = {
      method: 'POST',
    };
    return requestService(this.config.url, 'record', data, options, secOptions, refreshedSecurityProvider);
  }
}
