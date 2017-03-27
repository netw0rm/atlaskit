import {CollectionProvider, CollectionController, CollectionCommandReducer} from './collectionProvider';
import {MediaItem, MediaItemType, MediaApiConfig, UrlPreview, MediaCollection} from '../';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import {FileProvider} from './fileProvider';
import {LinkProvider} from './linkProvider';
import {UrlPreviewProvider} from './urlPreviewProvider';
import {Pool, observableFromObservablePool} from './util/reducerPool';
import {LRUCache} from 'lru-fast';

const FILE_PROVIDER_RETRY_INTERVAL = 2000;

export type MediaItemObservablePool = Pool<Observable<MediaItem>>;

export interface MediaItemProvider {
  observable(): Observable<MediaItem>;
}

export class MediaItemProvider {
  public static fromMediaApi(config: MediaApiConfig,
                             cache: LRUCache<string, MediaItem>,
                             mediaItemType: MediaItemType,
                             id: string,
                             clientId: string,
                             collection?: string): MediaItemProvider {
    switch (mediaItemType) {
      case 'file':
        return FileProvider.fromMediaApi(config, cache, id, clientId, collection, FILE_PROVIDER_RETRY_INTERVAL);
      case 'link':
        return LinkProvider.fromMediaApi(config, id, clientId, collection);
      default:
        throw new Error('invalid media type ' + mediaItemType);
    }
  }

  public static fromPool(pool: MediaItemObservablePool,
                         config: MediaApiConfig,
                         cache: LRUCache<string, MediaItem>,
                         mediaItemType: MediaItemType,
                         id: string,
                         clientId: string,
                         collection?: string,
                         mediaItem?: MediaItem): MediaItemProvider {

    const isMediaItemLink = mediaItem && mediaItem.type === 'link';
    const isMediaItemFileAndNotPending = mediaItem && mediaItem.type === 'file' && mediaItem.details.processingStatus !== 'pending';

    if (isMediaItemLink || isMediaItemFileAndNotPending) {
      return {
        observable() {
          return Observable.of(mediaItem);
        }
      };
    }

    const poolId = [mediaItemType, id, collection].join('-');
    let observable = observableFromObservablePool(pool, poolId, () => {
      return MediaItemProvider.fromMediaApi(config, cache, mediaItemType, id, clientId, collection).observable();
    });

    if (mediaItem) {
      observable = observable.startWith(mediaItem);
    }

    return {
      observable() {
        return observable;
      }
    };

  }

  public static createPool(): MediaItemObservablePool {
    return new Pool<Observable<MediaItem>>();
  }
}


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


export type MediaUrlPreviewObservablePool = Pool<Observable<UrlPreview>>;

export class MediaUrlPreviewProvider extends UrlPreviewProvider {
  public static fromMediaApi(config: MediaApiConfig, url: string, clientId: string) {
    return UrlPreviewProvider.fromMediaApi(config, url, clientId);
  }

  public static fromPool(pool: MediaUrlPreviewObservablePool, config: MediaApiConfig, url: string, clientId: string) {
    return {
      observable() {
        return observableFromObservablePool(pool, url, () => {
          return MediaUrlPreviewProvider.fromMediaApi(config, url, clientId).observable();
        });
      }
    };
  }

  public static createPool(): MediaUrlPreviewObservablePool {
    return new Pool<Observable<UrlPreview>>();
  }
}

export {UrlPreviewProvider};