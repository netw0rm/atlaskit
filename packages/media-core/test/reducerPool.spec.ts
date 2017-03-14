import * as chai from 'chai';
import * as sinon from 'sinon';
import {Pool, observableFromReducerPool, Reducer, observableFromObservablePool} from '../src/providers/util/reducerPool';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

const expect = chai.expect;
const assert = chai.assert;

describe('reducerPool', () => {

  describe('Pool', () => {

    it('invokes the create function when creating the first item', () => {
      const pool = new Pool<number>();
      const createFn = sinon.spy(() => 0);

      const v = pool.acquire('item', createFn);

      expect(v).to.equal(0);
      assert(createFn.calledOnce);
    });

    it('does not invokes the create function when creating the second item', () => {
      const pool = new Pool<number>();
      const createFn = sinon.spy(() => 0);

      const v1 = pool.acquire('item', createFn);
      const v2 = pool.acquire('item', createFn);

      expect(v1).to.equal(v2);
      assert(createFn.calledOnce);
    });

    it('invokes the create function again when releasing all created items', () => {
      const pool = new Pool<number>();
      const createFn = sinon.spy(() => 0);

      const v1 = pool.acquire('item', createFn);
      pool.release('item');
      const v2 = pool.acquire('item', createFn);

      expect(v1).to.equal(v2);
      assert(createFn.calledTwice);
    });

    it('invokes the create function for separate ids multiple times', () => {
      const pool = new Pool<number>();
      const createFn = sinon.spy(() => 0);

      pool.acquire('item1', createFn);
      pool.acquire('item2', createFn);

      assert(createFn.calledTwice);
    });

  });

  describe('observableFromReducerPool()', () => {

    function mockCreateFn() {
      return sinon.spy((): Reducer<string, string> => {
        const subject = new Subject<string>();
        return {
          attachTo(commands: Subject<string>): Subscription {
            return commands.subscribe(subject);
          },
          results: subject.asObservable()
        };
      });
    }

    it('acquires the actual resource on subscription', () => {
      const pool = new Pool<Reducer<string, string>>();
      const controller = { commands: new Subject<string>() };
      const poolId = 'item';
      const createFn = mockCreateFn();
      const observable = observableFromReducerPool(pool, controller, poolId, createFn);
      assert(createFn.notCalled);

      observable.subscribe();
      assert(createFn.calledOnce);
    });

    it('releases the actual resource when unsubscribed', () => {
      const pool = new Pool<Reducer<string, string>>();
      const controller = { commands: new Subject<string>() };
      const poolId = 'item';
      const createFn = mockCreateFn();

      const observable = observableFromReducerPool(pool, controller, poolId, createFn);
      pool.release = sinon.spy(pool.release);

      assert((pool.release as any).notCalled);

      const subscription = observable.subscribe();
      subscription.unsubscribe();

      assert((pool.release as any).calledOnce);
    });

    it('wires up the controller, reducer and observable correctly', () => {
      const pool = new Pool<Reducer<string, string>>();
      const controller = { commands: new Subject<string>() };
      const poolId = 'item';
      const createFn = mockCreateFn();
      const observable = observableFromReducerPool(pool, controller, poolId, createFn);

      return new Promise((resolve, reject) => {
        observable.subscribe({
          next(x) {
            resolve();
          }
        });

        controller.commands.next('');
      });
    });

  });

  describe('observableFromObservablePool()', () => {

    it('acquires the actual resource on subscription', () => {
      const pool = new Pool<Observable<number>>();
      const createFn = sinon.spy(() => Observable.create(0));
      const observable = observableFromObservablePool(pool, 'item', createFn);
      assert(createFn.notCalled);

      observable.subscribe();
      assert(createFn.calledOnce);
    });

    it('releases the actual resource when unsubscribed', () => {
      const pool = new Pool<Observable<number>>();
      const createFn = sinon.spy(() => new Observable(subscriber => { subscriber.next(0); }));
      const observable = observableFromObservablePool(pool, 'item', createFn);
      pool.release = sinon.spy(pool.release);

      assert((pool.release as any).notCalled);

      const subscription = observable.subscribe();
      subscription.unsubscribe();

      assert((pool.release as any).calledOnce);
    });

    it('wires up the observables correctly', () => {
      const pool = new Pool<Observable<number>>();
      const createFn = sinon.spy(() => new Observable(subscriber => { subscriber.next(0); }));
      const observable = observableFromObservablePool(pool, 'item', createFn);

      return new Promise((resolve, reject) => {
        observable.subscribe({
          next(x) {
            resolve();
          }
        });
      });
    });

  });

});
