import { waitUntil } from '@atlaskit/util-common-test';

import { isPromise } from '../../../../src/type-helpers';
import MediaEmojiCache, { BrowserCacheStrategy, EmojiCacheStrategy, MemoryCacheStrategy } from '../../../../src/api/media/MediaEmojiCache';
import TokenManager from '../../../../src/api/media/TokenManager';

import { createTokenManager, imageEmoji, loadedMediaEmoji, mediaEmoji, mediaEmojiImagePath } from '../../../../src/support/test-data';

const restoreStub = (stub: any) => {
  if (stub.mock) {
    stub.mockRestore();
  }
};

class MockMediaImageLoader {
  reject: boolean;

  loadMediaImage(url: string): Promise<string> {
    if (this.reject) {
      return Promise.reject('Bad times');
    }
    return Promise.resolve(`data:;base64,`);
  }
}

describe('MediaEmojiCache', () => {
  class TestMediaEmojiCache extends MediaEmojiCache {
    constructor(tokenManager?: TokenManager) {
      super(tokenManager || createTokenManager());
    }

    callGetCache(url: string): EmojiCacheStrategy | Promise<EmojiCacheStrategy> {
      return this.getCache(url);
    }
  }

  afterEach(() => {
    restoreStub(BrowserCacheStrategy.supported);
    restoreStub(BrowserCacheStrategy.prototype.loadEmoji);
    restoreStub(BrowserCacheStrategy.prototype.optimisticRendering);
    restoreStub(MemoryCacheStrategy.prototype.loadEmoji);
    restoreStub(MemoryCacheStrategy.prototype.optimisticRendering);
  });

  describe('#getCache', () => {
    it('init - use BrowserCacheStrategy', () => {
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.resolve(true));
      const cache = new TestMediaEmojiCache();
      const cacheStrategy = cache.callGetCache(mediaEmojiImagePath);
      return expect(cacheStrategy).resolves.toBeInstanceOf(BrowserCacheStrategy);
    });

    it('init - use MemoryCacheStrategy', () => {
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.resolve(false));
      const cache = new TestMediaEmojiCache();
      const cacheStrategy = cache.callGetCache(mediaEmojiImagePath);
      return expect(cacheStrategy).resolves.toBeInstanceOf(MemoryCacheStrategy);
    });

    it('cache initialised - returns cache not promise', () => {
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.resolve(true));

      const cache = new TestMediaEmojiCache();
      const cacheStrategy = cache.callGetCache(mediaEmojiImagePath);

      return expect(cacheStrategy)
        .resolves.toBeInstanceOf(BrowserCacheStrategy)
        .then(() => {
          const cacheStrategy2 = cache.callGetCache(mediaEmojiImagePath);
          expect(isPromise(cacheStrategy2)).toBe(false);
        });
    });

    it('init - first url is bad, good second', () => {
      const supportedError = 'damn it';

      let callCount = 0;
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.reject(supportedError);
        } else if (callCount === 2) {
          return Promise.resolve(true);
        } else {
          return undefined;
        }
      });

      const cache = new TestMediaEmojiCache();
      const cacheStrategy = cache.callGetCache(mediaEmojiImagePath);

      return expect(cacheStrategy)
        .rejects.toBe('Unable to initialise cache based on provided url(s)')
        .then(() => {
          const cacheStrategy2 = cache.callGetCache(mediaEmojiImagePath);
          expect(isPromise(cacheStrategy)).toBe(true);
          return cacheStrategy2;
        }).then(implCache => {
          expect(implCache).toBeInstanceOf(BrowserCacheStrategy);
        });
    });
  });

  describe('#loadEmoji', () => {
    it('image emoji - immediately returned', () => {
      const cache = new TestMediaEmojiCache();
      const loadedEmoji = cache.loadEmoji(imageEmoji);
      expect(isPromise(loadedEmoji)).toEqual(false);
      expect(loadedEmoji).toBe(imageEmoji);
    });

    it('media emoji - before and after cache ready', () => {
      jest.spyOn(BrowserCacheStrategy.prototype, 'loadEmoji').mockImplementation(() => loadedMediaEmoji);
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.resolve(true));

      const cache = new TestMediaEmojiCache();

      return expect(cache.loadEmoji(mediaEmoji))
        .resolves.toEqual(loadedMediaEmoji)
        .then(() => {
          const cachedEmoji = cache.loadEmoji(mediaEmoji);
          expect(isPromise(cachedEmoji)).toBe(false);
          expect(cachedEmoji).toEqual(loadedMediaEmoji);
        });
    });

    it('media emoji - cache failed to load', () => {
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.reject('fail'));
      const cache = new TestMediaEmojiCache();
      return expect(cache.loadEmoji(mediaEmoji)).resolves.toBe(undefined);
    });
  });

  describe('#optimisticRendering', () => {
    it('delegates to cache strategy', () => {
      const optimisticRenderingStub = jest.spyOn(BrowserCacheStrategy.prototype, 'optimisticRendering').mockImplementation(() => true);
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.resolve(true));

      const cache = new TestMediaEmojiCache();
      const optimisticRenderingPromise = cache.optimisticRendering(mediaEmojiImagePath);

      return expect(optimisticRenderingPromise)
        .resolves.toBe(true)
        .then(() => {
          expect(optimisticRenderingStub).toHaveBeenCalledTimes(1);
          const optimisticRendering = cache.optimisticRendering(mediaEmojiImagePath);
          expect(isPromise(optimisticRendering)).toBe(false);
          expect(optimisticRendering).toBe(true);
          expect(optimisticRenderingStub).toHaveBeenCalledTimes(2);
        });
    });

    it('returns false if no cache strategy', () => {
      jest.spyOn(BrowserCacheStrategy, 'supported').mockImplementation(() => Promise.reject('fail'));
      const cache = new TestMediaEmojiCache();
      const renderingPromise = cache.optimisticRendering(mediaEmojiImagePath);
      return expect(renderingPromise).resolves.toBe(false);
    });
  });
});

