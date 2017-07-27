import { MediaPicker } from 'mediapicker';
import { ServiceConfig, utils as serviceUtils } from '@atlaskit/util-service-support';

import {
  EmojiDescription,
  EmojiId,
  EmojiServiceDescription,
  EmojiUpload,
  ImageRepresentation,
  MediaApiToken,
  OptionalEmojiDescription,
} from '../../types';

import { isMediaRepresentation, isMediaEmoji } from '../../type-helpers';
import { MediaApiData, MediaUploadEnd, MediaUploadError, MediaUploadStatusUpdate } from './media-types';
import MediaEmojiCache from './MediaEmojiCache';
import { denormaliseEmojiServiceResponse, emojiRequest } from '../EmojiUtils';
import TokenManager from './TokenManager';

import debug from '../../util/logger';

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
  private mediaApiToken: MediaApiToken;
  private mediaEmojiCache: MediaEmojiCache;
  protected tokenManager: TokenManager;

  constructor(siteServiceConfig: ServiceConfig, mediaApiToken: MediaApiToken) {
    this.siteServiceConfig = siteServiceConfig;
    this.mediaApiToken = mediaApiToken;
    this.tokenManager = new TokenManager(siteServiceConfig);
    this.tokenManager.addToken('read', mediaApiToken);
    this.mediaEmojiCache = new MediaEmojiCache(this.tokenManager);
  }

  /**
   * Will load media emoji, returning a new EmojiDescription if, for example,
   * the URL has changed.
   */
  loadMediaEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (!isMediaEmoji(emoji)) {
      throw new Error('Only supported for media emoji');
    }
    return this.mediaEmojiCache.loadEmoji(emoji);
  }

  optimisticRendering(emoji: EmojiDescription): boolean | Promise<boolean> {
    const representation = emoji.representation;
    if (!isMediaRepresentation(representation)) {
      throw new Error('Only supported for media emoji');
    }
    const { mediaPath } = representation;
    return this.mediaEmojiCache.optimisticRendering(mediaPath);
  }

  uploadEmoji(upload: EmojiUpload, progressCallback?: EmojiProgessCallback): Promise<EmojiDescription> {
    const startTime = Date.now();
    return this.tokenManager.getToken('upload').then(uploadToken => {
      const tokenLoadTime = Date.now() - startTime;
      debug('upload token load time', tokenLoadTime);
      return new Promise<EmojiDescription>((resolve, reject) => {
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

    return serviceUtils.requestService<EmojiUploadResponse>(this.siteServiceConfig, { requestInit }).then((response): EmojiDescription => {
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
}
