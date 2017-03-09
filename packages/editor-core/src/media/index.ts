import { MediaCollectionItem, ContextConfig } from '@atlaskit/media-core';

export type MediaItemId = string;
export type MediaCollectionId = string;
export type MediaViewContextScope = MediaCollectionItem[] | MediaCollectionId;

export interface MediaProvider {
  /**
   * Resolve to a Media Context Config for uploading new media items, i.e.:
   *
   *   resolve({
   *     clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
   *     serviceHost: 'http://media-api.host.com',
   *     tokenProvider: tokenProvidingFunction
   *   });
   */
  // getUploadContext(): Promise<ContextConfig>;

  /**
   * Resolve to Media Context that allows downloading Media. Optionally accepts a list of media items or
   * a Media Collection id which is about to be accessed. Example result:
   *
   *   resolve({
   *     clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
   *     serviceHost: 'http://media-api.host.com',
   *     tokenProvider: tokenProvidingFunction
   *   });
   */
  getViewContext(scope?: MediaViewContextScope): Promise<ContextConfig>;
};

export { ContextConfig as MediaContextConfig };

export default MediaProvider;
