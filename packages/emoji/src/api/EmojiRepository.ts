import { ITokenizer, Search, UnorderedSearchIndex } from 'js-search';

import * as XRegExp from 'xregexp/src/xregexp'; // Not using 'xregexp' directly to only include what we use
import * as XRegExpUnicodeBase from 'xregexp/src/addons/unicode-base';
import * as XRegExpUnicodeScripts from 'xregexp/src/addons/unicode-scripts';
import * as XRegExpUnicodeCategories from 'xregexp/src/addons/unicode-categories';

import { customCategory, defaultCategories } from '../constants';
import { EmojiDescription, EmojiSearchResult, OptionalEmojiDescription, SearchOptions } from '../types';
import { isEmojiDescriptionWithVariations } from '../type-helpers';
import { createFrequencyEmojiComparator } from './internal/Comparators';
import { NoSortComparator } from './EmojiComparator';
import { UsageFrequencyTracker } from './internal/UsageFrequencyTracker';

XRegExpUnicodeBase(XRegExp);
XRegExpUnicodeScripts(XRegExp);
XRegExpUnicodeCategories(XRegExp);

// \p{Han} => each chinese character is a separate token
// \p{L}+[\p{Mn}|']*\p{L} => consecutive letters, including non spacing mark and apostrophe are a single token
const tokenizerRegex = XRegExp.cache('\\p{Han}|[\\p{L}|\\p{N}]+[\\p{Mn}|\']*\\p{L}*', 'gi');

type Token = {
  token: string;
  start: number;
};

// FS-1097 - duplicated in mentions - extract at some point into a shared library
class Tokenizer implements ITokenizer {
  public static tokenize(text): string[] {
    return this.tokenizeAsTokens(text).map(token => token.token);
  }

  public static tokenizeAsTokens(text): Token[] {
    let match;
    let tokens: Token[] = [];
    tokenizerRegex.lastIndex = 0;
    while ((match = tokenizerRegex.exec(text)) !== null) {
      if (match[0]) {
        tokens.push({
          token: match[0],
          start: match.index
        });
      }
    }

    return tokens;
  }
}

declare type EmojiByKey = Map<any, EmojiDescription[]>;

interface EmojiToKey {
  (emoji: EmojiDescription): any;
}

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

type SplitQuery = {
  nameQuery: string;
  asciiQuery: string;
};

const splitQuery = (query = ''): SplitQuery => {
  const isColonQuery = query.indexOf(':') === 0;
  if (isColonQuery) {
    return {
      nameQuery: query.slice(1),
      asciiQuery: query,
    };
  }

  return {
    nameQuery: query,
    asciiQuery: '',
  };
};

