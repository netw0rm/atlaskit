import {CollectionProvider, CollectionController, CollectionCommandReducer} from './collectionProvider';
import {MediaApiConfig, MediaCollection} from '../';
import {Observable} from 'rxjs/Observable';
import {Pool} from './util/reducerPool';

export type MediaCollectionReducerPool = Pool<CollectionCommandReducer>;

export interface MediaCollectionProvider {
  observable(): Observable<MediaCollection>;
  controller(): CollectionController;
}

export class MediaCollectionProvider {
  public static fromMediaApi(config: MediaApiConfig,
                             collectionName: string,
                             clientId: string,
                             pageSize: number): MediaCollectionProvider {

    return CollectionProvider.fromMediaAPI(config, collectionName, clientId, pageSize, 'desc');
  }

  public static fromPool(pool: MediaCollectionReducerPool,
                         config: MediaApiConfig,
                         collectionName: string,
                         clientId: string,
                         pageSize: number): MediaCollectionProvider {
    return CollectionProvider.fromPool(pool, config, collectionName, clientId, pageSize, 'desc');
  }

  public static createPool(): MediaCollectionReducerPool {
    return new Pool<CollectionCommandReducer>();
  }
}
