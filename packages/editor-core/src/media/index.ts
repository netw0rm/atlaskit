import { ContextConfig } from '@atlaskit/media-core';

export interface MediaState {
  id: string;
  status: 'unknown' | 'uploading' | 'processing' | 'ready';
  publicId?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  progress?: number;
}

export interface UploadParams {
  // Collection name is required by Media API
  collection: string;

  autoFinalize?: boolean;
  skipConversions?: boolean;
  fetchMetadata?: boolean;
  expireAfter?: number;
  dropzoneContainer?: HTMLElement;
}

export interface ThumbnailProvider {
  getThumbnail(mediaId: string): Blob;
  setThumbnail(mediaId: string, blob: Blob): void;
}

export interface MediaProvider {
  uploadParams: UploadParams;

  /**
   * A method providing base64-encoded images for use as thumbnails.
   */
  thumbnailProvider?: ThumbnailProvider;

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
