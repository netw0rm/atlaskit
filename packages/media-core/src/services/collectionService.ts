import axios from 'axios';
import { MediaApiConfig } from '../';

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
  getCollectionItems(inclusiveStartKey: string, details?: DetailsType): Promise<RemoteCollectionItemsResponse>;
  collectionName: string;
}

export type DetailsType = 'minimal' | 'full';

export class MediaCollectionService implements CollectionService {
  constructor(
    private config: MediaApiConfig,
    public collectionName: string,
    private clientId: string,
    private limit: number,
    private sortDirection: SortDirection) {
  }

  getCollectionItems(inclusiveStartKey: string, details: DetailsType = 'minimal'): Promise<RemoteCollectionItemsResponse> {
    return this.config.tokenProvider(this.collectionName).then(token => {
      return axios.get(`/collection/${this.collectionName}/items`, {
        baseURL: this.config.serviceHost,
        headers: {
          'X-Client-Id': this.clientId,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          collectionName: this.collectionName,
          limit: this.limit,
          inclusiveStartKey: inclusiveStartKey,
          details: details,
          sortDirection: this.sortDirection
        }
      }).then(response => response.data as RemoteCollectionItemsResponse);
    });
  }
}
