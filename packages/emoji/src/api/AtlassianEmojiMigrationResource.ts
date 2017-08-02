import { EmojiDescription, EmojiResponse } from '../types';
import { customType } from '../constants';
import EmojiRepository from './EmojiRepository';
import EmojiResource from './EmojiResource';

/**
 * EmojiResource that removes an Atlassian emoji if there is a corresponding site emoji duplicate
 * This will temporarily be exported to editor-core -> editor-hipchat -> * during the Atlassian
 * emoji migration process and used in lieu of the base EmojiResource.
 * After successful migration, this will be removed and replaced by EmojiResource.
 */
export default class AtlassianEmojiMigrationResource extends EmojiResource {

  protected initEmojiRepository(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    const siteEmojis: Set<string> = new Set();
    const atlassianEmojis: Set<string> = new Set();

    emojiResponses.forEach(emojiResponse => {
      if (emojiResponse.emojis[0].type.toUpperCase() === customType) {
       emojiResponse.emojis.forEach(emoji => siteEmojis.add(emoji.shortName));
      }
      if (emojiResponse.emojis[0].type.toUpperCase() === 'ATLASSIAN') {
        emojiResponse.emojis.forEach(emoji => atlassianEmojis.add(emoji.shortName));
      }
      emojis = emojis.concat(emojiResponse.emojis);
    });

    const duplicateEmojis: Set<string> = new Set(Array.from(atlassianEmojis).filter(name => siteEmojis.has(name)));
    emojis = this.removeDuplicateAtlassianEmoji(emojis, duplicateEmojis);
    this.emojiRepository = new EmojiRepository(emojis);
  }

  private removeDuplicateAtlassianEmoji(emojis: EmojiDescription[], duplicateEmojis: Set<string>): EmojiDescription[] {
    if (!duplicateEmojis.size) {
      return emojis;
    }
    return emojis.filter(emoji => !(duplicateEmojis.has(emoji.shortName) && emoji.type.toUpperCase() === 'ATLASSIAN'));
  }
}
