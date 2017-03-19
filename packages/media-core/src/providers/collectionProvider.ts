import { Observable } from 'rxjs/Observable';
import { MediaCollection, MediaCollectionItem, MediaCollectionFileItem, MediaCollectionLinkItem, MediaApiConfig } from '../';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { CollectionService, MediaCollectionService, SortDirection } from '../services/collectionService';
import 'rxjs/add/operator/publishReplay';
import { Pool, observableFromReducerPool } from './util/reducerPool';

export type CollectionCommand = 'loadNextPage';

export interface CollectionController {
  loadNextPage(): void;
}

class CollectionControllerImpl implements CollectionController {
  private readonly subject = new Subject<CollectionCommand>();

  loadNextPage(): void {
    this.subject.next('loadNextPage');
  }

  get commands(): Observable<CollectionCommand> {
    return this.subject.asObservable();
  }
}

export class CollectionCommandReducer {
  private readonly subject = new Subject<MediaCollection>();
  private readonly connectableObservable = this.subject.publishReplay(1);

  private readonly items: Array<MediaCollectionItem> = [];
  private nextInclusiveStartKey: string = '';
  private isLoading = false;

  constructor(private readonly collectionService: CollectionService) {
    this.connectableObservable.connect();
    this.loadNextPage();
  }

  get results(): Observable<MediaCollection> {
    return this.connectableObservable;
  }

  attachTo(commands: Observable<CollectionCommand>): Subscription {
    return commands.subscribe({
      next: command => this.handleCommand(command)
    });
  }

  private handleCommand(command: CollectionCommand): void {
    if (command === 'loadNextPage') {
      this.loadNextPage();
    } else {
      this.subject.error(new Error(`unknown command ${command}`));
    }
  }

  private loadNextPage(): void {
    if (this.isLoading) {
      return;
    } else {
      this.isLoading = true;
    }

    this.collectionService.getCollectionItems(this.nextInclusiveStartKey, 'full')
      .then(response => {
        const items = response.data.contents
          .map(item => {
            if (item.type === 'file') {
              return {
                type: item.type,
                id: item.id,
                occurrenceKey: item.occurrenceKey,
                name: item.details.name,
                mimeType: item.details.mimeType
              } as MediaCollectionFileItem;
            } else {
              return {
                type: item.type,
                id: item.id,
                occurrenceKey: item.occurrenceKey,
                url: item.details.url
              } as MediaCollectionLinkItem;
            }
          });

        this.items.push(...items);

        const mediaCollection = {
          id: this.collectionService.collectionName,
          items: this.items
        };

        this.nextInclusiveStartKey = response.data.nextInclusiveStartKey;

        if (this.nextInclusiveStartKey) {
          this.subject.next(mediaCollection);
        } else {
          this.subject.next(mediaCollection);
          this.subject.complete();
        }

        this.isLoading = false;
      }, error => {
        this.subject.error(error);
        this.isLoading = false;
      });
  }
}

export interface CollectionProvider {
  observable(): Observable<MediaCollection>;
  controller(): CollectionController;
}

export class CollectionProvider {

  public static fromCollectionService(collectionService: CollectionService): CollectionProvider {
    const controller = new CollectionControllerImpl();
    const reducer = new CollectionCommandReducer(collectionService);
    reducer.attachTo(controller.commands);
    return {
      controller: () => controller,
      observable: () => reducer.results
    };
  }

  public static fromMediaAPI(
    config: MediaApiConfig,
    collectionName: string,
    clientId: string,
    pageSize: number,
    sortDirection: SortDirection): CollectionProvider {
    return CollectionProvider.fromCollectionService(new MediaCollectionService(config, collectionName, clientId, pageSize, sortDirection));
  }

  public static fromPool(
    pool: Pool<CollectionCommandReducer>,
    config: MediaApiConfig,
    collectionName: string,
    clientId: string,
    pageSize: number,
    sortDirection: SortDirection): CollectionProvider {
    const controller = new CollectionControllerImpl();

    const poolId = [collectionName, pageSize, sortDirection].join('-');
    const createFn = () => {
      const service = new MediaCollectionService(config, collectionName, clientId, pageSize, sortDirection);
      return new CollectionCommandReducer(service);
    };

    return {
      controller: () => controller,
      observable: () => observableFromReducerPool(pool, controller, poolId, createFn)
    };
  }
}
