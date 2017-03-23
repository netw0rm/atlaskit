import {MediaItemType} from './item';

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
