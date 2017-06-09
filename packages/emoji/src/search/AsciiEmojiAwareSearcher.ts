import { Search } from 'js-search';
import { EmojiDescription } from '../types';
import EmojiRepository from '../api/EmojiRepository'

/**
 * A class that wraps an underlying Search and recognises when an ascii emoji has been
 * supplied as the search query. In this case it will make sure the EmojiDescription
 * matching that ascii emoji is returned as the first match in the search results.
 *
 * The overall purpose is to ensure a query like ':D' suggests the laughing face
 * emoji as well as any other emoji with names that start with D, such as
 * :disappointed:
 */
export class AsciiEmojiAwareSearcher {

  private emojiRepository: EmojiRepository;
  private delegateSearch: Search;

  constructor(search: Search, emojiRepository: EmojiRepository) {
    this.delegateSearch = search;
  }

  public search(query: string): EmojiDescription[] {
    const asciiEmoji = this.emojiRepository.findByAsciiRepresentation(query);

    const result = this.searchAndSort(query);

    if (asciiEmoji) {
      return [asciiEmoji, ...result];
    } else {
      return result;
    }
  }

  private searchAndSort(query: string): EmojiDescription[] {
    let filteredEmoji: EmojiDescription[];
    filteredEmoji = this.delegateSearch.search(query);
    this.sortFiltered(query, filteredEmoji);
    return filteredEmoji;
  }




