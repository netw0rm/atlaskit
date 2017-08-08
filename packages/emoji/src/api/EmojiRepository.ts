import { ITokenizer, Search, UnorderedSearchIndex } from 'js-search';

import * as XRegExp from 'xregexp/src/xregexp'; // Not using 'xregexp' directly to only include what we use
import * as XRegExpUnicodeBase from 'xregexp/src/addons/unicode-base';
import * as XRegExpUnicodeScripts from 'xregexp/src/addons/unicode-scripts';
import * as XRegExpUnicodeCategories from 'xregexp/src/addons/unicode-categories';

import { customCategory } from '../constants';
import { AvailableCategories, EmojiDescription, OptionalEmojiDescription, SearchOptions } from '../types';
import { isEmojiDescriptionWithVariations } from '../type-helpers';
import { EmojiComparator, EmojiComparatorFactory } from './EmojiComparator';
import { createQueryMatchEmojiComparator } from './internal/Comparators';

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

/**
 * Apply the specified SearchOptions, in the order sort, limit, skintone
 */
const applySearchOptions = (query: string, emojis: EmojiDescription[], options?: SearchOptions): EmojiDescription[] => {
  if (options) {
    if (options.sortComparator) {
      const comparator = options.sortComparator.create(query);
      emojis.sort(comparator.compare);
    }

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
  private shortNameMap: EmojiByKey;
  private idMap: EmojiByKey;
  private asciiMap: Map<string, EmojiDescription>;
  private static readonly defaultEmojiWeight: number = 1000000;

  constructor(emojis: EmojiDescription[]) {
    this.emojis = emojis;

    this.initMaps();
    this.initSearchIndex();
  }

  /**
   * Returns all available (and searchable) emoji.
   */
  all(options?: SearchOptions): EmojiSearchResult {
    let filteredEmoji = this.getAllSearchableEmojis();
    filteredEmoji = applySearchOptions(filteredEmoji);

    return {
      emojis: filteredEmoji,
      categories: availableCategories(filteredEmoji)
    };
  }

  /**
   * Text search of emoji shortName and name field for suitable matches.
   *
   * @param query the query used in the search. If you have no query see the 'all' method instead.
   * @param options the SearchOptions to apply to the sorted results.
   */
  search(query: string, options?: SearchOptions): EmojiSearchResult {
    // TODO ensure EmojiRepository calls 'all' in filter when no query

    let filteredEmoji: EmojiDescription[] = [];
    const { nameQuery, asciiQuery } = splitQuery(query);

    // TODO ensure that there will always be a query part even after splitQuery
    filteredEmoji = this.fullSearch.search(nameQuery);
    if (asciiQuery) {
      filteredEmoji = this.withAsciiMatch(asciiQuery, filteredEmoji);
    }

    options = this.createLegacySearchBehaviour(query, asciiQuery, options);


    this.sortFiltered(filteredEmoji, nameQuery);

    // move the ascii Query part into apply search options

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
   * In older versions, the sort was not controlled by the SearchOptions. To preserve the default
   * sorting behaviour, which only applied when there was a query string, we conditionally add a
   * sortComparator to the SearchOptions here.
   *
   * If the SearchOptions already contain a sortComparator then it will be left unchanged.
   *
   * @param query
   */
  private createLegacySearchBehaviour(query: string, asciiQuery?: string, options?: SearchOptions) {
    if (query || asciiQuery) {
      if (options && options.sortComparator) {
        return options;
      } else {
        const factory: EmojiComparatorFactory = {
          create: (q) => {
            return createQueryMatchEmojiComparator(query, asciiQuery);
          }
        };

        return {
          skinTone: options ? options.skinTone : undefined,
          limit: options ? options.limit : undefined,
          sortComparator: factory
        };
      }
    } else {
      return options;
    }
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

  /**
   * Sort emojis return by js-search in to a logical order
   */
  private sortFiltered(filteredEmoji: EmojiDescription[], query: string, comparator: EmojiComparator) {
    query = query.replace(/:/g, '').toLowerCase().trim();
    const colonQuery = `:${query}:`;

    filteredEmoji.sort(comparator.compare);

  }
}