const applySearchOptions = (emojis: EmojiDescription[], options?: SearchOptions): EmojiDescription[] => {
  if (options) {
    // Optimisation - don't apply the NoSortComparator given it returns zero for every comparison anyway
    if (options.comparator && options.comparator !== NoSortComparator.Instance) {
      // console.log(`PAC: applySearchOptions: There was a sort configured = ${options.comparator}, with compare method = ${options.comparator.compare} and there are ${emojis.length} emojis`);

      emojis = emojis.sort(options.comparator.compare);
      // console.log(`PAC: after sort we have ${emojis.length} emojis`);
    } else {
      // console.log(`PAC: applySearchOptions: There was no sort to apply. ${options.comparator}`);
    }

    if (options.limit && options.limit > 0) {
      // console.log('PAC: options.limit being applied.');
      emojis = emojis.slice(0, options.limit);
    }

    if (options.skinTone) {
      return emojis.map(emoji => {
        return getEmojiVariation(emoji, options);
      });
    }
  }
  // console.log(`PAC: returning from applySearchOptions with ${emojis.length} emojis`);
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
  private asciiMap: Map<string, EmojiDescription>;
  private dynamicCategoryList: string[];
  private static readonly defaultEmojiWeight: number = 1000000;

  protected usageTracker: UsageFrequencyTracker;

  constructor(emojis: EmojiDescription[]) {
    this.emojis = emojis;

    this.initRepositoryMetadata();
    this.initSearchIndex();

    this.usageTracker = new UsageFrequencyTracker();
  }

  /**
   * Returns all available (and searchable) emoji in some default order.
   */
  all(): EmojiSearchResult {
    const options: SearchOptions = {
      comparator: NoSortComparator.Instance
    };

    return this.search(undefined, options);
  }

  /**
   * Text search of emoji shortName and name field for suitable matches.
   *
   * Returns an array of all (searchable) emoji if query is empty or null, otherwise returns matching emoji.
   *
   * You can change how the results are sorted by specifying a custom EmojiComparator in the SearchOptions. If
   * you don't want any sorting you can also disable via the SearchOptions (this might be a useful optimisation).
   * If no sort is specified in SearchOptions then a default sorting it applied based on the query.
   */
   search(query?: string, options?: SearchOptions): EmojiSearchResult {
    let filteredEmoji: EmojiDescription[] = [];

    const { nameQuery, asciiQuery } = splitQuery(query);
    if (nameQuery) {
      filteredEmoji = this.fullSearch.search(nameQuery);

      if (asciiQuery) {
        filteredEmoji = this.withAsciiMatch(asciiQuery, filteredEmoji);
      }
    } else {
      filteredEmoji = this.getAllSearchableEmojis();
    }

    options = this.defaultSearchOptions(query, options);
    filteredEmoji = applySearchOptions(filteredEmoji, options);
    return {
      emojis: filteredEmoji,
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
    return findByKey(this.idMap, id);
  }

  findByAsciiRepresentation(asciiEmoji: string): OptionalEmojiDescription {
    return this.asciiMap.get(asciiEmoji);
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

  getDynamicCategoryList(includeCustom?: boolean): string[] {
    if (this.dynamicCategoryList.indexOf(customCategory) === -1 && includeCustom) {
      this.dynamicCategoryList.push(customCategory);
    }
    return this.dynamicCategoryList;
  }

  /**
   * Call this on emoji usage to allow the EmojiRepository to track the usage of emoji (which could be useful
   * in sorting, etc).
   *
   * @param emoji the emoji that was just used
   */
  used(emoji: EmojiDescription) {
    this.usageTracker.recordUsage(emoji);
  }

  /**
   * Create default SearchOptions if necessary
   */
  private defaultSearchOptions(query?: string, options?: SearchOptions) {
    if (!options) {
      // console.log(`PAC: defaultSearchOptions - making new empty SearchOptions`);
      options = {};
    }

    if (!options.comparator) {
      // console.log(`PAC: defaultSearchOptions - making comparator for query ${query}`);
      const comparator = createFrequencyEmojiComparator(query, this.usageTracker.getOrder());
      comparator.compare = comparator.compare.bind(comparator);
      options.comparator = comparator;
    } else {
      // console.log(`PAC: defaultSearchOptions - the SearchOptions contained a comparator already`);
    }

    return options;
  }

  private withAsciiMatch(ascii: string, emojis: EmojiDescription[]): EmojiDescription[] {
    let result = emojis;
    const asciiEmoji = this.findByAsciiRepresentation(ascii);
    if (asciiEmoji) {
      // Ensures that the same emoji isn't already in the list
      // If it is, we give precedence to the ascii match
      result = emojis.filter(e => e.id !== asciiEmoji.id);
      result = [asciiEmoji, ...result];
    }
    return result;
  }

  /**
   * Optimisation to initialise all map member variables in single loop over emojis
   */
  private initRepositoryMetadata(): void {
    this.shortNameMap  = new Map();
    this.idMap = new Map();
    this.asciiMap = new Map();
    const categorySet = new Set();

    this.emojis.forEach(emoji => {
      categorySet.add(emoji.category);
      this.addToMaps(emoji);
    });
    this.dynamicCategoryList = Array.from(categorySet).filter(category => defaultCategories.indexOf(category) === -1);
  }

  private initSearchIndex(): void {
    this.fullSearch = new Search('id');
    this.fullSearch.tokenizer = Tokenizer;
    this.fullSearch.searchIndex = new UnorderedSearchIndex();
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortName');

    this.fullSearch.addDocuments(this.getAllSearchableEmojis());
  }

  private getAllSearchableEmojis(): EmojiDescription[] {
    return this.emojis.filter(emojiDescription => emojiDescription.searchable);
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
