import { MediaItemType } from './item';

export * from './item';
export * from './actions';
export * from './config';
export * from './mediaTypes';
export * from './context/context'

export interface RemoteCollection {
  id: string;
  apiConfig: {
    clientId: string;
    token: string;
    baseURL: string;
  };
}

export interface MediaCollectionItem {
  id: string;
  mediaItemType: MediaItemType;
}

export interface MediaCollection {
  id: string;
  items: Array<MediaCollectionItem>;
}

export interface Metadata {
  id: string;
  mediaType: string;
  mimeType: string;
  name: string;
  processingStatus: string;
  size: number;
}

export type DataUri = string;
