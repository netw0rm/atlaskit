import {expect} from 'chai';
import * as sinon from 'sinon';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {MediaItem, MediaItemProvider} from '../src';
import {LRUCache} from 'lru-fast';


const createProvider = (mediaItem?: MediaItem) => {
  const pool = MediaItemProvider.createPool();

  const config = {
    serviceHost: 'http://example.com',
    tokenProvider: sinon.stub().returns(Promise.resolve('xyz'))
  };

  const cache = new LRUCache<string, MediaItem>(200);

  return MediaItemProvider.fromPool(
    pool,
    config,
    cache,
    'link',
    'abcd',
    'media-services',
    'MyCollection',
    mediaItem
  );
};

let sandbox;

describe('MediaItemProvider', () => {

  describe('.fromPool()', () => {

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return media item when a link media item is passed in', done => {
      let actualMediaItem: MediaItem;
      const expectedMediaItem: MediaItem = {
        type: 'link',
        details: {
          id: 'abcd',
          type: 'link',
          url: 'http://google.com.au',
          title: 'Google!!!'
        }
      };

      const provider = createProvider(expectedMediaItem);

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItem = mediaItem;
        },
        complete() {
          expect(actualMediaItem).to.be.equal(expectedMediaItem);
          done();
        },
        error(error) {
          done(error);
        }
      });
    });

    it('should return media item when a file media item is passed in and the media item processingStatus is not pending', done => {
      let actualMediaItem: MediaItem;
      const expectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd'
        }
      };

      const provider = createProvider(expectedMediaItem);

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItem = mediaItem;
        },
        complete() {
          expect(actualMediaItem).to.be.equal(expectedMediaItem);
          done();
        },
        error(error) {
          done(error);
        }
      });
    });

    it('should return media item and then fetch media item when a file media item is passed in and the processingStatus is pending', done => {
      let actualMediaItems: Array<MediaItem> = [];
      const firstExpectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
          processingStatus: 'pending'
        }
      };
      const secondExpectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
          processingStatus: 'succeeded'
        }
      };

      const fromMediaApi = sandbox.stub(MediaItemProvider, 'fromMediaApi').returns({
        observable() {
          return Observable.of(secondExpectedMediaItem);
        }
      });

      const provider = createProvider(firstExpectedMediaItem);

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItems.push(mediaItem);
        },
        complete() {
          expect(fromMediaApi.called).to.be.true;
          expect(actualMediaItems).to.be.an('array').to.be.length(2);
          expect(actualMediaItems[0]).to.be.equal(firstExpectedMediaItem);
          expect(actualMediaItems[1]).to.be.equal(secondExpectedMediaItem);
          done();
        },
        error(error) {
          done(error);
        }
      });
    });

    it('should fetch media item when no media item is passed in', done => {
      let actualMediaItems: Array<MediaItem> = [];
      const firstExpectedMediaItem: MediaItem = {
        type: 'file',
        details: {
          id: 'abcd',
          processingStatus: 'succeeded'
        }
      };

      const fromMediaApi = sandbox.stub(MediaItemProvider, 'fromMediaApi').returns({
        observable() {
          return Observable.of(firstExpectedMediaItem);
        }
      });

      const provider = createProvider();

      provider.observable().subscribe({
        next(mediaItem) {
          actualMediaItems.push(mediaItem);
        },
        complete() {
          expect(fromMediaApi.called).to.be.true;
          expect(actualMediaItems).to.be.an('array').to.be.length(1);
          expect(actualMediaItems[0]).to.be.equal(firstExpectedMediaItem);
          done();
        },
        error(error) {
          done(error);
        }
      });
    });

  });

});
