import { ContextConfig } from '@atlaskit/media-core';

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
  uploadContext?: Promise<ContextConfig>;

  /**
   * Resolve to Media Context that allows downloading Media, i.e.
   *   resolve({
   *     clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
   *     serviceHost: 'http://media-api.host.com',
   *     tokenProvider: tokenProvidingFunction
   *   });
   */
  viewContext?: Promise<ContextConfig>;

  /**
   * Resolve to Media Context that allows creating media links:
   *
   *   resolve({
   *     clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
   *     serviceHost: 'http://media-api.host.com',
   *     tokenProvider: tokenProvidingFunction
   *   });
   */
  linkCreateContext?: Promise<ContextConfig>;
};

export { ContextConfig as MediaContextConfig };

export default MediaProvider;
