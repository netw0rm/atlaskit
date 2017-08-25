import {
  ContextConfig as MediaContextConfig,
  MediaProvider,
  MediaStateManager,
} from '@atlaskit/media-core';

/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export function storyMediaProviderFactory (
  mediaTestHelpers,
  collection?: string,
  stateManager?: MediaStateManager,
  includeUploadContext = true,
  dropzoneContainer?: HTMLElement,
  includeLinkCreateContext = true,
) {
  const {
    defaultClientId,
    defaultServiceHost,
    defaultCollectionName,
    StoryBookTokenProvider,
  } = mediaTestHelpers;

  const collectionName = collection || defaultCollectionName;

  return Promise.resolve<MediaProvider>({
    stateManager,
    uploadParams: {
      collection: collectionName,
      dropzoneContainer,
    },
    viewContext: Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: defaultServiceHost,
      tokenProvider: StoryBookTokenProvider.tokenProvider
    }),
    uploadContext: !includeUploadContext ? undefined : Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: 'https://dt-api.internal.app.dev.atlassian.io',
      tokenProvider: StoryBookTokenProvider.withAccess({
        [`urn:filestore:collection:${collectionName}`]: [
          'read', 'insert'
        ],
        'urn:filestore:chunk:*': ['create', 'read'],
        'urn:filestore:upload': ['create'],
        'urn:filestore:upload:*': ['read', 'update']
      })
    }),
    linkCreateContext: !includeLinkCreateContext ? undefined : Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: 'https://dt-api-filestore.internal.app.dev.atlassian.io',
      tokenProvider: StoryBookTokenProvider.withAccess({
        [`urn:filestore:collection:${collectionName}`]: [
          'read', 'update'
        ],
        'urn:filestore:file:*': ['read'],
        'urn:filestore:chunk:*': ['read']
      })
    }),
  });
}


export type promisedString = Promise<string>;
export type resolveFn = (...any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn };

export function fileToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onabort = function () {
      reject('abort');
    };
    reader.onerror = function (err) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}

export function getLinkCreateContextMock(options: {
  id?: string | Function,
  metadata?: object,
  error?: Error,
  subscribe?: Function,
}) {
  return {
    getUrlPreviewProvider: (url) => ({
      observable: () => ({
        subscribe: options.subscribe ?
          options.subscribe(url) :
            (cb => options.error ?
              cb(null, options.error) :
                cb(options.metadata || {})
            )
      })
    }),
    addLinkItem: (url, collection, metadata) =>
      options.id instanceof Function ?
        options.id(url, collection, metadata) :
          Promise.resolve(options.id)
  } as any;
}
