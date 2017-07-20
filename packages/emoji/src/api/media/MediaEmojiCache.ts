import { EmojiDescription, OptionalEmojiDescription } from '../../types';
import { convertMediaToImageEmoji, isMediaRepresentation, isPromise } from '../../type-helpers';
import MediaImageLoader from './MediaImageLoader';
import debug from '../../util/logger';
import TokenManager from './TokenManager';

import { LRUCache } from 'lru-fast';

export interface EmojiCacheStrategy {
  loadEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
  optimisticRendering(): boolean;
}

/**
 * For browsers that support caching for resources
 * regardless of originally supplied headers (basically everything but Firefox).
 */
export class BrowserCacheStrategy implements EmojiCacheStrategy {
  private cachedImageUrls: Map<string,EmojiDescription> = new Map<string,EmojiDescription>();
  private invalidImageUrls: Set<string> = new Set<string>();
  private mediaImageLoader: MediaImageLoader;

  constructor(mediaImageLoader: MediaImageLoader) {
    debug('BrowserCacheStrategy');
    this.mediaImageLoader = mediaImageLoader;
  }

  loadEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    const { representation } = emoji;

    if (!isMediaRepresentation(representation)) {
      return emoji;
    }

    const { mediaPath } = representation;

    if (this.cachedImageUrls.has(mediaPath)) {
      // Already cached
      return this.cachedImageUrls.get(mediaPath);
    }

    if (this.invalidImageUrls.has(mediaPath)) {
      return undefined;
    }

    return this.mediaImageLoader.loadMediaImage(mediaPath).then(() => {
      // Media is loaded, can use original URL now, so just return original emoji
      this.cachedImageUrls.set(mediaPath, emoji);
      return emoji;
    }).catch(err => {
      this.invalidImageUrls.add(mediaPath);
      return undefined;
    });
  }

  optimisticRendering() {
    return true;
  }

  static supported(mediaPath: string, mediaImageLoader: MediaImageLoader): Promise<boolean> {
    return mediaImageLoader.loadMediaImage(mediaPath).then(dataURL =>
      // Image should be cached in browser, if supported it should be accessible from the cache by an <img/>
      // Try to load without via image to confirm this support (this fails in Firefox)
      new Promise<boolean>((resolve, reject) => {
        const img = new Image();

        img.addEventListener('load', () => {
          resolve(true);
        });
        img.addEventListener('error', () => {
          resolve(false);
        });

        img.src = mediaPath;
      })
    ).catch(err => false);
  }
}

const maxImageCached = 1000;
// Don't cache images large than this - dataUrl size in characters
const maxImageSize = 10000;

/**
 * For browsers that do no cache images without equivalent headers (e.g. Firefox).
 *
 * Images are cached in memory in a LRU cache. Images considered too large,
 * are not cached, but retrieved each time.
 *
 * Images are still cached by the browser, but loading in asynchronous with
 * small delay noticable to the end user.
 */
export class MemoryCacheStrategy implements EmojiCacheStrategy {
  private dataURLCache: LRUCache<string,EmojiDescription>;
  private invalidImageUrls: Set<string> = new Set<string>();
  private mediaImageLoader: MediaImageLoader;

  constructor(mediaImageLoader: MediaImageLoader) {
    debug('MemoryCacheStrategy');
    this.mediaImageLoader = mediaImageLoader;
    this.dataURLCache = new LRUCache<string,EmojiDescription>(maxImageCached);
  }

  loadEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    const { representation } = emoji;

    if (!isMediaRepresentation(representation)) {
      return emoji;
    }

    const { mediaPath } = representation;

    const cachedEmoji = this.dataURLCache.get(mediaPath);
    if (cachedEmoji) {
      return cachedEmoji;
    }

    if (this.invalidImageUrls.has(mediaPath)) {
      // Already cached
      return undefined;
    }

    // Not cached, load
    return this.mediaImageLoader.loadMediaImage(mediaPath).then(dataURL => {
      const loadedEmoji = convertMediaToImageEmoji(emoji, dataURL);
      if (dataURL.length <= maxImageSize) {
        // Only cache if not large than max size
        this.dataURLCache.put(mediaPath, loadedEmoji);
      } else {
        debug('No caching as image is too large', dataURL.length, dataURL.slice(0,15), emoji.shortName);
      }
      return loadedEmoji;
    }).catch(err => {
        this.invalidImageUrls.add(mediaPath);
        return undefined;
    });
  }

  optimisticRendering() {
    return false;
  }
}

/**
 * Provides a cache for Media Emoji.
 *
 * Emoji are returned immediately if cached and ready to use by the browser.
 *
 * Otherwise, they are loaded and returned via a promise.
 */
export default class MediaEmojiCache {
  protected cache: EmojiCacheStrategy;
  protected waitingInitUrls: string[] = [];
  private cacheLoading: Promise<EmojiCacheStrategy> | undefined;
  private mediaImageLoader: MediaImageLoader;

  constructor(tokenManager: TokenManager) {
    debug('MediaEmojiCache');
    this.mediaImageLoader = new MediaImageLoader(tokenManager);
  }

  loadEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    const representation = emoji.representation;
    if (!isMediaRepresentation(representation)) {
      return emoji;
    }
    const { mediaPath } = representation;

    const emojiCache = this.getCache(mediaPath);

    if (isPromise(emojiCache)) {
      // Promise based
      return emojiCache
        .then(cache => cache.loadEmoji(emoji))
        .catch(err => undefined);
    }

    return emojiCache.loadEmoji(emoji);
  }

  optimisticRendering(url: string): boolean | Promise<boolean> {
    const emojiCache = this.getCache(url);

    if (isPromise(emojiCache)) {
      // Promise based
      return emojiCache
        .then(cache => cache.optimisticRendering())
        .catch(err => false);
    }

    return emojiCache.optimisticRendering();
  }

  protected getCache(url: string): EmojiCacheStrategy | Promise<EmojiCacheStrategy> {
    if (this.cache) {
      return this.cache;
    }
    this.waitingInitUrls.push(url);
    if (!this.cacheLoading) {
      this.cacheLoading = this.initCache().then(cache => {
        this.cache = cache;
        this.cacheLoading = undefined;
        return cache;
      }).catch(err => {
        this.cacheLoading = undefined;
        throw err;
      });
    }
    return this.cacheLoading;
  }

  private initCache(): Promise<EmojiCacheStrategy> {
    const url = this.waitingInitUrls.pop();
    if (!url) {
      return Promise.reject('Unable to initialise cache based on provided url(s)');
    }
    return BrowserCacheStrategy.supported(url, this.mediaImageLoader)
      .then(supported => {
        this.waitingInitUrls = []; // clear
        this.cacheLoading = undefined;
        if (supported) {
          return new BrowserCacheStrategy(this.mediaImageLoader);
        }
        return new MemoryCacheStrategy(this.mediaImageLoader);
      }).catch(err => {
        return this.initCache();
      });
  }
}
