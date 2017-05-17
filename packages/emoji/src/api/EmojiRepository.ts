import { Search, UnorderedSearchIndex } from 'js-search';
import debug from '../util/logger';
import { AvailableCategories, EmojiDescription, OptionalEmojiDescription, SearchOptions } from '../types';
import { isEmojiDescriptionWithVariations } from '../type-helpers';
import CategorySelector from '../components/picker/CategorySelector';

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

const findByKey = (map: EmojiByKey, key: any): OptionalEmojiDescription => {
  const emojis = map.get(key);
  if (emojis && emojis.length) {
    // Priority is always to source from the last emoji set (last overrides first)
    return emojis[emojis.length - 1];
  }
  return undefined;
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
  private categoryOrder: Map<string, number>;
  private static readonly defaultEmojiWeight: number = 1000000;

  constructor(emojis: EmojiDescription[]) {
    this.emojis = emojis;
    this.categoryOrder = new Map();
    CategorySelector.defaultProps.categories.forEach((category, index) => {
      this.categoryOrder.set(category.id, index + 1);
    });

    this.initMaps();
    this.fullSearch = new Search('id');
    this.fullSearch.searchIndex = new UnorderedSearchIndex();
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortName');
    this.fullSearch.addDocuments(emojis);
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
      this.sortFiltered(filteredEmoji, query);
    } else {
      filteredEmoji = this.emojis;
    }
    filteredEmoji = applySearchOptions(filteredEmoji, options);
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

  /**
   * Optimisation to initialise all map member variables in single loop over emojis
   */
  private initMaps(): void {
    this.shortNameMap  = new Map();
    this.idMap = new Map();

    this.emojis.forEach(emoji => {
      // Give default value and assign higher weight to Atlassian emojis for logical order when sorting
      if (typeof emoji.order === 'undefined' || emoji.order === -1) {
        emoji.order = EmojiRepository.defaultEmojiWeight;
      }
      if (typeof emoji.id === 'undefined') {
        emoji.id = EmojiRepository.defaultEmojiWeight.toString();
      }
      addAllVariants(emoji, e => e.shortName, this.shortNameMap);
      addAllVariants(emoji, e => e.id, this.idMap);
    });
  }

  /**
   * Sort emojis return by js-search in to a logical order
   */
  private sortFiltered(filteredEmoji: EmojiDescription[], query: string) {
    query = query.replace(/:/g, '').toLowerCase().trim();
    const colonQuery = `:${query}:`;

    // Comparator is an internal function within sorter to access the query
    const emojiComparator = (e1: EmojiDescription, e2: EmojiDescription): number => {
      // Handle exact matches between query and shortName
      if (e1.shortName === colonQuery && e2.shortName === colonQuery) {
        return this.typeToOrder(e1.type) - this.typeToOrder(e2.type);
      } else if (e1.shortName === colonQuery) {
        return -1;
      } else if (e2.shortName === colonQuery) {
        return 1;
      }

      // shortName matches should take precedence over full name
      const short1 = e1.shortName.indexOf(query);
      const short2 = e2.shortName.indexOf(query);

      // Order used for matching on same index and shorter queries with default value assigned on initialisation
      if (query.length < 3 || short1 !== -1 && short1 === short2) {
        return e1.order! - e2.order!;
      } else if (short1 !== -1 && short2 !== -1) {
        return short1 - short2;
      } else if (short1 !== -1) {
        return -1;
      } else if (short2 !== -1) {
        return 1;
      }

      // Query matches earliest in the full name
      if (e1.name && e2.name) {
        const index1 = e1.name.indexOf(query);
        const index2 = e2.name.indexOf(query);
        if (index1 !== index2) {
          return index1 - index2;
        }
      }

      // Use order if full name matches on same index
      if (e1.order !== e2.order) {
        return e1.order! - e2.order!;
      }

      // Default to alphabetical order
      return e1.shortName.slice(0, -1).localeCompare(e2.shortName.slice(0, -1));
    };

    filteredEmoji.sort(emojiComparator);
  }

  // Give precedence when conflicting shortNames occur as defined in Emoji Storage Spec
  private typeToOrder(type: string): number {
    if (type === 'SITE') {
      return 0;
    } else if (type === 'ATLASSIAN') {
      return 1;
    } else if (type === 'STANDARD') {
      return 2;
    }
    // Push unknown type to bottom of list
    return 3;
  }

}
