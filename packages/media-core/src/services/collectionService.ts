import { MediaApiConfig } from '../config';
import createRequest from './util/createRequest';

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

    const request = createRequest({
      config: this.config,
      clientId: this.clientId
    });

    return request({
      url: `/collection/${collectionName}/items`,
      params: {
        limit,
        inclusiveStartKey,
        sortDirection,
        details
      }
    }).then(json => json as RemoteCollectionItemsResponse);
  }
}
