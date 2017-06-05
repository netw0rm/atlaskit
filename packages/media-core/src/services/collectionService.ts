import { MediaApiConfig } from '../config';
import { MediaCollectionItem } from '../collection';
import { Resources } from '../item';
import { LRUCache } from 'lru-fast';
import createRequest from './util/createRequest';

export const DEFAULT_COLLECTION_PAGE_SIZE: number = 10;

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
  readonly title?: string;
  readonly resources?: Resources;
}

export interface RemoteCollectionItemsResponse {
  items: Array<MediaCollectionItem>;
  nextInclusiveStartKey?: string;
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

type RequestParams = {
  collectionName: string,
  limit: number,
  inclusiveStartKey?: string,
  sortDirection?: SortDirection,
  details?: DetailsType
};

export class MediaCollectionService implements CollectionService {
  constructor(
    private config: MediaApiConfig,
    private clientId: string,
    private cache?: LRUCache<string, RemoteCollectionItemsResponse>) {
  }

  getCollectionItems(
    collectionName: string,
    limit: number = DEFAULT_COLLECTION_PAGE_SIZE,
    inclusiveStartKey?: string,
    sortDirection?: SortDirection,
    details?: DetailsType): Promise<RemoteCollectionItemsResponse> {
    const params = { collectionName, limit, inclusiveStartKey, sortDirection, details };
    const cachedCollectionItems = this.getCachedCollectionItems(params);
    if (cachedCollectionItems) {
      return Promise.resolve(cachedCollectionItems);
    } else {
      return this.getRemoteCollectionItems(params);
    }
  }

  private cacheKey(params: RequestParams) {
    const { collectionName, limit, inclusiveStartKey, sortDirection, details } = params;
    return `${collectionName}-${limit}-${inclusiveStartKey}-${sortDirection}-${details}`;
  }

  private getCachedCollectionItems(params: RequestParams): RemoteCollectionItemsResponse | undefined {
    if (this.cache) {
      return this.cache.get(this.cacheKey(params));
    }
  }

  private getRemoteCollectionItems(params: RequestParams): Promise<RemoteCollectionItemsResponse> {
    const { collectionName, limit, inclusiveStartKey, sortDirection, details } = params;
    const request = createRequest({
      config: this.config,
      clientId: this.clientId,
      collectionName
    });

    return request({
      url: `/collection/${collectionName}/items`,
      params: {
        limit,
        inclusiveStartKey,
        sortDirection,
        details
      }
    }).then(({ data: { contents, nextInclusiveStartKey } }) => {
      const response = {
        items: contents.map(this.toMediaCollectionItem),
        nextInclusiveStartKey
      };

      if (this.cache) {
        this.cache.set(this.cacheKey(params), response);
      }

      return response;
    });
  }

  private toMediaCollectionItem(item: RemoteCollectionItem): MediaCollectionItem {
    const { id, occurrenceKey } = item;
    switch (item.type) {
      case 'file':
        return {
          type: 'file',
          details: {
            id,
            occurrenceKey,
            ...item.details
          }
        };

      case 'link':
        return {
          type: 'link',
          details: {
            id,
            type: 'link',
            occurrenceKey,
            title: item.details.title || '',
            ...item.details
          }
        };
    }
  }
}
