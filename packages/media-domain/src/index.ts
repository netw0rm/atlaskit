// import {MediaType} from './mediaTypes'; // MEDIA-FIX --> Never used?
import * as Actions from './actions';
import * as Config from './config';
import * as Item from './item';
import * as MediaTypes from './mediaTypes';
import {MediaItemType} from './item';

export {
  Actions,
  Config,
  Item,
  MediaTypes
};

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