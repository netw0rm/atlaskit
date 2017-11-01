export default class EmojiSuggestionsProviderMock {
  search(query: string): Promise<any> {
    return Promise.resolve({
      emojis: [ '🚘', '🚖', '🏎', '🚓' ]
    });
  }
}

export const emojiSuggestionsProvider = new EmojiSuggestionsProviderMock();
export const emojiSuggestionsProviderPromise = Promise.resolve(emojiSuggestionsProvider);
