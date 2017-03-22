import { ContextConfig } from '@atlaskit/media-core';

export interface UploadParams {
  // Collection name is required by Media API
  collection: string;

  autoFinalize?: boolean;
  skipConversions?: boolean;
  fetchMetadata?: boolean;
  expireAfter?: number;
}

export interface MediaProvider {
  uploadParams: UploadParams;

  /**
   * Used for displaying Media Cards and downloading files.
   * This is context config is required.
   */
  viewContext: Promise<ContextConfig>;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   */
  uploadContext?: Promise<ContextConfig>;

  /**
   * (optional) Used for creation of new Media links.
   */
  linkCreateContext?: Promise<ContextConfig>;
};

export { ContextConfig as MediaContextConfig };

export default MediaProvider;
