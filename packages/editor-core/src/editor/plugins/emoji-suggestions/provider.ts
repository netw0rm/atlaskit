export interface EmojiSuggestionsProvider {
  search: (query: string) => Promise<any>;
  parseDocument: (query: string) => Promise<any>;
}
