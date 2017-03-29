import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/publishReplay';

import { MediaCollection, MediaCollectionItem} from '../collection';
import { MediaApiConfig } from '../config';
import { CollectionService, MediaCollectionService, SortDirection } from '../services/collectionService';
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

    this.collectionService.getCollectionItems(
      this.collectionName,
      this.pageSize,
      this.nextInclusiveStartKey,
      this.sortDirection,
      'full')
      .then(response => {
        this.items.push(...response.items);

        const mediaCollection = {
          id: this.collectionName,
          items: this.items
        };

        this.nextInclusiveStartKey = response.nextInclusiveStartKey;

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
