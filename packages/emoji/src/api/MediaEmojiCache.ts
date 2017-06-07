import { LRUCache } from 'lru-fast/lru';

import { EmojiDescription, EmojiId, OptionalEmojiDescription } from '../types';

export interface MediaEmojiCacheOptions {
  cacheSize?: number;
}

export const defaultCacheSize = 50;

/**
 * This is a cache for media emoji that has already been loaded
 * and converted to an ImageRepresentation.
 */
export default class MediaEmojiCache {
  private emojiCache: LRUCache<string,EmojiDescription>;

  constructor(options?: MediaEmojiCacheOptions) {
    this.emojiCache = new LRUCache<string,EmojiDescription>(options && options.cacheSize || defaultCacheSize);
  }

  addEmoji(emoji: EmojiDescription): boolean {
    if (!emoji.id) {
      // ignore
      return false;
    }
    this.emojiCache.put(emoji.id, emoji);
    return true;
  }

  getEmoji(emojiId: EmojiId): OptionalEmojiDescription {
    if (!emojiId.id) {
      return undefined;
    }
    return this.emojiCache.get(emojiId.id);
  }

  loadFromCache(emojis: EmojiDescription[]) {
    let count = 0;
    const loadedEmojis = emojis.map(emoji => {
      const cachedEmoji = this.getEmoji(emoji);
      if (cachedEmoji) {
        count++;
        return cachedEmoji;
      }
      return emoji;
    });
    // console.log(`Retrieved ${count} emoji from cache`);
    return loadedEmojis;
  }
}
