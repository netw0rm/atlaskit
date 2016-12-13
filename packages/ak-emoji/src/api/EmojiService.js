import JSSearch from 'js-search';

const availableCategories = emojis => emojis.reduce((categories, emoji) => {
  categories[emoji.category] = true;
  return categories;
}, {});

export default class EmojiService {
  constructor(emoji) {
    this.emoji = emoji;
    this.index = new JSSearch.Search('id');
    this.index.addIndex('name');
    this.index.addIndex('shortcut');
    this.index.addDocuments(emoji);
  }

  search(query) {
    let filteredEmoji;
    if (query) {
      filteredEmoji = this.index.search(query);
    } else {
      filteredEmoji = this.emoji;
    }
    return {
      emojis: filteredEmoji,
      categories: availableCategories(filteredEmoji),
    };
  }
}
