import { EmojiDescription, EmojiResponse } from '../types';
import { customType } from '../constants';
import EmojiRepository from './EmojiRepository';
import EmojiResource from './EmojiResource';

export default class AtlassianEmojiMigrationResource extends EmojiResource {

  protected initEmojiRepository(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    let siteEmojis: EmojiDescription[] = [];
    let atlassianShortNameMap: Map<string, boolean> = new Map();

    emojiResponses.forEach(emojiResponse => {
      if (emojiResponse.emojis[0].type.toUpperCase() === customType) {
        siteEmojis = emojiResponse.emojis;
      }
      if (emojiResponse.emojis[0].type.toUpperCase() === 'ATLASSIAN') {
        this.mapShortNameToIndex(emojiResponse.emojis, emojis.length, atlassianShortNameMap);
      }
      emojis = emojis.concat(emojiResponse.emojis);
    });
    emojis = this.removeDuplicateAtlassianEmoji(emojis, siteEmojis, atlassianShortNameMap);
    this.emojiRepository = new EmojiRepository(emojis);
  }

  private mapShortNameToIndex(emojis: EmojiDescription[], listLength: number, shortNameToIndexMap: Map<string, boolean>): void {
    // Only store boolean since Atlassian emojis have unique shortNames
    emojis.forEach(emoji => shortNameToIndexMap.set(emoji.shortName, true));
  }

  private removeDuplicateAtlassianEmoji(emojis: EmojiDescription[], siteEmojis: EmojiDescription[], atlassianShortNameMap: Map<string, boolean>): EmojiDescription[] {
    if (!atlassianShortNameMap.size) {
      return emojis;
    }
    siteEmojis.forEach(siteEmoji => {
      if (atlassianShortNameMap.has(siteEmoji.shortName)) {
        emojis = emojis.filter(emoji => emoji.shortName !== siteEmoji.shortName || emoji.type.toUpperCase() !== 'ATLASSIAN');
      }
    });
    return emojis;
  }
}
