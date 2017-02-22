import { EmojiDescription } from '../types';

const toneEmojiShortName = 'raised_back_of_hand';

const byShortcut = (emojis: EmojiDescription[], shortcut: string): EmojiDescription =>
  emojis.filter(emoji => emoji.shortcut === shortcut)[0];

const toneEmoji = (emojis: EmojiDescription[]) =>
  byShortcut(emojis, toneEmojiShortName);

export default {
  byShortcut,
  toneEmoji,
};
