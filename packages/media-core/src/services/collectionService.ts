import createRequest from './util/createRequest';
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

  private request: Function;

  constructor(private config: MediaApiConfig,
              public collectionName: string,
              private clientId: string,
              private limit: number,
              private sortDirection: SortDirection) {
    this.request = createRequest({
      config: this.config,
      clientId: this.clientId,
      collectionName: this.collectionName
    });
  }

  getCollectionItems(inclusiveStartKey: string): Promise<RemoteCollectionItemsResponse> {
    return this.request({
      url: `/collection/${this.collectionName}/items`,
      params: {
          limit: this.limit,
          inclusiveStartKey: inclusiveStartKey,
          sortDirection: this.sortDirection
      }
    })
      .then(json => json as RemoteCollectionItemsResponse)
    ;
  }
}
