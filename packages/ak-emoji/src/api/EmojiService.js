import JSSearch from 'js-search';
import debug from '../internal/logger';

const availableCategories = emojis => emojis.reduce((categories, emoji) => {
  categories[emoji.category] = true;
  return categories;
}, {});

export default class EmojiService {
  constructor(emojis) {
    this.emojis = emojis;

    this.fullSearch = new JSSearch.Search('id');
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortcut');
    this.fullSearch.addDocuments(emojis);

    this.shortcutLookup = new Map();
    emojis.forEach((emoji) => {
      const key = emoji.shortcut;
      if (!this.shortcutLookup.has(key)) {
        this.shortcutLookup.set(key, []);
      }
      const emojisForShortcut = this.shortcutLookup.get(key);
      emojisForShortcut.push(emoji);
    });
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
    const emojis = this.shortcutLookup.get(shortcut);
    if (emojis && emojis.length) {
      return emojis[0];
    }
    return null;
  }
}
