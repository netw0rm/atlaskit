export interface EmojiSuggestionsProvider {
  search: (query: string) => Promise<any>;
}
