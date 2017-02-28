import axios from 'axios';
import {MediaApiConfig} from '../';

export type SortDirection = 'desc' | 'asc';

export interface RemoteCollectionItem {
  id: string;
  occurrenceKey: string;
  type: string;
  details: {
    name: string,
    size: number
  };
}

export interface RemoteCollectionItemsResponse {
  data: {
    contents: Array<RemoteCollectionItem>,
    nextInclusiveStartKey: string
  };
}

export interface CollectionService {
  getCollectionItems(inclusiveStartKey: string): Promise<RemoteCollectionItemsResponse>;
  collectionName: string;
}

export class MediaCollectionService implements CollectionService {
  constructor(private config: MediaApiConfig,
              public collectionName: string,
              private clientId: string,
              private limit: number,
              private sortDirection: SortDirection) {
  }

  getCollectionItems(inclusiveStartKey: string): Promise<RemoteCollectionItemsResponse> {
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
          sortDirection: this.sortDirection
        }
      }).then(response => response.data as RemoteCollectionItemsResponse);
    });
  }
}
