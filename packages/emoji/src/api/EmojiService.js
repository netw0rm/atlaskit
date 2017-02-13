import JSSearch from 'js-search';
import debug from '../internal/logger';

const availableCategories = emojis => emojis.reduce((categories, emoji) => {
  categories[emoji.category] = true;
  return categories;
}, {});

export const toEmojiId = emoji => ({
  id: emoji.id,
});

export const createMapBy = (emojis, keyFn) => {
  const map = new Map();
  emojis.forEach((emoji) => {
    const key = keyFn(emoji);
    if (!map.has(key)) {
      map.set(key, []);
    }
    const emojisForKey = map.get(key);
    emojisForKey.push(emoji);
  });
  return map;
};

export const findByKey = (emojiMap, key) => {
  const emojis = emojiMap.get(key);
  if (emojis && emojis.length) {
    return emojis[0];
  }
  return null;
};

export default class EmojiService {
  constructor(emojis) {
    this.emojis = emojis;

    this.fullSearch = new JSSearch.Search('id');
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortcut');
    this.fullSearch.addDocuments(emojis);

    this.shortcutLookup = createMapBy(emojis, emoji => emoji.shortcut);
    this.idLookup = createMapBy(emojis, emoji => emoji.id);
  }

  /**
   * Returns all available emoji.
   */
  all() {
    return this.search();
  }

  /**
   * Text search of emoji shortcut and name field for suitable matches.
   *
   * Returns an array of all emoji is query is empty or null, otherwise an matching emoji.
   */
  search(query) {
    let filteredEmoji;
    if (query) {
      filteredEmoji = this.fullSearch.search(query);
    } else {
      filteredEmoji = this.emojis;
    }
    debug('EmojiService.search', query, filteredEmoji && filteredEmoji.length);
    return {
      emojis: filteredEmoji,
      categories: availableCategories(filteredEmoji),
    };
  }

  /**
   * Returns the first matching emoji matching the shortcut, or null if none found.
   */
  findByShortcut(shortcut) {
    return findByKey(this.shortcutLookup, shortcut);
  }

  /**
   * Returns the first matching emoji matching the id, or null if none found.
   */
  findById(id) {
    return findByKey(this.idLookup, id);
  }
}
