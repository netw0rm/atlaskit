import { MediaPicker } from 'mediapicker';

import { EmojiDescription, EmojiServiceDescription, EmojiUpload, ImageRepresentation, MediaApiToken, MediaApiRepresentation } from '../types';
import { MediaApiData, MediaUploadEnd, MediaUploadError, MediaUploadStatusUpdate } from '../media-types';
import { isMediaApiRepresentation } from '../type-helpers';
import { requestService, ServiceConfig } from './SharedResourceUtils';
import debug from '../util/logger';

// expire 30 seconds early to factor in latency, slow services, etc
export const expireAdjustment = 30;

// Keep media emoji cached as long as possible (performance + data leakage risk low as only emoji)
export const mediaMaxAge = '9223372036854776000'; // max according to API docs

export type DataURL = string;

export interface EmojiUploadResponse {
  emojis: EmojiServiceDescription[];
}

export interface EmojiProgress {
  readonly percent: number;
}

export interface EmojiProgessCallback {
  (progress: EmojiProgress): void;
}

// Assume media is 95% of total upload time.
export const mediaProportionOfProgress = 100/95;

interface TokenDetail {
  mediaApiToken: MediaApiToken;
  activeTokenRefresh?: Promise<MediaApiToken>;
}

export type TokenType = 'read' | 'upload';

// Temporoary token for new types, which generating
const expiredMediaToken: MediaApiToken = {
  url: '',
  clientId: '',
  jwt: '',
  collectionName: '',
  expiresAt: 0, // expired
};

export class TokenManager {
  private siteServiceConfig: ServiceConfig;
  private tokens: Map<TokenType, TokenDetail>;

  constructor(siteServiceConfig: ServiceConfig) {
    this.siteServiceConfig = siteServiceConfig;
    this.tokens = new Map<TokenType, TokenDetail>();
  }

  addToken(type: TokenType, mediaApiToken: MediaApiToken): void {
    this.tokens.set(type, {
      mediaApiToken,
    });
  }

  getToken(type: TokenType, forceRefresh?: boolean): Promise<MediaApiToken> {
    let tokenDetail: TokenDetail = this.tokens.get(type) as TokenDetail;
    if (tokenDetail) {
      const { mediaApiToken, activeTokenRefresh } = tokenDetail;
      const nowInSeconds = Date.now() / 1000;
      const expiresAt = mediaApiToken.expiresAt - expireAdjustment;
      if (nowInSeconds < expiresAt && !forceRefresh) {
        // still valid
        return Promise.resolve(mediaApiToken);
      }
      if (activeTokenRefresh) {
        // refresh already active, return that
        return activeTokenRefresh;
      }
    } else {
      tokenDetail = {
        mediaApiToken: expiredMediaToken,
      };
      this.tokens.set(type, tokenDetail);
    }

    const path = `token/${type}`;

    tokenDetail.activeTokenRefresh = requestService<MediaApiToken>(this.siteServiceConfig, { path }).then(mediaApiToken => {
      tokenDetail.activeTokenRefresh = undefined;
      tokenDetail.mediaApiToken = mediaApiToken;
      return mediaApiToken;
    });

    return tokenDetail.activeTokenRefresh;
  }
}

export default class MediaEmojiResource {
  private siteServiceConfig: ServiceConfig;
  protected tokenManager: TokenManager;

  constructor(siteServiceConfig: ServiceConfig, mediaApiToken: MediaApiToken) {
    this.siteServiceConfig = siteServiceConfig;
    this.tokenManager = new TokenManager(siteServiceConfig);
    this.tokenManager.addToken('read', mediaApiToken);
  }

  getMediaEmojiAsImageEmoji(emoji: EmojiDescription): Promise<EmojiDescription> {
    const { representation } = emoji;

    if (!isMediaApiRepresentation(representation)) {
      return Promise.resolve(emoji);
    }

    return this.tokenManager.getToken('read', false)
      .then(token => this.loadMediaEmoji(emoji, token, true))
      .catch(error => {
        // Failed to load, just resolve to original emoji
        return emoji;
      });
  }

  uploadEmoji(upload: EmojiUpload, progressCallback?: EmojiProgessCallback): Promise<EmojiDescription> {
    const startTime = Date.now();
    return this.tokenManager.getToken('upload').then(uploadToken => {
      const tokenLoadTime = Date.now() - startTime;
      debug('upload token load time', tokenLoadTime);
      return new Promise((resolve, reject) => {
        const { url, clientId, collectionName } = uploadToken;
        const mpConfig = {
          apiUrl: url,
          apiClientId: clientId,
          tokenSource:  {
            token: uploadToken.jwt,
          },
          uploadParams: {
            collection: collectionName,
          },
        };

        const mpBinary = this.createMediaPicker('binary', mpConfig);
        mpBinary.on('upload-end', (result: MediaUploadEnd) => {
          const totalUploadTime = Date.now() - startTime;
          const mediaUploadTime = totalUploadTime - tokenLoadTime;
          debug('total upload / media upload times', totalUploadTime, mediaUploadTime);
          this.postToEmojiService(upload, result.public).then(emoji => {
            resolve(emoji);
          }).catch(httpError => {
            reject(httpError.reason || httpError);
          });
        }).on('upload-error', (errorResult: MediaUploadError) => {
          reject(errorResult.error);
        }).on('upload-status-update', (statusUpdate: MediaUploadStatusUpdate) => {
          debug('upload progress', statusUpdate.progress);
          if (progressCallback) {
            progressCallback({
              percent: statusUpdate.progress.portion * mediaProportionOfProgress,
            });
          }
        }).upload(upload.dataURL, upload.filename);
      });
    });
  }

  prepareForUpload() {
    // make sure a token is loaded from the emoji service if we don't have one
    // as future request to uploadEmoji will use this, this to preload it, as it
    // usually takes 1-2 seconds to generate
    this.tokenManager.getToken('upload');
  }

  /**
   * Intended to be overridden for unit testing.
   */
  protected createMediaPicker(type, mpConfig) {
    return MediaPicker(type, mpConfig);
  }

  private postToEmojiService = (upload: EmojiUpload, mediaApiData: MediaApiData): Promise<EmojiDescription> => {
    const { shortName, name } = upload;
    const { width, height } = upload;
    const requestInit = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shortName,
        name,
        width,
        height,
        fileId: mediaApiData.id,
      })
    };

    return requestService<EmojiUploadResponse>(this.siteServiceConfig, { requestInit }).then((response): EmojiDescription => {
      const { emojis } = response;
      if (emojis.length) {
        const emoji = emojis[0];
        const { imagePath, ...otherRepresentation } = emoji.representation as ImageRepresentation;
        return {
          ...emoji,
          representation: {
            ...otherRepresentation,
            mediaPath: imagePath,
          },
        };
      }
      throw new Error('No emoji returns from upload. Upload failed.');
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

    return fetch(new Request(mediaPath, options)).then(response => {
      if (response.status === 403 && retryOnAuthError) {
        // retry once if 403
        return this.tokenManager.getToken('read', true).then(newToken => {
          return this.loadMediaEmoji(emoji, newToken, false);
        });
      } else if (response.ok) {
        return response.blob().then((blob) => {
          return this.readBlob(blob).then(imagePath => {
            const imageEmoji = {
              ...other,
              representation: {
                ...otherRep,
                imagePath,
              },
            };
            return imageEmoji;
          });
        });
      }
      return emoji;
    });
  }


  private readBlob(blob: Blob): Promise<DataURL> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error));

      reader.readAsDataURL(blob);
    });
  }
}
