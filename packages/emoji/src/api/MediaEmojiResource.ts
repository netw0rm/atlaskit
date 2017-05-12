import { EmojiDescription, MediaApiToken, MediaApiRepresentation } from '../types';
import { isMediaApiRepresentation } from '../type-helpers';
import * as url from 'url';

// expire 30 seconds early to factor in latency, slow services, etc
export const expireAdjustment = 30;

// Keep media emoji cached as long as possible (performance + data leakage risk low as only emoji)
export const mediaMaxAge = '9223372036854776000'; // max according to API docs

export type DataUri = string;

export default class MediaEmojiResource {
  private siteUrl: string;
  private mediaApiToken: MediaApiToken;
  private activeTokenRefresh?: Promise<MediaApiToken>;

  constructor(siteUrl: string, mediaApiToken: MediaApiToken) {
    this.siteUrl = siteUrl;
    this.initMediaApiToken(mediaApiToken);
  }

  getMediaEmojiAsImageEmoji(emoji: EmojiDescription): Promise<EmojiDescription> {
    const { representation } = emoji;

    if (!isMediaApiRepresentation(representation)) {
      return Promise.resolve(emoji);
    }

    return new Promise(resolve => {
      this.getMediaApiToken(false).then(token => {
        resolve(this.loadMediaEmoji(emoji, token, true));
      });
    });
  }

  private loadMediaEmoji(emoji: EmojiDescription, token: MediaApiToken, retryOnAuthError: boolean): Promise<EmojiDescription> {
    const { representation, ...other } = emoji;

    const { mediaPath, ...otherRep } = representation as MediaApiRepresentation;

    // Media REST API: https://media-api-internal.atlassian.io/api.html#file__fileId__image_get
    const options = {
      headers: {
        Authorization: `Bearer ${token.jwt}`,
        'X-Client-Id': token.clientId,
      },
    };

    return new Promise((resolve, reject) => {
      // FIXME - remove this once max-age is returned in url by emoji service. See FS-967
      const paramSeparator = mediaPath.indexOf('?') >= 0 ? '&' : '?';
      const mediaUrl = `${mediaPath}${paramSeparator}max-age=${mediaMaxAge}`;
      fetch(new Request(mediaUrl, options)).then(response => {
        if (response.status === 403 && retryOnAuthError) {
          // retry once if 403
          this.getMediaApiToken(true).then(newToken => {
            resolve(this.loadMediaEmoji(emoji, newToken, false));
          });
        } else if (response.ok) {
          response.blob().then((blob) => {
            this.readBlob(blob).then(imagePath => {
              const imageEmoji = {
                ...other,
                representation: {
                  ...otherRep,
                  imagePath,
                },
              };
              resolve(imageEmoji);
            });
          });
        } else {
          resolve(emoji);
        }
      });
    });
  }

  private getMediaApiToken(force?: boolean): Promise<MediaApiToken> {
    const nowInSeconds = Date.now() / 1000;
    const expiresAt = this.mediaApiToken.expiresAt - expireAdjustment;
    if (nowInSeconds < expiresAt && !force) {
      // still valid
      return Promise.resolve(this.mediaApiToken);
    }
    if (this.activeTokenRefresh) {
      // refresh already active, return that
      return this.activeTokenRefresh;
    }

    const readTokenUrl = url.resolve(`${this.siteUrl}/`, 'token/read');
    const options = {
      credentials: 'include' as 'include',
    };
    this.activeTokenRefresh = new Promise(resolve => {
      fetch(new Request(readTokenUrl, options)).then(response => {
        response.json().then(mediaApiToken => {
          this.activeTokenRefresh = undefined;
          this.initMediaApiToken(mediaApiToken);
          resolve(this.mediaApiToken);
        });
      });
    });

    return this.activeTokenRefresh;
  }

  private readBlob(blob: Blob): Promise<DataUri> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error));

      reader.readAsDataURL(blob);
    });
  }

  private initMediaApiToken(mediaApiToken: MediaApiToken) {
    this.mediaApiToken = mediaApiToken;
  }
}
