import {MediaApiConfig} from '../config';
import {MediaCollectionProvider} from './mediaCollectionProvider';
import {RemoteMediaCollectionProvider} from './remoteMediaCollectionProvider';
import {CollectionService, MediaCollectionService, SortDirection} from '../services/collectionService';
import {mediaCollectionProviderFromPool} from './util/mediaCollectionProviderFromPool';
import {Pool} from './util/pool';


// export type MediaCollectionReducerPool = Pool<CollectionProvider>;

// export class MediaCollectionProvider {
//   public static fromMediaApi(config: MediaApiConfig,
//                              collectionName: string,
//                              clientId: string,
//                              pageSize: number): CollectionProvider {

//     return CollectionProvider.fromMediaAPI(config, collectionName, clientId, pageSize, 'desc');
//   }

//   public static fromPool(pool: MediaCollectionReducerPool,
//                          config: MediaApiConfig,
//                          collectionName: string,
//                          clientId: string,
//                          pageSize: number): CollectionProvider {
//     return CollectionProvider.fromPool(pool, config, collectionName, clientId, pageSize, 'desc');
//   }

//   public static createPool(): MediaCollectionReducerPool {
//     return new Pool<CollectionProvider>();
//   }
// }


export class RemoteMediaCollectionProviderFactory {

  public static fromCollectionService(
    collectionService: CollectionService,
    collectionName: string,
    pageSize: number,
    sortDirection: SortDirection = 'desc'): MediaCollectionProvider {
      return new RemoteMediaCollectionProvider(
        collectionService,
        collectionName,
        pageSize,
        sortDirection
      );
  }

  public static fromMediaAPI(
    config: MediaApiConfig,
    collectionName: string,
    clientId: string,
    pageSize: number,
    sortDirection: SortDirection = 'desc'): MediaCollectionProvider {
    return RemoteMediaCollectionProviderFactory.fromCollectionService(
      new MediaCollectionService(config, clientId),
      collectionName,
      pageSize,
      sortDirection
    );
  }

  public static fromPool(
    pool: Pool<MediaCollectionProvider>,
    config: MediaApiConfig,
    collectionName: string,
    clientId: string,
    pageSize: number,
    sortDirection: SortDirection = 'desc'): MediaCollectionProvider {

    const poolId = [collectionName, pageSize, sortDirection].join('-');
    const createFn = () => {
      const collectionService = new MediaCollectionService(config, clientId);
      return new RemoteMediaCollectionProvider(
        collectionService,
        collectionName,
        pageSize,
        sortDirection
      );
    };

    return mediaCollectionProviderFromPool(pool, poolId, createFn);
  }

  public static createPool(): Pool<MediaCollectionProvider> {
    return new Pool<MediaCollectionProvider>();
  }
}
