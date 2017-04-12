import { ContextConfig, Context } from '@atlaskit/media-core';

export interface MediaState {
  id: string;
  status?: 'unknown' | 'uploading' | 'processing' | 'ready';
  publicId?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  progress?: number;
  thumbnail?: Blob;
}

export interface MediaStateManager {
  getState(tempId: string): MediaState | undefined;
  updateState(tempId: string, newState: MediaState): void;
  subscribe(tempId: string, cb: (state: MediaState) => void);
  unsubscribe(tempId: string, cb: (state: MediaState) => void): void;
}

export interface UploadParams {
  /**
   * (Mandatory) collection name used when creating new Media Files and Links
   */
  collection: string;

  /**
   * Should links and files be implicitly finalized with Media API, returning public ids?
   * (default: true)
   */
  autoFinalize?: boolean;
  skipConversions?: boolean;
  fetchMetadata?: boolean;
  expireAfter?: number;

  /**
   * Reference to DOM element to be used for files drag and drop
   * (default: document)
   */
  dropzoneContainer?: HTMLElement;
}

export interface MediaProvider {
  uploadParams: UploadParams;

  /**
   * A manager notifying subscribers on changes in Media states
   */
  stateManager?: MediaStateManager;

  /**
   * Used for displaying Media Cards and downloading files.
   * This is context config is required.
   */
  viewContext: Promise<Context | ContextConfig>;

  /**
   * (optional) Used for creating new uploads and finalizing files.
   * NOTE: We currently don't accept Context instance, because we need config properties
   *       to initialize
   */
  uploadContext?: Promise<ContextConfig>;

  /**
   * (optional) Used for creation of new Media links.
   */
  linkCreateContext?: Promise<Context | ContextConfig>;
};

export { ContextConfig as MediaContextConfig };

export { default as DefaultMediaStateManager } from './default-media-state-manager';

export default MediaProvider;
