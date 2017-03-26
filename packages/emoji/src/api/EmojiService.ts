import { Search, UnorderedSearchIndex } from 'js-search';
import debug from '../util/logger';
import { AvailableCategories, EmojiDescription, EmojiId, OptionalEmojiDescription } from '../types';

export interface EmojiSearchResult {
  emojis: EmojiDescription[];
  categories: AvailableCategories;
  query?: string;
}

export const toEmojiId = (emoji: EmojiDescription): EmojiId => ({
  id: emoji.id,
  variation: emoji.variation,
});

declare type EmojiByKey = Map<any, EmojiDescription[]>;

interface EmojiToKey {
  (emoji: EmojiDescription): any;
}

const availableCategories = (emojis: EmojiDescription[]): AvailableCategories => emojis.reduce((categories, emoji) => {
  categories[emoji.category] = true;
  return categories;
}, {});

const createMapBy = (emojis: EmojiDescription[], fnKey: EmojiToKey): EmojiByKey => {
  const map: EmojiByKey = new Map();
  emojis.forEach((emoji) => {
    const key = fnKey(emoji);
    if (!map.has(key)) {
      map.set(key, []);
    }
    const emojisForShortcut = map.get(key);
    // Unnecessary, but typescript thinks it is. :/
    if (emojisForShortcut) {
      emojisForShortcut.push(emoji);
    }
  });
  return map;
};

const findByKey = (map: EmojiByKey, key: any): OptionalEmojiDescription => {
  const emojis = map.get(key);
  if (emojis && emojis.length) {
    return emojis[0];
  }
  return undefined;
};

const groupByCategory = (emojis: EmojiDescription[]) : EmojiDescription[] => {
  const categoryOrder: string[] = [];
  const groupedEmojis: Map<string, EmojiDescription[]> = new Map();

  emojis.forEach(emoji => {
    const { category } = emoji;
    if (!groupedEmojis.has(category)) {
      categoryOrder.push(category);
      groupedEmojis.set(category, []);
    }
    const groupedEmoji = groupedEmojis.get(category);
    if (groupedEmoji) {
      groupedEmoji.push(emoji);
    }
  });

  let groupedByCategory: EmojiDescription[] = [];
  categoryOrder.forEach(category => {
    const groupedEmoji = groupedEmojis.get(category);
    if (groupedEmoji) {
      groupedByCategory = groupedByCategory.concat(groupedEmoji);
    }
  });

  return groupedByCategory;
};

export default class EmojiService {
  private emojis: EmojiDescription[];
  private fullSearch: Search;
  private shortcutLookup: EmojiByKey;
  private idLookup: EmojiByKey;

  constructor(emojis: EmojiDescription[]) {
    // Ensure emojis are ordered by: category (in order found), then by emoji order
    this.emojis = groupByCategory(emojis);

    this.fullSearch = new Search('id');
    this.fullSearch.searchIndex = new UnorderedSearchIndex();
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortcut');
    this.fullSearch.addDocuments(emojis);

    this.shortcutLookup = createMapBy(emojis, e => e.shortcut);
    this.idLookup = createMapBy(emojis, e => e.id);
  }

  /**
   * Returns all available emoji.
   */
  all(): EmojiSearchResult {
    return this.search();
  }

  /**
   * Text search of emoji shortcut and name field for suitable matches.
   *
   * Returns an array of all emoji is query is empty or null, otherwise an matching emoji.
   */
  search(query?: string): EmojiSearchResult {
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
      query,
    };
  }

  /**
   * Returns the first matching emoji matching the shortcut, or null if none found.
   */
  findByShortcut(shortcut): OptionalEmojiDescription {
    return findByKey(this.shortcutLookup, shortcut);
  }

  /**
   * Returns the first matching emoji matching the id, or null if none found.
   */
  findById(id: EmojiId): OptionalEmojiDescription {
    debug('findById', id, this.idLookup);
    return findByKey(this.idLookup, id.id);
  }

  findInCategory(categoryId: string): EmojiDescription[] {
    return this.all().emojis.filter(
      emoji => emoji.category === categoryId
    );
  }
}
