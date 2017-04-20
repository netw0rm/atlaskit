import { MediaProvider, MediaContextConfig } from '../media';
import {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider
} from '@atlaskit/media-test-helpers';

export function storyMediaProviderFactory (collection = defaultCollectionName) {
  return Promise.resolve<MediaProvider>({
    uploadParams: {
      collection: collection
    },
    viewContext: Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: defaultServiceHost,
      tokenProvider: StoryBookTokenProvider.tokenProvider
    }),
    uploadContext: Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: 'https://dt-api.internal.app.dev.atlassian.io',
      tokenProvider: StoryBookTokenProvider.withAccess({
        [`urn:filestore:collection:${collection}`] : [
          'read', 'insert'
        ],
        'urn:filestore:chunk:*' : ['create', 'read'],
        'urn:filestore:upload' : ['create'],
        'urn:filestore:upload:*' : ['read', 'update']
      })
    })
  });
};


export type promisedString = Promise<string>;
export type resolveFn = (...any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn  };

export const storyThumbnailProvider = new (class {
  private store = {};

  public getThumbnail(mediaId: string): Blob {
    return this.store[mediaId];
  }

  public setThumbnail(mediaId: string, blob: Blob): void {
    this.store[mediaId] = blob;
  }
})();

export function fileToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.onabort = function() {
      reject('abort');
    };
    reader.onerror = function(err) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
};

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}
