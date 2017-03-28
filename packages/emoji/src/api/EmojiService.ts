import { Search, UnorderedSearchIndex } from 'js-search';
import debug from '../util/logger';
import { AvailableCategories, EmojiDescription, EmojiId, EmojiModifiers, EmojiRepresentation, OptionalEmojiDescription } from '../types';

export interface EmojiSearchResult {
  emojis: EmojiDescription[];
  categories: AvailableCategories;
  query?: string;
}

export const toEmojiId = (emoji: EmojiDescription, modifiers?: EmojiModifiers): EmojiId => ({
  shortcut: emoji.shortcut,
  id: emoji.id,
  fallback: emoji.fallback,
  modifiers: {
    ...modifiers,
  },
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
    // Priority is always to source from the last emoji set (last overrides first)
    return emojis[emojis.length - 1];
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

export const modifyEmoji = (emoji: EmojiDescription, modifiers?: EmojiModifiers): EmojiDescription => {
  return modifyOptionalEmoji(emoji, modifiers) as EmojiDescription;
};

export const modifyOptionalEmoji = (emoji: OptionalEmojiDescription, modifiers?: EmojiModifiers): OptionalEmojiDescription => {
  const skinTone = emoji && modifiers && modifiers['skinTone'];
  if (emoji && skinTone) {
    const { representation, skinVariations, ...other } = emoji;
    // Zero = default representation; 1 = first skin variation
    const modifiedRepresentation: EmojiRepresentation = skinVariations && skinVariations[skinTone - 1] || representation;
    return {
      ...other,
      representation: modifiedRepresentation,
    };
  }
  return emoji;
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
  search(query?: string, modifiers?: EmojiModifiers): EmojiSearchResult {
    let filteredEmoji: EmojiDescription[];
    if (query) {
      filteredEmoji = this.fullSearch.search(query);
    } else {
      filteredEmoji = this.emojis;
    }
    filteredEmoji = filteredEmoji.map((emoji) => modifyEmoji(emoji, modifiers));
    debug('EmojiService.search', query, modifiers, filteredEmoji && filteredEmoji.length);
    return {
      emojis: filteredEmoji,
      categories: availableCategories(filteredEmoji),
      query,
    };
  }

  /**
   * Returns the first matching emoji matching the shortcut, or null if none found.
   */
  findByShortcut(shortcut: string, modifiers?: EmojiModifiers): OptionalEmojiDescription {
    return modifyOptionalEmoji(findByKey(this.shortcutLookup, shortcut), modifiers);
  }

  /**
   * Returns the first matching emoji matching the id, or null if none found.
   */
  findById(id: string, modifiers?: EmojiModifiers): OptionalEmojiDescription {
    debug('findById', id, this.idLookup);
    return modifyOptionalEmoji(findByKey(this.idLookup, id), modifiers);
  }

  findInCategory(categoryId: string): EmojiDescription[] {
    return this.all().emojis.filter(
      emoji => emoji.category === categoryId
    );
  }
}
