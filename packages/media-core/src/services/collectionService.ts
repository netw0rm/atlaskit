import axios from 'axios';

import { MediaApiConfig } from '../config';
import createRequest, { CreateRequestFunc } from './util/createRequest';

export type SortDirection = 'desc' | 'asc';

export type RemoteCollectionItem = RemoteCollectionFileItem | RemoteCollectionLinkItem;

export interface RemoteCollectionFileItem {
  readonly id: string;
  readonly occurrenceKey: string;
  readonly type: 'file';
  readonly details: RemoteCollectionFileItemDetails;
}

export interface RemoteCollectionFileItemDetails {
  readonly name: string;
  readonly size: number;
  readonly mimeType?: string;
}

export interface RemoteCollectionLinkItem {
  readonly id: string;
  readonly occurrenceKey: string;
  readonly type: 'link';
  readonly details: RemoteCollectionLinkItemDetails;
}

export interface RemoteCollectionLinkItemDetails {
  readonly url: string;
}

export interface RemoteCollectionItemsResponse {
  data: {
    contents: Array<RemoteCollectionItem>,
    nextInclusiveStartKey: string
  };
}

export interface CollectionService {
  getCollectionItems(
    collectionName: string,
    limit: number,
    inclusiveStartKey?: string,
    sortDirection?: SortDirection,
    details?: DetailsType): Promise<RemoteCollectionItemsResponse>;
}

export type DetailsType = 'minimal' | 'full';

export class MediaCollectionService implements CollectionService {
  static defaultLimit = 10;

  constructor(private config: MediaApiConfig, private clientId: string) {
  }

  getCollectionItems(
    collectionName: string,
    limit: number = MediaCollectionService.defaultLimit,
    inclusiveStartKey?: string,
    sortDirection?: SortDirection,
    details?: DetailsType): Promise<RemoteCollectionItemsResponse> {

    const { serviceHost, tokenProvider } = this.config;

    return tokenProvider(collectionName)
      .then(token => axios
        .get(`/collection/${collectionName}/items`, {
          baseURL: serviceHost,
          headers: {
            'X-Client-Id': this.clientId,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          params: {
            limit,
            inclusiveStartKey,
            sortDirection,
            details
          }
        })
        .then(response => response.data)
      );
  }
}