describe('BrowserCacheStrategy', () => {
  describe('#supported', () => {
    class MockImage {
      src: string;
      listeners: Map<string, Function> = new Map();
      addEventListener(type, callback) {
        this.listeners.set(type, callback);
      }
    }

    let imageConstructorStub;
    let mockImage;
    let mockMediaImageLoader;

    beforeEach(() => {
      mockImage = new MockImage();
      mockMediaImageLoader = new MockMediaImageLoader();
      imageConstructorStub = jest.spyOn(window, 'Image' as any)
        .mockImplementation(() => mockImage);
    });

    afterEach(() => {
      restoreStub(imageConstructorStub);
    });

    it('image loaded', () => {
      const promise = BrowserCacheStrategy.supported('cheese', mockMediaImageLoader).then(supported => {
        expect(supported).toBe(true);
        expect(mockImage.src).toBe('cheese');
      });
      return waitUntil(() => !!mockImage.listeners.get('load')).then(() => {
        mockImage.listeners.get('load')();
        return promise;
      });
    });

    it('image load error', () => {
      const promise = BrowserCacheStrategy.supported('cheese', mockMediaImageLoader).then(supported => {
        expect(supported).toBe(false);
        expect(mockImage.src).toBe('cheese');
      });
      return waitUntil(() => !!mockImage.listeners.get('error')).then(() => {
        mockImage.listeners.get('error')();
        return promise;
      });
    });

    it('exception loading image', () => {
      imageConstructorStub = jest.spyOn(window, 'Image' as any).mockImplementation(() => {
        throw new Error('doh');
      });

      return BrowserCacheStrategy.supported('cheese', mockMediaImageLoader).then(supported => {
        expect(supported).toBe(false);
        expect(mockImage.src).toBe(undefined);
        expect(mockImage.listeners.size).toBe(0);
      });
    });
  });

  describe('#loadEmoji', () => {
    let mockMediaImageLoader;
    let browserCacheStrategy: BrowserCacheStrategy;

    beforeEach(() => {
      mockMediaImageLoader = new MockMediaImageLoader();
      browserCacheStrategy = new BrowserCacheStrategy(mockMediaImageLoader);
    });

    it('returns emoji if not media', () => {
      expect(browserCacheStrategy.loadEmoji(imageEmoji)).toEqual(imageEmoji);
    });

    it('returns Promise if uncached, Emoji when not', () => {
      return expect(browserCacheStrategy.loadEmoji(mediaEmoji))
        .resolves.toEqual(mediaEmoji)
        .then(() => {
          const cachedEmoji = browserCacheStrategy.loadEmoji(mediaEmoji);
          expect(cachedEmoji).toEqual(mediaEmoji);
        });
    });

    it('returns undefined via Promise if uncached and error, Emoji once cached', () => {
      mockMediaImageLoader.reject = true;
      return expect(browserCacheStrategy.loadEmoji(mediaEmoji))
        .resolves.toBe(undefined)
        .then(() => {
          const cachedError = browserCacheStrategy.loadEmoji(mediaEmoji);
          expect(cachedError).toBe(undefined);
        });
    });
  });
});

describe('MemoryCacheStrategy', () => {
  describe('#loadEmoji', () => {
    let mockMediaImageLoader;
    let memoryCacheStrategy: MemoryCacheStrategy;

    beforeEach(() => {
      mockMediaImageLoader = new MockMediaImageLoader();
      memoryCacheStrategy = new MemoryCacheStrategy(mockMediaImageLoader);
    });

    it('returns emoji if not media', () => {
      expect(memoryCacheStrategy.loadEmoji(imageEmoji)).toEqual(imageEmoji);
    });

    it('returns Promise if uncached, Emoji when not', () => {
      return expect(memoryCacheStrategy.loadEmoji(mediaEmoji))
        .resolves.toEqual(loadedMediaEmoji)
        .then(() => {
          const cachedEmoji = memoryCacheStrategy.loadEmoji(mediaEmoji);
          expect(cachedEmoji).toEqual(loadedMediaEmoji);
        });
    });

    it('returns undefined via Promise if uncached and error, Emoji once cached', () => {
      mockMediaImageLoader.reject = true;
      return expect(memoryCacheStrategy.loadEmoji(mediaEmoji))
        .resolves.toBe(undefined)
        .then(() => {
          const cachedError = memoryCacheStrategy.loadEmoji(mediaEmoji);
          expect(cachedError).toBe(undefined);
        });
    });
  });
});
