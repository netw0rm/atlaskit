import { Search, UnorderedSearchIndex } from 'js-search';
import debug from '../util/logger';
import { AvailableCategories, EmojiDescription, OptionalEmojiDescription, SearchOptions } from '../types';
import { isEmojiDescriptionWithVariations } from '../type-helpers';

export interface EmojiSearchResult {
  emojis: EmojiDescription[];
  categories: AvailableCategories;
  query?: string;
}

declare type EmojiByKey = Map<any, EmojiDescription[]>;

interface EmojiToKey {
  (emoji: EmojiDescription): any;
}

const availableCategories = (emojis: EmojiDescription[]): AvailableCategories => emojis.reduce((categories, emoji) => {
  categories[emoji.category] = true;
  return categories;
}, {});

const addAllVariants = (emoji: EmojiDescription, fnKey: EmojiToKey, map: EmojiByKey): void => {
  const key = fnKey(emoji);
  if (!map.has(key)) {
    map.set(key, []);
  }
  const emojisForKey = map.get(key);
  // Unnecessary, but typescript thinks it is. :/
  if (emojisForKey) {
    emojisForKey.push(emoji);
  }

  if (isEmojiDescriptionWithVariations(emoji)) {
    // map variations too
    const variations = emoji.skinVariations;
    if (variations) {
      variations.forEach(variation => addAllVariants(variation, fnKey, map));
    }
  }
};

const createMapBy = (emojis: EmojiDescription[], fnKey: EmojiToKey): EmojiByKey => {
  const map: EmojiByKey = new Map();
  emojis.forEach(emoji => addAllVariants(emoji, fnKey, map));
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

const groupByCategory = (categoryOrder: string[], emojis: EmojiDescription[]) : EmojiDescription[] => {
  let initOrder: boolean = false;
  if (categoryOrder.length === 0) {
    initOrder = true;
  }
  const groupedEmojis: Map<string, EmojiDescription[]> = new Map();

  emojis.forEach(emoji => {
    const { category } = emoji;
    if (!groupedEmojis.has(category)) {
      if (initOrder) {
        categoryOrder.push(category);
      }
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
      groupedByCategory = groupedByCategory.concat(groupedEmoji.sort(emojiSorter));
    }
  });

  return groupedByCategory;
};

const emojiSorter = (e1: EmojiDescription, e2: EmojiDescription) : number  => {
  if (e1.order && e2.order && e1.order !== e2.order) {
    return e1.order - e2.order;
  } else if (e1.shortName !== e2.shortName) {
    return e1.shortName.localeCompare(e2.shortName);
  } else if (e1.id && e2.id) {
    return e1.id.localeCompare(e2.id);
  }
  return 0;
};

const applySearchOptions = (emojis: EmojiDescription[], options?: SearchOptions): EmojiDescription[] => {
  if (options) {
    return emojis.map(emoji => {
      return getEmojiVariation(emoji, options);
    });
  }
  return emojis;
};

export const getEmojiVariation = (emoji: EmojiDescription, options?: SearchOptions): EmojiDescription => {
  if (isEmojiDescriptionWithVariations(emoji) && options) {
    const skinTone = options.skinTone;
    if (skinTone && emoji.skinVariations && emoji.skinVariations.length) {
      const skinToneEmoji = emoji.skinVariations[skinTone - 1]; // skinTone start at 1
      if (skinToneEmoji) {
        return skinToneEmoji;
      }
    }
  }
  return emoji;
};

export default class EmojiRepository {
  private emojis: EmojiDescription[];
  private fullSearch: Search;
  private shortNameMap: EmojiByKey;
  private idMap: EmojiByKey;
  private categoryOrder: string[];

  constructor(emojis: EmojiDescription[]) {
    // Setup category order for entire service based on initial set of emojis
    this.categoryOrder = [];

    // Ensure emojis are ordered by: category (in order found), then by emoji order
    this.emojis = groupByCategory(this.categoryOrder, emojis);

    this.fullSearch = new Search('id');
    this.fullSearch.searchIndex = new UnorderedSearchIndex();
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortName');
    this.fullSearch.addDocuments(emojis);

    this.shortNameMap = createMapBy(emojis, e => e.shortName);
    this.idMap = createMapBy(emojis, e => e.id);
  }

  /**
   * Returns all available emoji.
   */
  all(): EmojiSearchResult {
    return this.search();
  }

  /**
   * Text search of emoji shortName and name field for suitable matches.
   *
   * Returns an array of all emoji is query is empty or null, otherwise an matching emoji.
   */
  search(query?: string, options?: SearchOptions): EmojiSearchResult {
    let filteredEmoji: EmojiDescription[];
    if (query) {
      filteredEmoji = this.fullSearch.search(query);
    } else {
      filteredEmoji = this.emojis;
    }
    filteredEmoji = groupByCategory(this.categoryOrder, applySearchOptions(filteredEmoji, options));
    return {
      emojis: filteredEmoji,
      categories: availableCategories(filteredEmoji),
      query,
    };
  }

  /**
   * Returns the first matching emoji matching the shortName, or null if none found.
   */
  findByShortName(shortName: string): OptionalEmojiDescription {
    return findByKey(this.shortNameMap, shortName);
  }

  /**
   * Returns the first matching emoji matching the id, or null if none found.
   */
  findById(id: string): OptionalEmojiDescription {
    debug('findById', id, this.idMap);
    return findByKey(this.idMap, id);
  }

  findInCategory(categoryId: string): EmojiDescription[] {
    return this.all().emojis.filter(
      emoji => emoji.category === categoryId
    );
  }
}
