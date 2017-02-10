// import { Context as MediaContext } from '@atlassian/media-embed';

export type JwtToken = string;
export type MediaCollectionName = string;
export type ViewContextScope = MediaItem[] | MediaCollectionName;
export type MediaItemType = 'file' | 'link';
export type MediaItemId = string;
export type JwtTokenProvider = () => Promise<JwtToken>;

export interface MediaItem {
  id: MediaItemId;
  type: MediaItemType;
};

export interface MediaContextConfig {
  clientId: string;
  serviceHost: string;
  tokenProvider: JwtTokenProvider;
}

export interface MediaResource {
  /**
   * Resolve to a Media Context Config for uploading
   */
  getUploadContext(): Promise<MediaContextConfig>;
  getViewContext(scope?: ViewContextScope): Promise<MediaContextConfig>;
};

export default MediaResource;
