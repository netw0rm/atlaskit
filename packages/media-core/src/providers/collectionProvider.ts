import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/publishReplay';

import { MediaCollection, MediaCollectionItem } from '../collection';
import { MediaApiConfig } from '../config';
import { CollectionService, MediaCollectionService, SortDirection } from '../services/collectionService';
import { Pool, observableFromReducerPool } from './util/reducerPool';

export type MediaCollectionItemPredicate = (item: MediaCollectionItem) => boolean;

export type LoadNextPageCommand = {
  type: 'loadNextPage'
};

export type RefreshCommand = {
  type: 'refresh'
};

export type LoadNextPageUntilCommand = {
  type: 'loadNextPageUntil',
  predicate: MediaCollectionItemPredicate
};

export type CollectionCommand = LoadNextPageCommand | LoadNextPageUntilCommand | RefreshCommand;

export interface CollectionController {
  loadNextPage(): void;
  loadNextPageUntil(predicate: MediaCollectionItemPredicate): void;
  refresh(): void;
}

class CollectionControllerImpl implements CollectionController {
  private readonly subject = new Subject<CollectionCommand>();

  loadNextPage(): void {
    this.subject.next({
      type: 'loadNextPage'
    });
  }

  loadNextPageUntil(predicate: MediaCollectionItemPredicate): void {
    this.subject.next({
      type: 'loadNextPageUntil',
      predicate
    });
  }

  refresh(): void {
    this.subject.next({
      type: 'refresh'
    });
  }

  get commands(): Observable<CollectionCommand> {
    return this.subject.asObservable();
  }
}

export class CollectionCommandReducer {
  private readonly subject = new Subject<MediaCollection>();
  private readonly connectableObservable = this.subject.publishReplay(1);

  private items: Array<MediaCollectionItem> = [];
  private nextInclusiveStartKey?: string = undefined;
  private isLoading = false;

  constructor(
    private readonly collectionService: CollectionService,
    private readonly collectionName: string,
    private readonly pageSize: number,
    private readonly sortDirection: SortDirection) {
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
    switch (command.type) {

      case 'loadNextPage':
        this.loadNextPage();
        break;

      case 'loadNextPageUntil':
        this.loadNextPageUntil(command.predicate);
        break;

      case 'refresh':
        this.refresh();
        break;

      default:
        this.subject.error(new Error(`unknown command ${command}`));

    }
  }

  private loadNextPageUntil(predicate: MediaCollectionItemPredicate): void {
    if (!this.items.some(predicate)) {
      const subscription = this.connectableObservable
        .subscribe({
          next: collection => {
            // an `undefined` `nextInclusiveStartKey` is how we know we've reached the end of a collection
            // (since the `Observable`'s `complete` callback is NEVER called so we can notify the
            // consumer when the list has changed)
            if (!this.nextInclusiveStartKey || collection.items.some(predicate)) {
              subscription.unsubscribe();
            } else {
              this.loadNextPage();
            }
          },
          complete: () => subscription.unsubscribe(),
          error: error => subscription.unsubscribe()
        });
    }
  }

  private loadNextPage(): void {
    if (this.isLoading) {
      return;
    } else {
      this.isLoading = true;
    }

    this.collectionService.getCollectionItems(
      this.collectionName,
      this.pageSize,
      this.nextInclusiveStartKey,
      this.sortDirection,
      'full')
      .then(response => {
        this.isLoading = false;
        this.items.push(...response.items);

        const mediaCollection = {
          id: this.collectionName,
          items: this.items
        };

        this.nextInclusiveStartKey = response.nextInclusiveStartKey;
        this.subject.next(mediaCollection);
      }, error => {
        this.isLoading = false;
        this.subject.error(error);
      });
  }

  private refresh() {
    if (this.isLoading) {
      return;
    } else {
      this.isLoading = true;
    }

    const oldFirstItemDetails = this.items[0] && this.items[0].details;
    const oldFirstItemId = oldFirstItemDetails && oldFirstItemDetails.id;
    const oldFirstItemOccurrenceKey = oldFirstItemDetails && oldFirstItemDetails.occurrenceKey;
    const newItems: Array<MediaCollectionItem> = [];
    let nextInclusiveStartKey;

    const fetchNewItems = () => {
      this.collectionService.getCollectionItems(
        this.collectionName,
        this.pageSize,
        nextInclusiveStartKey,
        this.sortDirection,
        'full'
      )
        .then(res => {
          let reachedFirstOldItem = false;
          for (let newItem of res.items) {

            const {details: {id, occurrenceKey}} = newItem;
            const reachedFirstItemAlreadyInCollection =  id === oldFirstItemId && occurrenceKey === oldFirstItemOccurrenceKey;

            if (reachedFirstItemAlreadyInCollection) {
              reachedFirstOldItem = true;
              break;
            }

            newItems.push(newItem);

          }

          if (reachedFirstOldItem) {
            this.isLoading = false;

            this.items = [...newItems, ...this.items];

            this.subject.next({
              id: this.collectionName,
              items: this.items
            });

          } else if (res.nextInclusiveStartKey) {
            nextInclusiveStartKey = res.nextInclusiveStartKey;
            fetchNewItems();
          }

        }, error => {
          this.isLoading = false;
          this.subject.error(error);
        });
    };

    fetchNewItems();
  }

}

export interface CollectionProvider {
  observable(): Observable<MediaCollection>;
  controller(): CollectionController;
}

export class CollectionProvider {

  public static fromCollectionService(
    collectionService: CollectionService,
    collectionName: string,
    pageSize: number,
    sortDirection: SortDirection): CollectionProvider {

    const controller = new CollectionControllerImpl();
    const reducer = new CollectionCommandReducer(
      collectionService,
      collectionName,
      pageSize,
      sortDirection);

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
    return CollectionProvider.fromCollectionService(
      new MediaCollectionService(config, clientId),
      collectionName,
      pageSize,
      sortDirection);
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
      const service = new MediaCollectionService(config, clientId);
      return new CollectionCommandReducer(service, collectionName, pageSize, sortDirection);
    };

    return {
      controller: () => controller,
      observable: () => observableFromReducerPool(pool, controller, poolId, createFn)
    };
  }
}
