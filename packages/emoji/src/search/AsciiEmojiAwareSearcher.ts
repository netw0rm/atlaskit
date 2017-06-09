import { Search } from 'js-search';
import { AsciiEmojiRecognisingTokenizerAndSanitizer, isAsciiEmoji } from '../search/AsciiEmojiRecognisingTokenizerAndSanitizer';
import { EmojiDescription } from '../types';

/**
 * A class that wraps an underlying Search and recognises when an ascii emoji has been
 * supplied as the search query. In this case it will tokenize the query into at least
 * two tokens. One token will be the ascii emoji in it's supplied form and the other
 * will be any 'word parts' recognised in this emoji.
 *
 * The overall purpose is to ensure a query like ':D' suggests the laughing face
 * emoji as well as any other emoji with names that start with D, such as
 * :disappointed:
 */
export class AsciiEmojiAwareSearcher {

  private delegateSearch: Search;
  private tokenizer: AsciiEmojiRecognisingTokenizerAndSanitizer;

  constructor(tokenizer: AsciiEmojiRecognisingTokenizerAndSanitizer, search: Search) {
    this.tokenizer = tokenizer;
    this.delegateSearch = search;
  }

  public search(query: string): EmojiDescription[] {
    if (isAsciiEmoji(query)) {
      const tokens = this.tokenizer.tokenizeAndPreserveEmoji(query);

      if (!tokens || tokens.length === 0) {
        return [];
      }

      let searchResult: EmojiDescription[] = this.delegateSearch.search(tokens[0]);

      if (tokens.length > 1) {
        tokens.shift();
        const remainingQuery = tokens.join(' ');
        console.log('PAC: remainingQuery = ' + remainingQuery);
        searchResult = searchResult.concat(this.searchAndSort(remainingQuery));
      }
      return searchResult;
    } else {
      return this.searchAndSort(query);
    }
  }

  private searchAndSort(query: string): EmojiDescription[] {
    let filteredEmoji: EmojiDescription[];
    filteredEmoji = this.delegateSearch.search(query);
    this.sortFiltered(query, filteredEmoji);
    return filteredEmoji;
  }

    /**
   * Sort emojis return by js-search in to a logical order
   */
  private sortFiltered(query: string, filteredEmoji: EmojiDescription[]) {
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


