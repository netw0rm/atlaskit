import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

export class Pool<Item> {
  private readonly referenceCountById: {[s: string]: number} = {};
  private readonly referencesById: {[s: string]: Item} = {};

  acquire(poolId: string, createItem: () => Item): Item {
    if (!this.referenceCountById[poolId]) {

      this.referencesById[poolId] = createItem();
      this.referenceCountById[poolId] = 0;
    }
    this.referenceCountById[poolId] = this.referenceCountById[poolId] + 1;
    return this.referencesById[poolId];
  }
  release(poolId: string): void {
    if (this.referenceCountById[poolId] > 0) {
      this.referenceCountById[poolId] = this.referenceCountById[poolId] - 1;
    }
    if (!this.referenceCountById[poolId]) {
      delete this.referencesById[poolId];
    }
  }
}


export interface Controller<Command> {
  commands: Observable<Command>;
}

export interface Reducer<Command, Result> {
  attachTo(commands: Observable<Command>): Subscription;
  results: Observable<Result>;
}

export function observableFromReducerPool<Command, Result>(
  pool: Pool<Reducer<Command, Result>>,
  controller: Controller<Command>,
  poolId: string,
  createReducer: () => Reducer<Command, Result>
): Observable<Result> {
  return new Observable(subscriber => {
    const commandReducer = pool.acquire(poolId, createReducer);
    const cmdSubscription = commandReducer.attachTo(controller.commands);
    const resultsSubscription = commandReducer.results.subscribe(subscriber);
    return () => {
      resultsSubscription.unsubscribe();
      cmdSubscription.unsubscribe();
      pool.release(poolId);
    };
  });
}

export function observableFromObservablePool<Result>(
  pool: Pool<Observable<Result>>,
  poolId: string,
  createObservable: () => Observable<Result>
): Observable<Result> {
  return new Observable(subscriber => {
    const observable = pool.acquire(poolId, createObservable);
    const subscription = observable.subscribe(subscriber);
    return () => {
      subscription.unsubscribe();
      pool.release(poolId);
    };
  });
}
