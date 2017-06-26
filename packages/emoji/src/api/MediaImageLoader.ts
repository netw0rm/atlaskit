import { EmojiDescription, ImageRepresentation, MediaApiToken } from '../types';
import TokenManager from './TokenManager';
import { imageAcceptHeader, areSecureImagesCached } from '../util/image';

const downloadConcurrentLimit = 4;

interface MediaQueueItem {
  emoji: EmojiDescription;
  resolve: Function;
}

export type DataURL = string;

export default class MediaImageLoader {
  private tokenManager: TokenManager;
  private mediaImageQueue: MediaQueueItem[] = [];
  private activeProcessing = 0;

  constructor(tokenManager: TokenManager) {
    this.tokenManager = tokenManager;
  }


  loadMediaEmoji(emoji: EmojiDescription): Promise<EmojiDescription> {
    return new Promise((resolve) => {
      this.mediaImageQueue.push({
        emoji,
        resolve,
      });
      this.processFromQueue();
    });
  }

  private processFromQueue() {
    while (this.activeProcessing < downloadConcurrentLimit && this.mediaImageQueue.length > 0) {
      this.activeProcessing++;
      const item = this.mediaImageQueue.shift()!;
      const { emoji, resolve } = item;
      return this.tokenManager.getToken('read', false)
        .then(token => {
          resolve(this.requestMediaEmoji(emoji, token, true));
          this.completedItem();
        })
        .catch(error => {
          // Failed to load, just resolve to original emoji
          resolve(emoji);
          this.completedItem();
        });
    }
  }

  private completedItem() {
    this.activeProcessing--;
    this.processFromQueue();
  }


  private requestMediaEmoji(emoji: EmojiDescription, token: MediaApiToken, retryOnAuthError: boolean): Promise<EmojiDescription> {
    // const { representation, ...other } = emoji;
    // const { mediaPath, ...otherRep } = representation as MediaApiRepresentation;

    console.log('requestMediaEmoji1');

    const { representation, ...other } = emoji;
    // const { mediaPath } = representation as MediaApiRepresentation;
    const { imagePath, ...otherRep } = representation as ImageRepresentation;

    return imageAcceptHeader().then(acceptHeader => {

      // Media REST API: https://media-api-internal.atlassian.io/api.html#file__fileId__image_get
      const options = {
        headers: {
          Authorization: `Bearer ${token.jwt}`,
          'X-Client-Id': token.clientId,
          Accept: acceptHeader,
        },
      };

      return fetch(new Request(imagePath, options)).then(response => {
        if (response.status === 403 && retryOnAuthError) {
          // retry once if 403
          return this.tokenManager.getToken('read', true).then(newToken => {
            return this.requestMediaEmoji(emoji, newToken, false);
          });
        } else if (response.ok) {
          return areSecureImagesCached(imagePath).then((cached): EmojiDescription | Promise<EmojiDescription> => {
            // Most browsers (known exception is Firefox) will use the cached image in a src attribute, even it previously needed credentials.
            if (cached) {
              // Image will be cached now, can use url as is for get requests.
              return emoji;
            }

            console.log('requestMediaEmoji2 - images are not cached');

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
          });
        }
        return emoji;
      });
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
