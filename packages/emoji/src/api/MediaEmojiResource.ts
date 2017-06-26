import { MediaPicker } from 'mediapicker';

import {
  EmojiDescription,
  EmojiId,
  EmojiServiceDescription,
  EmojiUpload,
  ImageRepresentation,
  // MediaApiRepresentation,
  MediaApiToken,
  OptionalEmojiDescription,
} from '../types';
import { MediaApiData, MediaUploadEnd, MediaUploadError, MediaUploadStatusUpdate } from '../media-types';
// import { isMediaApiRepresentation } from '../type-helpers';
import { denormaliseEmojiServiceResponse, emojiRequest } from './EmojiUtils';
import MediaImageLoader from './MediaImageLoader';
import { requestService, ServiceConfig } from './SharedResourceUtils';
import TokenManager from './TokenManager';
import debug from '../util/logger';
// import { imageAcceptHeader, areSecureImagesCached } from '../util/image';

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
export const mediaProportionOfProgress = 95/100;

export default class MediaEmojiResource {
  private siteServiceConfig: ServiceConfig;
  private mediaImageLoader: MediaImageLoader;
  protected tokenManager: TokenManager;

  constructor(siteServiceConfig: ServiceConfig, mediaApiToken: MediaApiToken) {
    this.siteServiceConfig = siteServiceConfig;
    this.tokenManager = new TokenManager(siteServiceConfig);
    this.tokenManager.addToken('read', mediaApiToken);
    this.mediaImageLoader = new MediaImageLoader(this.tokenManager);
  }

  /**
   * Will load media emoji, returning a new EmojiDescription if, for example,
   * the URL has changed.
   */
  loadMediaEmoji(emoji: EmojiDescription): Promise<EmojiDescription> {
    return this.mediaImageLoader.loadMediaEmoji(emoji);
    // console.log('loadMediaEmoji1', emoji);

    // // const { representation } = emoji;

    // // if (!isMediaApiRepresentation(representation)) {
    // //   return Promise.resolve(emoji);
    // // }

    // console.log('loadMediaEmoji2');

    // return this.tokenManager.getToken('read', false)
    //   .then(token => this.requestMediaEmoji(emoji, token, true))
    //   .catch(error => {
    //     // Failed to load, just resolve to original emoji
    //     return emoji;
    //   });
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

  findSiteEmoji(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const path = `../${emojiId.id}`;
    return emojiRequest(this.siteServiceConfig, { path }).then(serviceResponse => {
      const response = denormaliseEmojiServiceResponse(serviceResponse);
      return response.emojis[0];
    }).catch(error => {
      debug('failed to load emoji', emojiId, error);
      return undefined;
    });
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

  // private requestMediaEmoji(emoji: EmojiDescription, token: MediaApiToken, retryOnAuthError: boolean): Promise<EmojiDescription> {
  //   // const { representation, ...other } = emoji;
  //   // const { mediaPath, ...otherRep } = representation as MediaApiRepresentation;

  //   console.log('requestMediaEmoji1');

  //   const { representation, ...other } = emoji;
  //   // const { mediaPath } = representation as MediaApiRepresentation;
  //   const { imagePath, ...otherRep } = representation as ImageRepresentation;

  //   return imageAcceptHeader().then(acceptHeader => {

  //     // Media REST API: https://media-api-internal.atlassian.io/api.html#file__fileId__image_get
  //     const options = {
  //       headers: {
  //         Authorization: `Bearer ${token.jwt}`,
  //         'X-Client-Id': token.clientId,
  //         Accept: acceptHeader,
  //       },
  //     };

  //     return fetch(new Request(imagePath, options)).then(response => {
  //       if (response.status === 403 && retryOnAuthError) {
  //         // retry once if 403
  //         return this.tokenManager.getToken('read', true).then(newToken => {
  //           return this.requestMediaEmoji(emoji, newToken, false);
  //         });
  //       } else if (response.ok) {
  //         return areSecureImagesCached(imagePath).then((cached): EmojiDescription | Promise<EmojiDescription> => {
  //           // Most browsers (known exception is Firefox) will use the cached image in a src attribute, even it previously needed credentials.
  //           if (cached) {
  //             // Image will be cached now, can use url as is for get requests.
  //             return emoji;
  //           }

  //           console.log('requestMediaEmoji2 - images are not cached');

  //           return response.blob().then((blob) => {
  //             return this.readBlob(blob).then(imagePath => {
  //               const imageEmoji = {
  //                 ...other,
  //                 representation: {
  //                   ...otherRep,
  //                   imagePath,
  //                 },
  //               };
  //               return imageEmoji;
  //             });
  //           });
  //         });
  //       }
  //       return emoji;
  //     });
  //   });
  // }

  // private readBlob(blob: Blob): Promise<DataURL> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.addEventListener('load', () => resolve(reader.result));
  //     reader.addEventListener('error', () => reject(reader.error));

  //     reader.readAsDataURL(blob);
  //   });
  // }
}
