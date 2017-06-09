import { LowerCaseSanitizer, Search, SimpleTokenizer, UnorderedSearchIndex } from 'js-search';

import { customCategory } from '../constants';
import debug from '../util/logger';
import { AvailableCategories, EmojiDescription, OptionalEmojiDescription, SearchOptions } from '../types';
import { isEmojiDescriptionWithVariations } from '../type-helpers';
import CategorySelector from '../components/picker/CategorySelector';
import { AsciiEmojiRecognisingTokenizerAndSanitizer, NoOpSanitizer } from '../search/AsciiEmojiRecognisingTokenizerAndSanitizer';
import { AsciiEmojiAwareSearcher } from '../search/AsciiEmojiAwareSearcher';

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
    if (options.limit && options.limit > 0) {
      emojis = emojis.slice(0, options.limit);
    }
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
  private asciiEmojiAwareSearcher: AsciiEmojiAwareSearcher;
  private shortNameMap: EmojiByKey;
  private idMap: EmojiByKey;
  private asciiMap: Map<string, EmojiDescription>;
  private categoryOrder: Map<string, number>;
  private static readonly defaultEmojiWeight: number = 1000000;

  constructor(emojis: EmojiDescription[]) {
    this.emojis = emojis;
    this.categoryOrder = new Map();
    CategorySelector.defaultProps.categories.forEach((category, index) => {
      this.categoryOrder.set(category.id, index + 1);
    });

    this.initMaps();
    const tokenizer = new AsciiEmojiRecognisingTokenizerAndSanitizer(
      new SimpleTokenizer(),
      new LowerCaseSanitizer());
    this.fullSearch = new Search('id');
    this.fullSearch.searchIndex = new UnorderedSearchIndex();
    this.fullSearch.tokenizer = tokenizer;
    this.fullSearch.sanitizer = new NoOpSanitizer(); // the tokenizer does sanitizing as well
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortName');
    this.fullSearch.addIndex('ascii');
    this.fullSearch.addDocuments(emojis);

    this.asciiEmojiAwareSearcher = new AsciiEmojiAwareSearcher(tokenizer, this.fullSearch);
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
      console.log('PAC: searching for query = ' + query);
      filteredEmoji = this.asciiEmojiAwareSearcher.search(query);
      console.log('PAC: found ' + filteredEmoji.length + ' matching results.');
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

  addCustomEmoji(emoji: EmojiDescription) {
    if (emoji.category !== customCategory) {
      throw new Error(`Emoji is not a custom emoji, but from category ${emoji.category}`);
    }
    this.emojis = [
      ...this.emojis,
      emoji,
    ];
    this.fullSearch.addDocuments([ emoji ]);
    this.addToMaps(emoji);
  }

  getAsciiMap(): Map<string, EmojiDescription> {
    return this.asciiMap;
  }

  /**
   * Optimisation to initialise all map member variables in single loop over emojis
   */
  private initMaps(): void {
    this.shortNameMap  = new Map();
    this.idMap = new Map();
    this.asciiMap = new Map();

    this.emojis.forEach(emoji => {
      this.addToMaps(emoji);
    });
  }

  private addToMaps(emoji: EmojiDescription): void {
    // Give default value and assign higher weight to Atlassian emojis for logical order when sorting
    if (typeof emoji.order === 'undefined' || emoji.order === -1) {
      emoji.order = EmojiRepository.defaultEmojiWeight;
    }
    if (typeof emoji.id === 'undefined') {
      emoji.id = EmojiRepository.defaultEmojiWeight.toString();
    }
    addAllVariants(emoji, e => e.shortName, this.shortNameMap);
    addAllVariants(emoji, e => e.id, this.idMap);
    if (emoji.ascii) {
      emoji.ascii.forEach(a => this.asciiMap.set(a, emoji));
    }
  }
}
